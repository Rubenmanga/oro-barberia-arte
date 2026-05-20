# 🧪 Guía de Testing - Sistema de Emails

Guía rápida para probar que los emails de confirmación funcionan correctamente.

---

## 📋 Pre-requisitos

Antes de empezar los tests, asegúrate de tener:

- ✅ Cuenta de Resend creada
- ✅ API Key de Resend configurada
- ✅ Variables de entorno configuradas (`RESEND_API_KEY` y `PELUQUERO_EMAIL`)
- ✅ Aplicación corriendo en local o en Vercel

---

## 🧪 Tests en Desarrollo Local

### Test 1: Verificar variables de entorno

```bash
# En la raíz del proyecto
cat .env.local
```

Deberías ver:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
PELUQUERO_EMAIL=tu-email@gmail.com
```

### Test 2: Arrancar servidor de desarrollo

```bash
npm run dev
```

Verifica que no hay errores de importación de `resend`.

### Test 3: Hacer una reserva de prueba

1. Abre `http://localhost:3000`
2. Ve a la sección "Reservar"
3. Completa el wizard:
   - **Paso 1:** Selecciona un servicio (ej: "Corte Clásico")
   - **Paso 2:** Selecciona una fecha futura
   - **Paso 3:** Selecciona una hora disponible
   - **Paso 4:** Completa tus datos reales (usa tu email personal)
4. Haz clic en "Confirmar reserva"

### Test 4: Verificar logs en consola

En la terminal del servidor deberías ver:

```bash
✅ Reserva guardada: { ... }
✅ Emails de confirmación enviados
📱 WhatsApp URL: https://wa.me/...
```

Si ves errores:
```bash
Error enviando email al cliente: [descripción]
Error enviando email al peluquero: [descripción]
```

### Test 5: Revisar emails recibidos

1. **Email del cliente:**
   - Ve a tu bandeja de entrada
   - Busca email con asunto: "Confirmación de reserva - [Servicio]"
   - Verifica que aparecen todos los datos correctos

2. **Email del peluquero:**
   - Ve al email configurado en `PELUQUERO_EMAIL`
   - Busca email con asunto: "Nueva Reserva - [Nombre] - [Servicio]"
   - Verifica que aparecen todos los datos del cliente

### Test 6: Verificar en Resend Dashboard

1. Ve a [resend.com/emails](https://resend.com/emails)
2. Deberías ver 2 emails enviados (cliente + peluquero)
3. Revisa el estado: debe ser "Delivered"
4. Haz clic en cada email para ver los detalles

---

## 🌐 Tests en Producción (Vercel)

### Pre-requisitos producción

1. Variables de entorno configuradas en Vercel:
   ```
   Settings → Environment Variables
   - RESEND_API_KEY
   - PELUQUERO_EMAIL
   ```

2. Hacer un deploy después de configurar las variables

### Test 1: Verificar variables en Vercel

```bash
# Si tienes Vercel CLI instalado
vercel env ls
```

O manualmente en: `Dashboard → Settings → Environment Variables`

### Test 2: Verificar logs de la función

1. Ve a tu proyecto en Vercel
2. Selecciona el último deployment
3. Ve a "Functions" → `/api/send-confirmation`
4. Revisa los logs

### Test 3: Hacer reserva de prueba en producción

1. Abre tu dominio de producción (ej: `tuapp.vercel.app`)
2. Completa una reserva de prueba
3. Verifica que recibes ambos emails

### Test 4: Monitorear errores

Si algo falla:

1. **Vercel Logs:**
   ```
   Dashboard → Deployment → Functions → Logs
   ```

2. **Resend Logs:**
   ```
   Dashboard → Logs
   ```

3. **Browser Console:**
   ```
   F12 → Console → buscar errores de fetch
   ```

---

## 🐛 Solución de problemas

### Problema: No se envían emails

**Posibles causas:**

1. **API Key incorrecta**
   - Verifica que la API Key es válida
   - Comprueba que no tiene espacios al inicio/final
   - Genera una nueva API Key en Resend

2. **Variables no cargadas**
   ```bash
   # Reinicia el servidor local
   npm run dev
   
   # En Vercel, haz un redeploy
   vercel --prod
   ```

3. **Email de destino inválido**
   - Verifica que `PELUQUERO_EMAIL` es un email válido
   - Prueba con otro email

### Problema: Emails van a SPAM

**Soluciones:**

1. **Configurar dominio propio en Resend**
   - Verifica tu dominio
   - Configura SPF, DKIM, DMARC

2. **Revisar contenido del email**
   - Evita palabras spam (GRATIS, URGENTE, ¡¡¡)
   - Añade enlaces válidos
   - Incluye dirección física del negocio

3. **Whitelist temporal**
   - Añade `onboarding@resend.dev` a tus contactos
   - Marca un email como "No es spam"

### Problema: Error 500 en la API

**Debug:**

1. **Ver logs detallados:**
   ```typescript
   // En route.ts, añadir más console.logs
   console.log('Body recibido:', body);
   console.log('Resend API Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
   ```

2. **Verificar formato de datos:**
   - El body debe incluir: name, email, service, date, time, phone
   - Todos los campos deben ser strings

3. **Test manual de la API:**
   ```bash
   curl -X POST http://localhost:3000/api/send-confirmation \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "service": "Corte Clásico",
       "date": "2024-12-25",
       "time": "10:00",
       "phone": "600000000"
     }'
   ```

### Problema: Solo se envía un email

**Causa:** `Promise.allSettled` permite que uno falle sin afectar al otro.

**Verificar:**
```typescript
// En route.ts, revisar el objeto results
console.log('Results:', results);
// Debería mostrar: { customerEmail: 'sent', barberEmail: 'sent' }
```

Si uno muestra `'failed'`, revisa los logs de error para ese email específico.

---

## ✅ Checklist de testing completo

### Desarrollo local
- [ ] Variables de entorno configuradas
- [ ] Servidor arranca sin errores
- [ ] Reserva se crea en Supabase
- [ ] Email del cliente se envía
- [ ] Email del peluquero se envía
- [ ] Emails tienen formato correcto
- [ ] Datos en emails son correctos
- [ ] Links de WhatsApp funcionan

### Producción
- [ ] Variables configuradas en Vercel
- [ ] Deploy exitoso
- [ ] Reserva se crea en Supabase
- [ ] Email del cliente se envía
- [ ] Email del peluquero se envía
- [ ] Logs de Vercel sin errores
- [ ] Logs de Resend sin errores
- [ ] Emails no van a SPAM

### Edge cases
- [ ] Caracteres especiales en el nombre (ñ, á, etc.)
- [ ] Emails con + (ej: user+test@gmail.com)
- [ ] Nombres muy largos
- [ ] Servicios con caracteres especiales
- [ ] Fechas en diferentes formatos
- [ ] Test en diferentes navegadores
- [ ] Test en dispositivos móviles

---

## 📊 Métricas esperadas

### Tiempos de respuesta
- Tiempo de envío: < 2 segundos
- Tiempo de entrega: < 30 segundos
- Tiempo total reserva: < 5 segundos

### Tasa de éxito
- Emails entregados: > 98%
- Emails leídos: variable (depende del usuario)
- Emails en SPAM: < 2%

---

## 🔄 Test de regresión

Cada vez que hagas cambios en:
- `src/app/api/send-confirmation/route.ts`
- `src/components/Booking.tsx`
- Variables de entorno

**Ejecuta estos tests rápidos:**

1. **Test de humo (2 min):**
   - Crear una reserva
   - Verificar que llegan ambos emails

2. **Test visual (1 min):**
   - Abrir el email en el navegador
   - Verificar que el diseño se ve bien

3. **Test de datos (1 min):**
   - Verificar que todos los campos son correctos
   - Comprobar formato de fecha/hora en español

---

## 📝 Registro de tests

Lleva un registro de tus tests para tracking:

```
Fecha: 2024-XX-XX
Tester: [Tu nombre]
Entorno: [Local / Producción]
Resultado: [✅ / ❌]
Notas: [Observaciones]
```

**Ejemplo:**
```
Fecha: 2024-12-20
Tester: Juan
Entorno: Producción
Resultado: ✅
Notas: Todos los emails se enviaron correctamente. 
       Cliente reporta que recibió confirmación inmediata.
```

---

¿Encuentras algún bug? Documéntalo en el README o crea un issue en GitHub.

¡Happy testing! 🎉
