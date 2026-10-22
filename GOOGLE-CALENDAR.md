# 📅 Citas en el Google Calendar de Fran

Con esto Fran deja la libreta: **todas las citas están en el calendario de su móvil**.

## Cómo funciona

| Qué pasa | Qué ve Fran en Google Calendar |
| --- | --- |
| Un cliente reserva en la web | Aparece al momento una cita amarilla `⏳ Nombre · Servicio` con teléfono y email |
| Fran la confirma en `/admin` | Se pone verde `✂️ Nombre · Servicio` |
| Fran la cancela o la borra en `/admin` | Desaparece del calendario |
| **Le llaman o le escriben por WhatsApp** | Fran crea un evento normal en su calendario a esa hora → **la web deja de ofrecer esa hora** |
| Se va de vacaciones o cierra un día | Crea un evento de día completo y lo marca como **Ocupado** → la web no deja reservar ese día |

La web consulta el calendario cada vez que alguien elige día, así que no hay dos citas a la misma hora aunque unas entren por teléfono y otras por la web.

> Ojo: los eventos de día completo en Google salen como "Disponible" por defecto. Para bloquear un día hay que abrir el evento → **Mostrar como: Ocupado**.

## Configuración (una sola vez, unos 15 minutos)

### 1. Crear la cuenta de servicio (lo haces tú)

1. Entra en https://console.cloud.google.com con tu cuenta de Google y crea un proyecto, por ejemplo `peluqueria-fran`.
2. Menú → **APIs y servicios → Biblioteca** → busca **Google Calendar API** → **Habilitar**.
3. Menú → **IAM y administración → Cuentas de servicio** → **Crear cuenta de servicio**. Nombre: `reservas-web`. No hace falta darle roles.
4. Entra en la cuenta creada → pestaña **Claves** → **Agregar clave → Crear clave nueva → JSON**. Se descarga un archivo `.json`. Guárdalo bien y no lo subas a GitHub.

Del JSON necesitas dos valores: `client_email` y `private_key`.

### 2. Compartir el calendario (lo hace Fran, o tú con su móvil)

1. Abre https://calendar.google.com desde un ordenador con la cuenta de Fran (desde la app del móvil no se puede).
2. En la izquierda, su calendario → los tres puntos → **Configuración y uso compartido**.
3. **Compartir con determinadas personas → Añadir personas** → pega el `client_email` de la cuenta de servicio.
4. Permiso: **Hacer cambios en los eventos** → Enviar.

El ID del calendario es el Gmail de Fran (está en la misma página, en "Integrar el calendario").

### 3. Variables en Vercel

Vercel → proyecto `franfuentespeluqueros` → **Settings → Environment Variables**:

| Variable | Valor |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | el `client_email` del JSON |
| `GOOGLE_PRIVATE_KEY` | el `private_key` del JSON, entero, con `-----BEGIN…` y `…END PRIVATE KEY-----\n` |
| `GOOGLE_CALENDAR_ID` | el Gmail de Fran |
| `ADMIN_EMAIL` | el email con el que Fran entra en `/admin` (el mismo de `supabase-security.sql`) |

Después: **Deployments → … → Redeploy** para que coja las variables.

### 4. Probar

1. Haz una reserva de prueba en la web → debe salir en el calendario de Fran en unos segundos.
2. Crea un evento en su calendario mañana a las 11:00 → en la web, mañana, las 11:00 debe salir ocupada.
3. Cancela la reserva de prueba en `/admin` → desaparece del calendario.

Si algo falla, mira los logs en Vercel → **Logs** buscando "Google".

## Si no se configura

Todo sigue funcionando como antes (Supabase + emails). Las funciones de calendario simplemente no hacen nada.
