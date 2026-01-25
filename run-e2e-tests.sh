#!/bin/bash

# Start the backend in background
cd apps/backend
NODE_ENV=production PORT=4100 DATABASE_URL="postgresql://postgres:password@localhost:5432/smartagenda" pnpm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start the frontend
cd ../frontend
pnpm dev &
FRONTEND_PID=$!

# Wait for both to be ready
sleep 5

# Run Cypress tests
cd ../frontend
pnpm cypress:run

# Cleanup
kill $BACKEND_PID $FRONTEND_PID