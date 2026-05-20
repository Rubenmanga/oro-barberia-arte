# 📧 Configuración de Resend para Emails de Confirmación

Esta guía te ayudará a configurar Resend para enviar emails automáticos de confirmación de reservas.

---

## 🎯 ¿Qué hace?

Cuando un cliente completa una reserva:

1. **El cliente** recibe un email de confirmación con todos los detalles de su cita
2. **El peluquero** recibe una notificación por email con los datos del cliente y la reserva

---

## ⚡ Configuración rápida (5 minutos)

### Paso 1: Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Haz clic en "Sign Up"
3. Regístrate con tu email (es gratis)

### Paso 2: Obtener API Key

1. Una vez dentro del dashboard de Resend
2. Ve a **API Keys** en el menú lateral
3. Haz clic en **Create API Key**
4. Dale un nombre (ejemplo: "Oro Barbería Producción")
5. Copia la API Key (la necesitarás en el siguiente paso)

⚠️ **Importante:** Guarda la API Key en un lugar seguro. Solo se muestra una vez.

### Paso 3: Configurar variables de entorno

#### Para desarrollo local:

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Email donde recibirás las notificaciones de nuevas reservas
PELUQUERO_EMAIL=tu-email@gmail.com
```

#### Para producción (Vercel):

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade las siguientes variables:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `RESEND_API_KEY` | `re_xxxxx...` | Production, Preview, Development |
| `PELUQUERO_EMAIL` | `tu-email@gmail.com` | Production, Preview, Development |

4. Haz clic en **Save**
5. Redeploy tu proyecto para que tome las nuevas variables

---

## 📝 Personalizar el email

Los templates de email están en: `src/app/api/send-confirmation/route.ts`

Puedes personalizar:

- **Colores y diseño:** Modifica los estilos CSS en la sección `<style>` del HTML
- **Textos:** Cambia los mensajes de confirmación
- **Logo:** Añade el logo de tu negocio en el header
- **Información adicional:** Añade detalles como dirección, mapa, etc.

### Ejemplo: Añadir logo

```html
<div class="header">
  <img src="https://tu-dominio.com/logo.png" alt="Logo" style="height: 60px; margin-bottom: 10px;">
  <h1>Oro Barbería Arte</h1>
</div>
```

---

## 🔧 Configuración avanzada: Dominio propio

Por defecto, los emails se envían desde `onboarding@resend.dev`. Para usar tu propio dominio:

### Paso 1: Verificar dominio en Resend

1. Ve a **Domains** en el dashboard de Resend
2. Haz clic en **Add Domain**
3. Introduce tu dominio (ejemplo: `orobarberiaarte.com`)
4. Resend te dará registros DNS para configurar

### Paso 2: Configurar DNS

1. Ve al panel de tu proveedor de dominios (GoDaddy, Namecheap, Cloudflare, etc.)
2. Añade los registros DNS que Resend te proporcionó:
   - **SPF** (TXT)
   - **DKIM** (TXT)
   - **DMARC** (TXT)

### Paso 3: Actualizar el código

Edita `src/app/api/send-confirmation/route.ts`:

```typescript
// Cambiar esto:
from: 'Oro Barbería Arte <onboarding@resend.dev>',

// Por esto:
from: 'Oro Barbería Arte <reservas@orobarberiaarte.com>',
```

---

## 🧪 Probar los emails

### 1. Probar en desarrollo local

```bash
npm run dev
```

Luego:
1. Ve a `http://localhost:3000`
2. Completa una reserva de prueba
3. Verifica que recibas el email

### 2. Probar con Resend CLI (opcional)

```bash
npm install -g resend-cli
resend login

# Enviar un email de prueba
resend send \
  --from "onboarding@resend.dev" \
  --to "tu-email@gmail.com" \
  --subject "Test" \
  --html "<p>Hola</p>"
```

---

## 📊 Plan gratuito de Resend

| Característica | Límite gratuito |
|----------------|-----------------|
| Emails/mes | 3,000 |
| Emails/día | 100 |
| Dominios | 1 |
| API Keys | Ilimitadas |

Para una barbería, el plan gratuito es más que suficiente. Si superas los límites, puedes:
- **Opción 1:** Actualizar al plan de pago ($20/mes para 50,000 emails)
- **Opción 2:** Usar otra alternativa como SendGrid o Mailgun

---

## 🚨 Solución de problemas

### Error: "API key inválida"

- Verifica que copiaste la API Key completa
- Asegúrate de que empieza con `re_`
- Comprueba que no hay espacios al inicio o final

### Error: "Failed to send email"

- Revisa los logs en el dashboard de Resend
- Verifica que el email del destinatario sea válido
- Comprueba que no estés en el límite de emails del plan gratuito

### Los emails van a SPAM

- Configura SPF, DKIM y DMARC en tu dominio
- Evita usar palabras spam (GRATIS, URGENTE, etc.)
- Usa un dominio propio verificado

### No llegan emails en producción

1. Verifica las variables de entorno en Vercel:
   ```bash
   vercel env ls
   ```
2. Asegúrate de que hiciste un redeploy después de añadir las variables
3. Revisa los logs en Vercel → Deployment → Functions

---

## 📚 Recursos adicionales

- [Documentación oficial de Resend](https://resend.com/docs)
- [Templates de email HTML](https://github.com/resendlabs/react-email)
- [React Email (para emails más complejos)](https://react.email)

---

## ✅ Checklist final

Antes de ir a producción, verifica:

- [ ] API Key de Resend configurada
- [ ] Variable `PELUQUERO_EMAIL` configurada
- [ ] Emails de prueba enviados correctamente
- [ ] Email del cliente tiene diseño correcto
- [ ] Email del peluquero tiene todos los datos
- [ ] Variables de entorno añadidas en Vercel
- [ ] Redeploy realizado en Vercel
- [ ] Prueba de reserva real en producción

---

¿Necesitas ayuda? Revisa los logs en:
- **Vercel:** Dashboard → Functions → Logs
- **Resend:** Dashboard → Logs

¡Listo! Ahora tus clientes recibirán confirmaciones automáticas por email. 🎉
