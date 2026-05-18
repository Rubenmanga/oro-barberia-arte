# 🚀 Desplegar a Producción

## 🎯 Opciones de hosting

### ✅ Opción 1: Vercel (Recomendada)

**Por qué Vercel:**
- ✅ **Gratis** para proyectos personales
- ✅ **Deploy automático** desde GitHub
- ✅ **HTTPS gratis** (certificado SSL)
- ✅ **Variables de entorno** fáciles de configurar
- ✅ **Muy rápido** (CDN global)
- ✅ **Hecho para Vite/React**

---

## 📋 Paso a paso: Desplegar en Vercel

### 1️⃣ Subir a GitHub

```bash
# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Sistema de reservas completo con Supabase"

# Subir a GitHub
git push origin main
```

**⚠️ IMPORTANTE:** Verifica que `.env.local` NO se sube (ya está ignorado)

---

### 2️⃣ Crear cuenta en Vercel

1. Ve a: https://vercel.com
2. Click "Sign Up"
3. Elige "Continue with GitHub"
4. Autoriza Vercel

---

### 3️⃣ Importar proyecto

1. En el dashboard de Vercel → Click "Add New" → "Project"
2. Busca tu repositorio: `oro-barberia-arte`
3. Click "Import"

---

### 4️⃣ Configurar variables de entorno

**CRÍTICO:** Aquí es donde pones tus credenciales de Supabase

1. En la sección "Environment Variables":
   
   ```
   Name: VITE_SUPABASE_URL
   Value: https://tu-proyecto.supabase.co
   ```

   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
   ```

2. Asegúrate de seleccionar:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

---

### 5️⃣ Deploy

1. Click "Deploy"
2. Espera 1-2 minutos
3. ✅ ¡Listo!

**Tu web estará en:**
```
https://oro-barberia-arte.vercel.app
```

O puedes configurar dominio personalizado:
```
https://reservas.franfuentes.com
```

---

## 🔄 Actualizaciones automáticas

Cada vez que hagas `git push`:
- Vercel detecta el cambio
- Hace build automático
- Despliega la nueva versión
- Todo en 1-2 minutos

**No tienes que hacer nada más.**

---

## ✅ Verificar que funciona en producción

1. Abre tu URL de Vercel
2. Haz una reserva de prueba
3. Ve a `/admin` → Debería aparecer
4. Comprueba que los botones de WhatsApp funcionan

**Si todo funciona → ¡Ya está en producción! 🎉**

---

## 🆚 Lovable.ai vs Vercel

### Lovable.ai

**Ventajas:**
- Fácil para prototipos rápidos
- Editor visual

**Desventajas:**
- ❌ No soporta bien variables de entorno personalizadas
- ❌ Menos control sobre el despliegue
- ❌ No es estándar de la industria
- ❌ Difícil migrar después

### Vercel (Recomendado)

**Ventajas:**
- ✅ Estándar de la industria
- ✅ Variables de entorno fáciles
- ✅ Git workflow profesional
- ✅ Escalable a millones de usuarios
- ✅ Gratis para siempre (plan hobby)
- ✅ Lo usan empresas reales

**Desventajas:**
- Ninguna significativa para este proyecto

---

## 💡 Recomendación

**Para aprender:** Local (`npm run dev`)  
**Para mostrar al peluquero:** Vercel  
**Para producción real:** Vercel

**NO uses Lovable.ai para este proyecto.** No está diseñado para esto.

---

## 🔒 Seguridad

### ✅ Lo que SÍ subes a GitHub

- Código fuente
- Documentación
- `package.json`
- `.env.example` (plantilla SIN credenciales)

### ❌ Lo que NO subes a GitHub

- `.env.local` (credenciales reales)
- `node_modules/`
- `dist/`
- Archivos temporales

**El `.gitignore` ya está configurado correctamente.**

---

## 🎯 Workflow recomendado

```
1. Desarrollar en local (npm run dev)
   ↓
2. Probar que todo funciona
   ↓
3. git add . && git commit -m "mensaje"
   ↓
4. git push origin main
   ↓
5. Vercel despliega automáticamente
   ↓
6. Probar en producción
   ↓
7. Repetir
```

---

## 🌐 Dominio personalizado (opcional)

Si quieres: `reservas.franfuentes.com` en vez de `*.vercel.app`

### Opción 1: Comprar dominio

1. Compra en Namecheap, Google Domains, etc. (~10€/año)
2. En Vercel → Settings → Domains
3. Añade tu dominio
4. Configura DNS (Vercel te da instrucciones)

### Opción 2: Subdominio de Vercel (gratis)

1. En Vercel → Settings → Domains
2. Puedes elegir: `tu-nombre.vercel.app`

---

## 📊 Ejemplo real de deploy

### Tu situación actual:

```
📂 Local (tu ordenador)
   ├── Código ✅
   ├── Documentación ✅
   ├── .env.local (credenciales) ✅
   └── Funciona con npm run dev ✅
```

### Después de seguir esta guía:

```
🌐 Internet (Vercel)
   ├── URL pública ✅
   ├── HTTPS automático ✅
   ├── Funciona 24/7 ✅
   └── Actualización automática ✅

📦 GitHub (repositorio)
   ├── Código respaldado ✅
   ├── Historial de cambios ✅
   └── .env.local NO SUBIDO ✅
```

---

## 🆘 Problemas comunes

### "La web funciona pero las reservas no se guardan"

**Causa:** No configuraste las variables de entorno en Vercel

**Solución:**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
4. Redeploy (Settings → Deployments → ... → Redeploy)

---

### "Build failed"

**Causa:** Error en el código o falta alguna dependencia

**Solución:**
1. Mira el log de error en Vercel
2. Copia el error
3. Búscalo en Google
4. O verifica que `npm run build` funciona en local

---

### "No puedo hacer push a GitHub"

**Causa:** No tienes permisos o no configuraste Git

**Solución:**
```bash
# Configurar Git (si no lo hiciste)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar remote
git remote -v

# Si no hay remote, añadirlo
git remote add origin https://github.com/tu-usuario/oro-barberia-arte.git
```

---

## ✅ Checklist de deploy

- [ ] `.env.local` está en `.gitignore`
- [ ] Creé `.env.example` como plantilla
- [ ] `npm run build` funciona en local
- [ ] Hice commit de todos los cambios
- [ ] Push a GitHub exitoso
- [ ] Creé cuenta en Vercel
- [ ] Importé proyecto desde GitHub
- [ ] Configuré variables de entorno en Vercel
- [ ] Deploy completado sin errores
- [ ] Probé la web en producción
- [ ] Hice una reserva de prueba
- [ ] La reserva se guardó en Supabase
- [ ] El panel admin funciona
- [ ] TODO OK ✅

---

## 🎉 Una vez desplegado

**Tu web estará online 24/7**

Puedes:
- ✅ Enseñársela al peluquero
- ✅ Compartir el link
- ✅ Hacer reservas reales
- ✅ Gestionar desde `/admin`

**Costes:**
- Hosting: **0€** (Vercel gratis)
- Base de datos: **0€** (Supabase gratis)
- Dominio: **0€** (si usas vercel.app) o ~10€/año

---

## 💰 Cuándo empezar a cobrar

**Gratis mientras aprendes:**
- Vercel: Plan Hobby (gratis para siempre)
- Supabase: 500MB + 50,000 usuarios/mes

**Cobrar al cliente cuando:**
- Supere 50,000 reservas/mes (nunca pasará en una peluquería)
- Quiera dominio personalizado (~10€/año)
- Quiera features adicionales

**Conclusión:** Puedes venderlo sin costes de infraestructura.

---

## 📞 Resumen ejecutivo

**¿Dónde hostear?**
👉 **Vercel** (no Lovable.ai)

**¿Cuánto cuesta?**
👉 **0€/mes** para siempre

**¿Cuánto tarda?**
👉 **10 minutos** primera vez, **1 minuto** después

**¿Es difícil?**
👉 **No**, solo seguir 5 pasos

**¿Lo puedo vender así?**
👉 **Sí**, es producción real

---

## 🚀 Acción inmediata

```bash
# 1. Asegúrate de que .env.local no se sube
git status

# 2. Añade todo
git add .

# 3. Commit
git commit -m "feat: Sistema de reservas completo con Supabase y panel admin"

# 4. Push
git push origin main

# 5. Ve a vercel.com y despliega
```

**¡En 10 minutos estará online! 🌐**
