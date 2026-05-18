# ⚡ Setup Rápido - Sistema de Reservas

## 🚀 Pasos para ponerlo en marcha (15 minutos)

### 1️⃣ Crear cuenta en Supabase

```
1. Ve a: https://supabase.com
2. Sign up (gratis)
3. Click "New Project"
4. Rellena:
   - Name: fran-fuentes-reservas
   - Password: (guárdala)
   - Region: Europe West
5. Espera 2 min
```

---

### 2️⃣ Crear la tabla en Supabase

```
1. En Supabase → "SQL Editor"
2. Abre el archivo: supabase-setup.sql
3. Copia TODO el contenido
4. Pega en el editor
5. Click "Run"
6. ✅ Verás: "Success. No rows returned"
```

---

### 3️⃣ Obtener credenciales

```
1. En Supabase → Settings (⚙️) → API
2. Copia:
   - Project URL
   - anon public key
```

---

### 4️⃣ Configurar el proyecto

**Abre el archivo:** `.env.local`

**Pega tus credenciales:**

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

**Guarda el archivo.**

---

### 5️⃣ Instalar dependencias (si no lo hiciste)

```bash
npm install
```

---

### 6️⃣ Arrancar el proyecto

```bash
npm run dev
```

---

### 7️⃣ Probar

**Abrir en el navegador:**

- Web: http://localhost:5173
- Admin: http://localhost:5173/admin

**Crear una reserva de prueba:**

1. Click "Reservar Cita"
2. Elige servicio
3. Elige día
4. Elige hora
5. Rellena datos
6. Click "Confirmar"

**Verificar que se guardó:**

1. Ve a: http://localhost:5173/admin
2. Deberías ver tu reserva

**O en Supabase:**

1. Supabase → Table Editor → bookings
2. Verás tu reserva

---

## ✅ Checklist de verificación

- [ ] Proyecto Supabase creado
- [ ] Script SQL ejecutado (tabla `bookings` existe)
- [ ] Credenciales copiadas en `.env.local`
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona
- [ ] Formulario de reservas funciona
- [ ] Panel admin muestra las reservas

---

## 🆘 Problemas comunes

### "Faltan credenciales de Supabase"

❌ No configuraste `.env.local`  
✅ Crea el archivo y pega las credenciales

---

### "relation 'bookings' does not exist"

❌ No ejecutaste el script SQL  
✅ Ve a Supabase → SQL Editor → Ejecuta `supabase-setup.sql`

---

### La reserva no se guarda

1. Abre la consola del navegador (F12)
2. Mira si hay errores en rojo
3. Verifica que Supabase esté activo
4. Revisa que las credenciales sean correctas

---

## 📚 Documentación completa

Si quieres entender **cómo funciona todo**, lee:

👉 **GUIA-SISTEMA-RESERVAS.md**

---

## 🎯 URLs importantes

| Recurso | URL |
|---------|-----|
| Supabase Dashboard | https://supabase.com/dashboard |
| Tu proyecto | https://supabase.com/dashboard/project/TU_ID |
| Web local | http://localhost:5173 |
| Admin local | http://localhost:5173/admin |
| Docs Supabase | https://supabase.com/docs |

---

## 🚢 Desplegar a producción

### Opción 1: Vercel (Recomendado)

```bash
1. Ve a: https://vercel.com
2. Conecta tu repo de GitHub
3. En "Environment Variables" añade:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Deploy
```

### Opción 2: Netlify

```bash
1. Ve a: https://netlify.com
2. Arrastra la carpeta "dist" (después de hacer npm run build)
3. En "Environment Variables" añade las credenciales
```

---

## 🔒 Seguridad

**IMPORTANTE:** Nunca subas `.env.local` a GitHub

Verificar que está en `.gitignore`:

```bash
cat .gitignore | grep "*.local"
```

Debe aparecer: `*.local`

---

## 📞 Contacto con el peluquero

**WhatsApp:** 617 087 011  
**Dirección:** Av. Música 12, El Puerto de Santa María

---

**¡Listo! 🎉**

Si todo funciona, ya tienes un sistema de reservas profesional.
