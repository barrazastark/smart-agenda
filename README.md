# SmartAgenda

A monorepo project with Next.js frontend and Express backend, fully dockerized.

## 🚀 Quick Start

### 1. Configure Local Domain (one-time setup)

Add the following line to your `/etc/hosts` file:

```bash
# Run this command (requires sudo)
sudo sh -c 'echo "127.0.0.1 local.smartagenda.com" >> /etc/hosts'
```

### 2. Start the Application

Run the entire project with a single command:

```bash
pnpm start
```

This will start both the frontend and backend services in Docker containers with hot reload enabled.

## 📦 Project Structure

```
SmartAgenda/
├── apps/
│   ├── frontend/          # Next.js application
│   │   ├── src/
│   │   │   └── app/       # App Router pages
│   │   ├── Dockerfile
│   │   └── package.json
│   └── backend/           # Express API server
│       ├── src/
│       │   └── index.ts   # Main server file
│       ├── Dockerfile
│       └── package.json
├── packages/              # Shared packages (future use)
├── docker-compose.yml     # Docker orchestration
├── pnpm-workspace.yaml    # pnpm workspace config
└── package.json           # Root package.json
```

## 🔧 Available Commands

### Root Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start all services with Docker (recommended) |
| `pnpm stop` | Stop all Docker services |
| `pnpm build` | Build all packages |
| `pnpm clean` | Clean build outputs |

### Development (without Docker)

| Command | Description |
|---------|-------------|
| `pnpm dev:frontend` | Run frontend only |
| `pnpm dev:backend` | Run backend only |

## 🌐 Services

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://local.smartagenda.com:3100 | Next.js application |
| Backend API | http://local.smartagenda.com:4100/api | Express REST API |
| Health Check | http://local.smartagenda.com:4100/health | Backend health status |

> 💡 You can also use `localhost:3100` and `localhost:4100` if the local domain is not configured.

## 🔥 Hot Reload

Both services support hot reload during development:

- **Frontend**: Next.js automatically reloads on file changes
- **Backend**: Uses `tsx watch` for TypeScript hot reload

## 📋 Logs

When running with `pnpm start`, logs from both services are displayed in the terminal:

- Frontend logs are prefixed with `frontend_1`
- Backend logs are prefixed with `backend_1`

All `console.log` statements will appear in the unified log output.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Express 4, TypeScript, tsx
- **Tooling**: pnpm workspaces, Docker, Docker Compose

## 📝 Notes

- All code follows English naming conventions
- The project uses pnpm as the package manager
- Docker containers use volume mounts for development
- Frontend runs on port **3100**, Backend runs on port **4100**

