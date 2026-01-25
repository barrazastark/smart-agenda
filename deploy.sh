#!/bin/bash

# Deploy script for manual deployments

echo "🚀 Starting SmartAgenda deployment..."

# Deploy Backend
echo "📦 Deploying backend to Vercel..."
cd apps/backend
npx vercel --prod

# Deploy Frontend
echo "🎨 Deploying frontend to Vercel..."
cd ../frontend
npx vercel --prod

echo "✅ Deployment completed!"
echo "🌐 URLs:"
echo "Backend: https://smart-agenda-backend.vercel.app"
echo "Frontend: https://smart-agenda.vercel.app"