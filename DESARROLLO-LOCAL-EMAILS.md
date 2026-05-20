# 🚨 Importante: Emails en Desarrollo Local

## Problema

Las **Vercel Serverless Functions** (como `/api/send-confirmation`) **no funcionan en desarrollo local** con Vite.

Solo funcionan cuando el proyecto está **desplegado en Vercel**.

---

## Solución Rápida: Deploy a Vercel

Para probar los emails, necesitas hacer deploy a Vercel:

### Paso 1: Commit y Push

```bash
git add .
git commit -m "feat: Sistema de emails configurado"
git push origin main
```

### Paso 2: Configurar variables en Vercel

1. Ve a tu proyecto en **Vercel Dashboard**
2. **Settings** → **Environment Variables**
3. Añade:

| Variable | Valor |
|----------|-------|
| `RESEND_API_KEY` | `re_LZJdfYL3_4EvPsS3Nuhwy79etnYGJk8kx` |
| `PELUQUERO_EMAIL` | `spam.inservible@gmail.com` |
| `VITE_SUPABASE_URL` | `https://aetvsvajbvabxjeycvpz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (tu key actual) |

### Paso 3: Redeploy

Vercel hará redeploy automático, o puedes forzarlo:
- **Deployments** → Click en el último → **Redeploy**

### Paso 4: Probar en producción

```
https://tu-proyecto.vercel.app
```

Haz una reserva y verifica que recibes los 2 emails.

---

## Alternativa: Usar Vercel CLI (Local)

Si quieres probar emails en local, instala Vercel CLI:

### Instalación

```bash
npm install -g vercel
```

### Configurar y ejecutar

```bash
# 1. Login
vercel login

# 2. Link al proyecto
vercel link

# 3. Pull de variables de entorno
vercel env pull .env.local

# 4. Ejecutar en modo desarrollo
vercel dev
```

Esto arrancará un servidor local que **sí ejecuta las serverless functions**.

---

## Estado Actual

✅ **Reservas:** Funcionan perfectamente en local  
✅ **Supabase:** Conectado y guardando datos  
✅ **Código de emails:** Implementado y listo  
⚠️ **Envío de emails:** Solo funciona en Vercel (producción o `vercel dev`)

---

## Qué funciona en cada entorno

| Funcionalidad | `npm run dev` | `vercel dev` | Vercel (Producción) |
|---------------|---------------|--------------|---------------------|
| UI y navegación | ✅ | ✅ | ✅ |
| Reservas (Supabase) | ✅ | ✅ | ✅ |
| Emails (Resend) | ❌ | ✅ | ✅ |

---

## Recomendación

**Para desarrollo rápido:**
- Usa `npm run dev` para trabajar en UI y funcionalidad
- Las reservas se guardan correctamente en Supabase
- Verás un mensaje en consola: "⚠️ Emails no disponibles en desarrollo local"

**Para probar emails:**
- Haz deploy a Vercel
- O usa `vercel dev`

---

## Archivos Clave

```
/
├── api/
│   ├── send-confirmation.js     ← Serverless function (solo funciona en Vercel)
│   └── package.json             ← Config de módulos ES
├── src/
│   └── components/
│       └── Booking.tsx          ← Llama a /api/send-confirmation
└── vercel.json                  ← Configuración de Vercel
```

---

## Próximos Pasos

1. **Hacer deploy a Vercel** (recomendado)
2. Configurar variables de entorno en Vercel
3. Probar emails en producción
4. Monitorear en Resend Dashboard

---

**Documentación:**
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel CLI](https://vercel.com/docs/cli)
