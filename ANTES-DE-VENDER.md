# ✅ Checklist: Antes de vender el producto

## 🎯 Objetivo

Este documento lista todo lo que debes hacer/cambiar antes de presentarle el producto a tu peluquero.

---

## 📝 Datos de contacto

### Cambiar TODOS los números de teléfono

Busca en el proyecto: `617087011`

**Archivos a modificar:**

1. **src/components/Booking.tsx** (línea ~148, ~154, ~159)
   ```tsx
   // Línea ~42 en submitBooking()
   const whatsappUrl = `https://wa.me/34617087011?text=...`;
   
   // Línea ~148
   href="https://wa.me/34617087011"
   
   // Línea ~154
   href="tel:617087011"
   ```

2. **src/components/Footer.tsx** (si existe)

3. **README.md** (documentación)

**Cambiar a:** El teléfono REAL del peluquero

---

## 📧 Email de contacto

Busca en el proyecto si hay emails hardcodeados.

**Cambiar a:** El email real de la peluquería

---

## 🗺️ Dirección

Actualmente: `Av. Música 12, El Puerto de Santa María`

**Verificar que es correcta** en:
- Hero.tsx
- Footer.tsx
- README.md

---

## 🎨 Personalización

### Imágenes

1. **service-wheel.png** (imagen de fondo del selector circular)
   - Ubicación: `/public/service-wheel.png`
   - Debería ser una imagen de la peluquería o servicios
   - Tamaño recomendado: 1000x1000px

2. **Favicon** (icono del navegador)
   - Ubicación: `/public/favicon.ico`
   - Crear uno personalizado

3. **Logo** (si aplica)

### Colores

Actualmente usa tonos dorados. Si quiere otros colores:

**Archivo:** `src/index.css`

```css
:root {
  --gold: 45 85% 55%;         /* Dorado principal */
  --gold-light: 45 85% 65%;   /* Dorado claro */
  --gold-dark: 42 78% 45%;    /* Dorado oscuro */
}
```

---

## 📅 Horarios

**Archivo:** `src/components/Booking.tsx`

### Días cerrados (línea ~372)

```tsx
function isDayClosed(day: number) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0; // Domingo cerrado
}
```

**Cambiar según su horario:**
- `0` = Domingo
- `6` = Sábado
- Para cerrar varios días: `return dayOfWeek === 0 || dayOfWeek === 1;`

### Horario de atención (línea ~478)

```tsx
const morningSlots = generateTimeSlots("10:00", "14:00");
const afternoonSlots = isSaturday ? [] : generateTimeSlots("17:00", "21:00");
```

**Ajustar a sus horarios reales.**

---

## ⚙️ Funcionalidades

### Autenticación del panel admin

**CRÍTICO:** Ahora cualquiera puede entrar a `/admin`

**Opciones:**

1. **URL secreta** (temporal)
   - Cambiar `/admin` por `/panel-gestion-secreto-123`
   - En `src/App.tsx`

2. **Contraseña simple** (mejor)
   ```tsx
   // Añadir un useState en Admin.tsx
   const [password, setPassword] = useState("");
   const [authenticated, setAuthenticated] = useState(false);
   
   if (!authenticated) {
     return <LoginForm onLogin={(pass) => {
       if (pass === "contraseña-secreta") {
         setAuthenticated(true);
       }
     }} />
   }
   ```

3. **Auth completo con Supabase** (óptimo)
   - Usar Supabase Auth
   - Login con email/contraseña

---

## 🧪 Testing

### Pruebas antes de entregar

- [ ] Crear reserva de prueba → Aparece en `/admin`
- [ ] Confirmar reserva → Cambia estado
- [ ] Cancelar reserva → Cambia estado
- [ ] Eliminar reserva → Desaparece
- [ ] Intentar reservar horario ocupado → Bloqueado
- [ ] Reservar domingo → Bloqueado
- [ ] Responsive móvil → Funciona bien
- [ ] Selector circular → Funciona táctil y ratón
- [ ] WhatsApp → Genera mensaje correcto

---

## 🚀 Despliegue

### Antes de subir a producción

1. **Crear dominio personalizado** (opcional)
   - Ejemplo: `reservas.franfuentespeluquero.com`
   - O usar dominio de Vercel gratis

2. **Configurar variables de entorno en Vercel/Netlify**
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

3. **Probar en producción** antes de enseñárselo

---

## 📊 Analytics (opcional)

Si quieres saber cuánta gente visita la web:

**Google Analytics:**
```bash
npm install @vercel/analytics
```

En `src/main.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

---

## 🎓 Demostración al cliente

### Guion de presentación

**1. Mostrar la web pública**
- "Mira, esta es tu nueva web"
- Hacer una reserva de prueba en vivo
- Mostrar el selector circular: "Esto es único, nadie más lo tiene"

**2. Mostrar el panel admin**
- "Aquí ves todas tus citas del día/semana"
- Confirmar/cancelar una cita
- "Te ahorra el notebook"

**3. Mostrar en móvil**
- "Mira cómo se ve en el móvil de tus clientes"

**4. Explicar beneficios**
- "Te ahorra tiempo: no tienes que anotar manualmente"
- "Tus clientes pueden reservar 24/7"
- "Menos llamadas interrumpiendo mientras cortas"
- "Se ve muy profesional"

**5. Precio y mantenimiento**
- "Hosting: 0€/mes en Vercel"
- "Supabase: 0€/mes (hasta 50.000 usuarios)"
- "Mantenimiento: te ayudo yo"

---

## 💰 Propuesta de valor

### Precio sugerido

**Opción 1: Pago único**
- 300-500€ por el desarrollo completo
- Incluye 3 meses de soporte

**Opción 2: Suscripción**
- 0€ inicial
- 30-50€/mes (incluye hosting + soporte + mejoras)

**Opción 3: Trueque**
- Cortes gratis durante X meses 😄

---

## 🎁 Features extra para impresionar

Si quieres añadir algo WOW antes de enseñárselo:

1. **Galería de trabajos**
   - Añade fotos de cortes reales
   - Crea sección "Portfolio"

2. **Reseñas de Google**
   - Integra las reseñas reales
   - Muestra las 5 estrellas

3. **Botón WhatsApp flotante**
   - Que siga al usuario al hacer scroll
   - Facilita contacto directo

4. **Video de fondo en Hero**
   - Time-lapse de un corte
   - O fotos rotativas

---

## 🔒 Seguridad

### Checklist de seguridad

- [ ] `.env.local` NO está en Git
- [ ] Variables sensibles en variables de entorno
- [ ] RLS activado en Supabase
- [ ] Panel admin protegido (mínimo URL secreta)
- [ ] HTTPS activo en producción (automático con Vercel)

---

## 📱 QR Code (bonus)

Genera un QR que lleve a la web:

1. Ve a: https://www.qr-code-generator.com/
2. Pega tu URL
3. Descarga el QR
4. Imprímelo → Póster en la peluquería

**Texto sugerido para póster:**
```
┌───────────────────────────────┐
│                               │
│   RESERVA TU CITA ONLINE      │
│                               │
│       [QR CODE AQUÍ]          │
│                               │
│   Escanea y elige tu hora     │
│   ¡Sin esperas!               │
│                               │
└───────────────────────────────┘
```

---

## 📋 Checklist final

### Antes de la reunión

- [ ] Cambié todos los datos de contacto
- [ ] Verifiqué horarios
- [ ] Probé todas las funcionalidades
- [ ] Desplegué a producción
- [ ] Probé en producción
- [ ] Protegí el panel admin
- [ ] Preparé demo en móvil
- [ ] Calculé precio a cobrar

### Durante la reunión

- [ ] Mostrar web pública
- [ ] Hacer reserva en vivo
- [ ] Mostrar panel admin
- [ ] Mostrar en móvil
- [ ] Explicar mantenimiento
- [ ] Acordar precio
- [ ] Obtener credenciales (si necesita email de negocio)

### Después de la venta

- [ ] Configurar notificaciones (si aplica)
- [ ] Enseñarle a usar el panel
- [ ] Darle acceso
- [ ] Acordar soporte
- [ ] Pedir feedback en 2 semanas

---

## 🎉 ¡Buena suerte!

Recuerda: estás ofreciendo algo que le ahorra tiempo y le hace parecer más profesional. Eso tiene valor.

**No tengas miedo de cobrar.** Has trabajado duro y el resultado es profesional.

---

## 📞 Último check

Antes de enseñárselo, pregúntate:

1. ¿Funciona TODO sin errores?
2. ¿Se ve bien en móvil?
3. ¿Los datos de contacto son correctos?
4. ¿El panel admin está protegido?
5. ¿Estoy orgulloso del resultado?

Si respondiste SÍ a todo → **¡Ve a por él! 🚀**
