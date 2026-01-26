#!/bin/bash

# Exit on error, but allow cleanup to run
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
POSTGRES_PORT=5432
BACKEND_PORT=4100
FRONTEND_PORT=3100
MAX_RETRIES=30
RETRY_INTERVAL=2

# State tracking
STARTED_POSTGRES=false
STARTED_BACKEND=false
STARTED_FRONTEND=false
BACKEND_PID=""
FRONTEND_PID=""
INTERRUPTED=false

# Parse arguments
FORCE_CLEAN=false
for arg in "$@"; do
    case $arg in
        --clean)
            FORCE_CLEAN=true
            shift
            ;;
    esac
done

# Force clean if requested
if [ "$FORCE_CLEAN" = true ]; then
    echo -e "${YELLOW}🧹 Force cleaning existing processes...${NC}"
    lsof -ti :$BACKEND_PORT | xargs kill -9 2>/dev/null || true
    lsof -ti :$FRONTEND_PORT | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Cleanup function - kills all child processes
cleanup() {
    # Prevent multiple cleanup calls
    if [ "$INTERRUPTED" = true ]; then
        return
    fi
    INTERRUPTED=true
    
    echo -e "\n${YELLOW}🧹 Cleaning up...${NC}"
    
    # Kill backend by PID or by port
    if [ -n "$BACKEND_PID" ]; then
        echo "Stopping backend (PID: $BACKEND_PID)"
        kill "$BACKEND_PID" 2>/dev/null || true
        kill -9 "$BACKEND_PID" 2>/dev/null || true
    fi
    # Also kill anything on the backend port to be safe
    lsof -ti :$BACKEND_PORT | xargs kill -9 2>/dev/null || true
    
    # Kill frontend by PID or by port
    if [ -n "$FRONTEND_PID" ]; then
        echo "Stopping frontend (PID: $FRONTEND_PID)"
        kill "$FRONTEND_PID" 2>/dev/null || true
        kill -9 "$FRONTEND_PID" 2>/dev/null || true
    fi
    # Also kill anything on the frontend port to be safe
    lsof -ti :$FRONTEND_PORT | xargs kill -9 2>/dev/null || true
    
    # Stop Docker Postgres if we started it
    if [ "$STARTED_POSTGRES" = true ]; then
        echo "Stopping PostgreSQL container..."
        docker stop smartagenda-e2e-postgres 2>/dev/null || true
        docker rm smartagenda-e2e-postgres 2>/dev/null || true
    fi
    
    # Kill any remaining child processes
    jobs -p | xargs kill -9 2>/dev/null || true
    
    echo -e "${GREEN}✅ Cleanup complete${NC}"
}

# Register cleanup on exit and interruption
trap cleanup EXIT
trap 'echo -e "\n${RED}⚠️  Interrupted! Cleaning up...${NC}"; cleanup; exit 130' INT TERM

# Health check function
wait_for_service() {
    local name=$1
    local url=$2
    local max_retries=${3:-$MAX_RETRIES}
    
    echo -e "${YELLOW}⏳ Waiting for $name at $url...${NC}"
    
    for i in $(seq 1 $max_retries); do
        if curl -sf "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $name is ready! (attempt $i/$max_retries)${NC}"
            return 0
        fi
        echo "  Attempt $i/$max_retries..."
        sleep $RETRY_INTERVAL
    done
    
    echo -e "${RED}❌ $name failed to start after $max_retries attempts${NC}"
    return 1
}

# Check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    fi
    return 1  # Port is free
}

echo -e "${GREEN}🚀 Starting E2E Test Environment${NC}"
echo "================================================"

# Navigate to project root
cd "$(dirname "$0")"
PROJECT_ROOT=$(pwd)

# ===== Step 1: Start PostgreSQL =====
echo -e "\n${YELLOW}📦 Step 1: PostgreSQL${NC}"

# Function to test PostgreSQL connection using nc (netcat)
test_postgres_port() {
    nc -z localhost $POSTGRES_PORT 2>/dev/null
}

if check_port $POSTGRES_PORT; then
    echo "Port $POSTGRES_PORT is in use, testing connection..."
    if test_postgres_port; then
        echo -e "${GREEN}PostgreSQL is already running on port $POSTGRES_PORT${NC}"
        STARTED_POSTGRES=false
    else
        echo -e "${YELLOW}Port $POSTGRES_PORT is in use but not accepting TCP connections${NC}"
        echo -e "${RED}Please stop whatever is using port $POSTGRES_PORT${NC}"
        exit 1
    fi
else
    echo "PostgreSQL is not running. Starting via Docker..."
    
    # Check if Docker is available
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running!${NC}"
        echo ""
        echo "Please start Docker Desktop or run PostgreSQL natively:"
        echo "  brew services start postgresql@15"
        echo ""
        echo "Or start Docker and run this script again."
        exit 1
    fi
    
    # Remove existing container if it exists
    docker rm -f smartagenda-e2e-postgres 2>/dev/null || true
    
    docker run -d \
        --name smartagenda-e2e-postgres \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_DB=smartagenda \
        -p $POSTGRES_PORT:5432 \
        --health-cmd="pg_isready -U postgres" \
        --health-interval=5s \
        --health-timeout=5s \
        --health-retries=5 \
        postgres:15-alpine
    STARTED_POSTGRES=true
    
    # Wait for PostgreSQL to be ready
    echo "Waiting for PostgreSQL..."
    for i in $(seq 1 30); do
        if docker exec smartagenda-e2e-postgres pg_isready -U postgres > /dev/null 2>&1; then
            echo -e "${GREEN}✅ PostgreSQL is ready!${NC}"
            break
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}❌ PostgreSQL failed to start${NC}"
            exit 1
        fi
        sleep 1
    done
fi

# ===== Step 2: Setup Backend =====
echo -e "\n${YELLOW}📦 Step 2: Backend${NC}"
cd "$PROJECT_ROOT/apps/backend"

# Setup database schema
echo "Syncing database schema with Prisma..."
DATABASE_URL="postgresql://postgres:password@localhost:$POSTGRES_PORT/smartagenda" npx prisma db push --accept-data-loss

# Check if backend is already running
if check_port $BACKEND_PORT; then
    # Check if it responds (use /api since /health requires DB connection)
    if curl -sf "http://localhost:$BACKEND_PORT/api" > /dev/null 2>&1; then
        echo -e "${GREEN}Backend is already running on port $BACKEND_PORT${NC}"
        STARTED_BACKEND=false
    else
        echo -e "${YELLOW}Port $BACKEND_PORT is in use but not responding${NC}"
        echo "Killing existing process..."
        lsof -ti :$BACKEND_PORT | xargs kill -9 2>/dev/null || true
        sleep 2
        STARTED_BACKEND=true
    fi
else
    STARTED_BACKEND=true
fi

if [ "$STARTED_BACKEND" = true ]; then
    # Build backend if needed
    if [ ! -d "dist" ] || [ "src/index.ts" -nt "dist/index.js" ]; then
        echo "Building backend..."
        pnpm build
    fi

    # Start backend
    echo "Starting backend server..."
    DATABASE_URL="postgresql://postgres:password@localhost:$POSTGRES_PORT/smartagenda" \
    PORT=$BACKEND_PORT \
    NODE_ENV=test \
    node dist/index.js &
    BACKEND_PID=$!

    # Wait for backend to be ready (use /api since /health requires DB)
    if ! wait_for_service "Backend" "http://localhost:$BACKEND_PORT/api"; then
        echo -e "${RED}Backend failed to start${NC}"
        exit 1
    fi
fi

# ===== Step 3: Start Frontend =====
echo -e "\n${YELLOW}📦 Step 3: Frontend${NC}"
cd "$PROJECT_ROOT/apps/frontend"

# Check if frontend is already running
if check_port $FRONTEND_PORT; then
    if curl -sf "http://localhost:$FRONTEND_PORT" > /dev/null 2>&1; then
        echo -e "${GREEN}Frontend is already running on port $FRONTEND_PORT${NC}"
        STARTED_FRONTEND=false
    else
        echo -e "${YELLOW}Port $FRONTEND_PORT is in use but not responding${NC}"
        echo "Killing existing process..."
        lsof -ti :$FRONTEND_PORT | xargs kill -9 2>/dev/null || true
        sleep 2
        STARTED_FRONTEND=true
    fi
else
    STARTED_FRONTEND=true
fi

if [ "$STARTED_FRONTEND" = true ]; then
    echo "Starting frontend server..."
    NEXT_PUBLIC_API_URL="http://localhost:$BACKEND_PORT" \
    PORT=$FRONTEND_PORT \
    pnpm dev &
    FRONTEND_PID=$!

    # Wait for frontend to be ready
    if ! wait_for_service "Frontend" "http://localhost:$FRONTEND_PORT" 60; then
        exit 1
    fi
fi

# ===== Step 4: Run Cypress Tests =====
echo -e "\n${YELLOW}🧪 Step 4: Running Cypress E2E Tests${NC}"
echo "================================================"

cd "$PROJECT_ROOT/apps/frontend"

# Run Cypress
CYPRESS_baseUrl="http://localhost:$FRONTEND_PORT" \
CYPRESS_apiUrl="http://localhost:$BACKEND_PORT" \
pnpm cypress:run

TEST_EXIT_CODE=$?

echo ""
echo "================================================"
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ All E2E tests passed!${NC}"
else
    echo -e "${RED}❌ Some E2E tests failed (exit code: $TEST_EXIT_CODE)${NC}"
fi

exit $TEST_EXIT_CODE
