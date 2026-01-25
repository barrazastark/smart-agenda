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

### Current Setup: Disabled Auto-Deploy

Vercel auto-deploy está **DESACTIVADO** para evitar deploys innecesarios.

### Manual Deployment Options

#### 1️⃣ GitHub Actions (Recomendado para producción)

```bash
# Push a main o production
git checkout main
git merge feature/app-title-from-db
git push origin main
```

→ Dispara deploy automático via `.github/workflows/deploy.yml`

#### 2️⃣ Deploy Script (Para deploys manuales)

```bash
# Deploy ambos proyectos
./deploy.sh
```

#### 3️⃣ Deploy Individual

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
- El CI valida código pero NO hace deploy
- Mergeá solo cuando el feature esté completo

### Para deploy:

1. Crear PR `feature/app-title-from-db → main`
2. Aprobación del PR
3. Merge a `main` o `production`
4. Deploy automático via GitHub Actions

## 🔧 Configuración Actual

### ✅ Funcionalidades implementadas:

- [x] PostgreSQL integration
- [x] Server components
- [x] Testing architecture
- [x] E2E con Cypress intercepts
- [x] CI/CD pipeline
- [x] Deploy controlado
- [x] Branch strategy

### 🎯 Próximos pasos:

- [ ] Merge a main para deploy de producción
- [ ] Configurar dominio personalizado
- [ ] Monitoreo y errores
- [ ] Pipeline de CI/CD mejorado
