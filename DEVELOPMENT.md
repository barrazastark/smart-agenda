# 📋 SmartAgenda Development Guide

## 🏗️ Development Workflow

### Local Development

```bash
# Start all services
pnpm start

# Individual services
pnpm dev:frontend  # Frontend on http://localhost:3100
pnpm dev:backend   # Backend on http://localhost:4100
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests (requires backend running)
pnpm e2e

# Type checking
pnpm type-check
```

## 🚀 Deployment Strategy

### Current Setup: Automated Deployment

Deploy automático configurado para producción con GitHub Actions.

### 🔐 Variables de Entorno - ¿Dónde están?

#### **GitHub Secrets (Requerido)**

Las siguientes variables van en **GitHub → Settings → Secrets and variables → Actions**:

```bash
# Necesitas configurar estas:
VERCEL_ORG_ID=              # ID organización Vercel
VERCEL_PROJECT_ID_FRONTEND=smart-agenda-frontend
VERCEL_PROJECT_ID_BACKEND=smart-agenda-backend
VERCEL_TOKEN=              # Token de Vercel
DATABASE_URL=postgresql://postgres:[Superteomo0021]@db.ibhqifagaabhsgbflyxb.supabase.co:5432/postgres
NEXT_PUBLIC_API_URL=https://smart-agenda-backend.vercel.app
```

#### **Vercel Environment Variables (Requerido)**

Las siguientes variables van en **Vercel → Project Settings → Environment Variables**:

**Frontend Project (smart-agenda-frontend):**

```bash
NEXT_PUBLIC_API_URL=https://smart-agenda-backend.vercel.app
```

**Backend Project (smart-agenda-backend):**

```bash
DATABASE_URL=postgresql://postgres:[Superteomo0021]@db.ibhqifagaabhsgbflyxb.supabase.co:5432/postgres
NODE_ENV=production
```

### 🔄 Deploy Automático

#### GitHub Actions (Producción)

```bash
# Merge a main → Deploy automático
git checkout main
git merge feature/app-title-from-db
git push origin main

# El workflow correrá automáticamente:
# 1. Setup database migration
# 2. Deploy backend a Vercel
# 3. Deploy frontend con API URL correcta
```

### Manual Deployment Options

#### Deploy Script (Rápido)

```bash
# Deploy ambos proyectos
./deploy.sh
```

#### Deploy Individual

```bash
# Backend
cd apps/backend
npx vercel --prod

# Frontend
cd apps/frontend
npx vercel --prod
```

## 📝️ Desarrollo Branch Strategy

### Durante desarrollo:

- Trabajá en feature branches sin preocuparte por deploys
- El CI valida código pero NO hace deploy desde features
- Mergeá solo cuando el feature esté completo

### Para deploy:

1. Crear PR `feature/app-title-from-db → main`
2. Aprobación del PR
3. Merge a `main` → Deploy automático via GitHub Actions

## 🔧 Configuración Actual

### ✅ Funcionalidades implementadas:

- [x] PostgreSQL integration con Supabase
- [x] Server components con fetching asíncrono
- [x] Testing architecture sin environment checks
- [x] E2E con Cypress intercepts
- [x] CI/CD pipeline completo
- [x] Deploy controlado con GitHub Actions
- [x] Automated deployment workflow
- [x] Proper environment variable configuration

### 🎯 Estado Actual:

- [x] Merge a main para deploy de producción ⏳ PR creado: feature/automated-deployment-setup
- [x] Database string disponible ✅
- [x] Fix local development setup ✅
- [ ] Configurar GitHub Secrets ⏳ VERCEL*ORG_ID, VERCEL_PROJECT_ID*\*, VERCEL_TOKEN
- [ ] Configurar Vercel Environment Variables ⏳ DATABASE_URL, NEXT_PUBLIC_API_URL, NODE_ENV
- [ ] Test deploy automático 📋
- [ ] Configurar dominio personalizado 📋
- [ ] Monitoreo y errores 📋

## 🚨 Arreglo Rápido para Development Local:

### 🐛 Problemas detectados:

- [x] Backend: No tiene `pg` y `dotenv` en Docker container
- [x] Frontend: Intenta conectar a Supabase en development

### ✅ Solución implementada:

```bash
# Para development local con PostgreSQL local:
cp .env.example .env.local
pnpm start

# Para desarrollo con Supabase:
# Editar .env.local con tu URL de Supabase
NEXT_PUBLIC_API_URL=https://smart-agenda-backend.vercel.app
DATABASE_URL=postgresql://postgres:[Superteomo0021]@db.ibhqifagaabhsgbflyxb.supabase.co:5432/postgres
```

## 🌐 URLs Finales

### Desarrollo:

- Frontend: http://localhost:3100
- Backend: http://localhost:4100

### Producción (después de deploy):

- Frontend: https://smart-agenda.vercel.app
- Backend: https://smart-agenda-backend.vercel.app
