# 🚀 Checklist de Deploy a Producción

Lista de verificación antes de desplegar a producción en Vercel.

---

## 📋 Pre-Deploy Checklist

### 1. Código y Dependencias

- [ ] Todas las dependencias instaladas (`npm install`)
- [ ] Sin errores de TypeScript (`npm run lint`)
- [ ] Build exitoso en local (`npm run build`)
- [ ] Tests pasando (si aplica)
- [ ] Código commiteado a Git
- [ ] Push a GitHub/GitLab

### 2. Variables de Entorno

- [ ] `.env.local` configurado localmente
- [ ] Todas las variables documentadas en `.env.local.example`

**Variables requeridas:**
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
PELUQUERO_EMAIL=
```

### 3. Supabase

- [ ] Proyecto creado en Supabase
- [ ] Tabla `bookings` creada (ejecutar `supabase-setup.sql`)
- [ ] Row Level Security (RLS) configurada correctamente
- [ ] Políticas de acceso verificadas
- [ ] URLs y keys copiadas

### 4. Resend

- [ ] Cuenta creada en Resend
- [ ] API Key generada
- [ ] Límites del plan gratuito verificados (3,000/mes)
- [ ] Email de prueba enviado correctamente
- [ ] (Opcional) Dominio verificado para emails personalizados

---

## 🌐 Deploy en Vercel

### Paso 1: Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub/GitLab
4. Selecciona el proyecto `oro-barberia-arte`

### Paso 2: Configurar Framework

Vercel debería detectar automáticamente:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Paso 3: Añadir Variables de Entorno

En la sección "Environment Variables":

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_xxx...` | Production, Preview, Development |
| `PELUQUERO_EMAIL` | `tu@email.com` | Production, Preview, Development |

**⚠️ Importante:**
- Copia las variables exactamente como están en `.env.local`
- No añadas comillas a los valores
- Verifica que no hay espacios al inicio/final

### Paso 4: Deploy

1. Click en "Deploy"
2. Espera 2-3 minutos
3. Vercel te dará una URL: `https://tu-proyecto.vercel.app`

---

## ✅ Post-Deploy Checklist

### Verificación Inmediata

- [ ] La página carga correctamente
- [ ] No hay errores en la consola del navegador
- [ ] Los estilos se ven correctos
- [ ] Las imágenes cargan
- [ ] La navegación funciona

### Test de Funcionalidad

- [ ] **Selector de servicios:** Se puede seleccionar un servicio
- [ ] **Calendario:** Se puede seleccionar una fecha
- [ ] **Horarios:** Se muestran los horarios disponibles
- [ ] **Formulario:** Se puede completar el formulario
- [ ] **Reserva:** Se crea correctamente en Supabase
- [ ] **Email cliente:** Se envía y se recibe
- [ ] **Email peluquero:** Se envía y se recibe
- [ ] **WhatsApp:** El enlace funciona correctamente

### Verificación de Emails

1. **Crear reserva de prueba:**
   - Usa tu email personal
   - Completa todos los pasos
   - Confirma la reserva

2. **Verificar envío:**
   - Revisa que llegaron ambos emails
   - Comprueba el diseño en diferentes clientes (Gmail, Outlook)
   - Verifica que no están en SPAM

3. **Revisar logs:**
   - Vercel: `Dashboard → Deployment → Functions → send-confirmation`
   - Resend: `Dashboard → Logs`

### Verificación de Base de Datos

1. Ve a Supabase Dashboard
2. Table Editor → `bookings`
3. Verifica que se creó la reserva de prueba
4. Comprueba que todos los campos tienen datos correctos

---

## 🔧 Configuración Avanzada (Opcional)

### Dominio Personalizado

1. Ve a Vercel Dashboard → Settings → Domains
2. Añade tu dominio (ej: `orobarberiaarte.com`)
3. Configura los DNS según instrucciones de Vercel
4. Espera propagación DNS (24-48h)

### Analytics y Monitoring

```bash
# Instalar Vercel Analytics
npm install @vercel/analytics

# En main.tsx añadir:
import { Analytics } from '@vercel/analytics/react';
// En el componente principal:
<Analytics />
```

### Performance Optimization

- [ ] Habilitar Vercel Speed Insights
- [ ] Configurar caché headers para assets estáticos
- [ ] Optimizar imágenes (usar Next/Image si migras a Next.js)
- [ ] Habilitar compresión Brotli/Gzip

---

## 🚨 Troubleshooting Post-Deploy

### Error: "API Keys not configured"

**Solución:**
1. Verifica variables en Vercel: `Settings → Environment Variables`
2. Asegúrate de que están en todos los entornos
3. Haz un redeploy: `Deployments → Redeploy`

### Error: Build Failed

**Causas comunes:**
- TypeScript errors
- Missing dependencies
- Incorrect build command

**Solución:**
```bash
# Probar build en local
npm run build

# Si falla, corregir errores y hacer push
git add .
git commit -m "fix: build errors"
git push
```

### Error: Email Not Sending

**Verificar:**
1. Logs en Vercel Functions
2. Logs en Resend Dashboard
3. API Key configurada correctamente
4. Email de destino válido

### Error: Database Connection Failed

**Verificar:**
1. Supabase URLs correctas
2. RLS policies no bloquean inserción
3. Tabla `bookings` existe
4. Anon key tiene permisos

---

## 📊 Monitoring en Producción

### Métricas a Monitorear

**Vercel Dashboard:**
- Requests/día
- Errores (tasa de error < 1%)
- Tiempo de respuesta (< 2s)
- Build times

**Resend Dashboard:**
- Emails enviados/día
- Tasa de entrega (> 98%)
- Bounces y quejas (< 1%)
- Emails en SPAM

**Supabase Dashboard:**
- Número de reservas/día
- Queries ejecutadas
- Uso de almacenamiento
- Conexiones activas

### Alertas Recomendadas

Configura alertas para:
- Tasa de error > 5%
- Tiempo de respuesta > 5s
- Emails fallidos > 10/día
- Database down

---

## 🔄 Deploy Updates

### Para deployar cambios nuevos:

```bash
# 1. Hacer cambios en el código
# 2. Commit
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push
git push origin main

# 4. Vercel hace deploy automático
# 5. Verificar en la URL
```

### Rollback en caso de problemas:

1. Ve a Vercel Dashboard → Deployments
2. Encuentra el deployment anterior que funcionaba
3. Click en los tres puntos → "Promote to Production"

---

## ✨ Checklist Final Pre-Launch

Antes de compartir con clientes:

- [ ] **Funcionalidad:** Todo funciona correctamente
- [ ] **Performance:** Lighthouse score > 90
- [ ] **SEO:** Meta tags configuradas
- [ ] **Seguridad:** Todas las keys en variables de entorno
- [ ] **Responsive:** Funciona en móvil y desktop
- [ ] **Emails:** Diseño correcto, no van a SPAM
- [ ] **Datos:** Información de contacto actualizada
- [ ] **Analytics:** Configurado para tracking
- [ ] **Dominio:** Configurado (si aplica)
- [ ] **Backup:** Base de datos tiene backup automático

---

## 📞 Soporte

Si encuentras problemas durante el deploy:

- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Resend:** [resend.com/docs](https://resend.com/docs)

---

## 📝 Documentar el Deploy

Después del deploy exitoso, documenta:

```markdown
## Deploy Info

- **Fecha:** 2024-XX-XX
- **URL:** https://tu-proyecto.vercel.app
- **Versión:** 2.0.0
- **Deploy time:** X minutos
- **Tests:** ✅ Todos pasando
- **Emails:** ✅ Funcionando
- **Issues:** Ninguno
```

---

¡Listo para producción! 🎉
