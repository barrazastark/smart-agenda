## 🔑 Configuración de GitHub Secrets - Paso a Paso

### 📍 Dónde configurar:

**GitHub → Your Repository → Settings → Secrets and variables → Actions**

### 🔑 Secrets que debes agregar (6 totales):

#### 1️⃣ Obtener IDs de Vercel:

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Login en Vercel
vercel login

# Listar proyectos y obtener IDs
vercel projects list
```

**Resultado esperado:**

```
Project Name            Latest Production URL                      Updated   Node Version   Project ID
smart-agenda-frontend   https://smart-agenda-frontend.vercel.app   2m        24.x         prj_[ID_FRONTEND]
smart-agenda-backend    https://smart-agenda-backend.vercel.app    5m        24.x         prj_[ID_BACKEND]
web-portfolio           https://josebarraza.dev                    28d       22.x         prj_[ID_PORTFOLIO]
Organization ID: team_[ORG_ID]
```

#### 2️⃣ Obtener Vercel Token:

```bash
# Generar token para deployments
vercel token create
```

### 🎯 Variables exactas a configurar:

#### **VERCEL_ORG_ID**

- Valor: `team_[ORG_ID]` (el que aparece en "Organization ID")
- Descripción: "Vercel organization ID"

#### **VERCEL_PROJECT_ID_FRONTEND**

- Valor: `prj_[ID_FRONTEND]` (el ID del proyecto frontend)
- Descripción: "Vercel frontend project ID"

#### **VERCEL_PROJECT_ID_BACKEND**

- Valor: `prj_[ID_BACKEND]` (el ID del proyecto backend)
- Descripción: "Vercel backend project ID"

#### **VERCEL_TOKEN**

- Valor: Token generado con `vercel token create`
- Descripción: "Vercel deployment token"

#### **DATABASE_URL**

- Valor: `postgresql://postgres:[Superteomo0021]@db.ibhqifagaabhsgbflyxb.supabase.co:5432/postgres`
- Descripción: "Supabase PostgreSQL connection string"

#### **NEXT_PUBLIC_API_URL**

- Valor: `https://smart-agenda-backend.vercel.app`
- Descripción: "Backend API URL for frontend"

### 🚀 Una vez configurado:

1. **Merge** el PR `feature/app-title-from-db → main`
2. **Push** a main
3. **Deploy automático** via GitHub Actions

### ✅ Checklist de configuración:

- [ ] `vercel projects list` → Obtener IDs
- [ ] `vercel token create` → Generar token
- [ ] GitHub → Settings → Secrets → Add 6 variables
- [ ] Merge PR to main
- [ ] Ver deploy automático en Actions

### 🔍 Verificación:

Después de configurar, debería aparecer:

```
Secrets (6)
• VERCEL_ORG_ID          •••••••••••••••••••••••••••••••
• VERCEL_PROJECT_ID_FRONTEND ••••••••••••••••••••••••••
• VERCEL_PROJECT_ID_BACKEND •••••••••••••••••••••••••••
• VERCEL_TOKEN            ••••••••••••••••••••••••••••••••••••
• DATABASE_URL            •••••••••••••••••••••••••••••••••••••••••••
• NEXT_PUBLIC_API_URL     ••••••••••••••••••••••••••••••••••••••
```

**¿Necesitas ayuda para obtener los IDs de Vercel?**
