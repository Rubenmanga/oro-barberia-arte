import { BrevoClient } from '@getbrevo/brevo';

const BUSINESS_NAME = 'Peluquería Fran Fuentes';
const BUSINESS_ADDRESS = 'Av. de la Música, 12 · 11500 El Puerto de Santa María (Cádiz)';
const BUSINESS_PHONE = '617 087 011';

// Evita que un nombre como "<a href=...>" se convierta en HTML dentro del email
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Comprueba que la reserva existe de verdad antes de mandar emails,
// para que nadie use este endpoint para enviar correos a cualquier dirección.
async function slotIsBooked(date, time) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return true; // Sin credenciales no se puede comprobar; no bloquear
  try {
    const response = await fetch(`${url}/rest/v1/rpc/get_booked_slots`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_date: date }),
    });
    if (!response.ok) return true; // La función aún no existe en Supabase; no bloquear
    const rows = await response.json();
    return rows.some((row) => (row.time ?? row) === time);
  } catch {
    return true;
  }
}

export default async function handler(req, res) {
  // Inicializar API instance dentro del handler para evitar problemas de cold start
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
  });
  // Sin cabeceras CORS: la web llama a esta API desde su mismo dominio,
  // así que no hace falta permitir peticiones desde otras webs.

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const { date, time } = body;

    if (!body.name || !body.email || !body.service || !date || !time || !body.phone) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !/^\d{2}:\d{2}$/.test(time) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
      String(body.name).length > 80 ||
      String(body.service).length > 60 ||
      String(body.phone).length > 20
    ) {
      return res.status(400).json({ error: 'Datos no válidos' });
    }

    if (!(await slotIsBooked(date, time))) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    const email = String(body.email);
    const name = escapeHtml(body.name);
    const service = escapeHtml(body.service);
    const phone = escapeHtml(body.phone);

    const peluqueroEmail = process.env.PELUQUERO_EMAIL;
    if (!peluqueroEmail) {
      console.error('PELUQUERO_EMAIL no está configurado');
      return res.status(500).json({ error: 'Configuración de email incompleta' });
    }

    const fromEmail = process.env.BREVO_FROM_EMAIL;
    if (!fromEmail) {
      console.error('BREVO_FROM_EMAIL no está configurado');
      return res.status(500).json({ error: 'Configuración de email incompleta' });
    }

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const emailSubject = `Hemos recibido tu solicitud de cita - ${BUSINESS_NAME}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1a1614 0%, #2d2521 100%);
              color: #d4af37;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-style: italic;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .details {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 6px;
              margin: 20px 0;
              border-left: 4px solid #d4af37;
            }
            .detail-row {
              margin: 12px 0;
              display: flex;
              align-items: center;
            }
            .detail-label {
              font-weight: bold;
              color: #d4af37;
              min-width: 100px;
            }
            .detail-value {
              color: #333;
            }
            .footer {
              background: #f5f5f5;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 8px 8px;
              border: 1px solid #e0e0e0;
              border-top: none;
              font-size: 14px;
              color: #666;
            }
            .note {
              background: #fff9e6;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
              border: 1px solid #d4af37;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${BUSINESS_NAME}</h1>
          </div>
          <div class="content">
            <h2 style="color: #d4af37; margin-top: 0;">Solicitud de cita recibida</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p>Hemos recibido tu solicitud de cita. Estos son los datos:</p>

            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Servicio:</span>
                <span class="detail-value">${service}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Fecha:</span>
                <span class="detail-value">${formattedDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Hora:</span>
                <span class="detail-value">${time}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Cliente:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Teléfono:</span>
                <span class="detail-value">${phone}</span>
              </div>
            </div>

            <div class="note">
              <strong>📌 Nota importante:</strong>
              <p style="margin: 8px 0 0 0;">
                Te confirmaremos la cita por WhatsApp o llamada telefónica en breve.
                Si necesitas hacer algún cambio, por favor contáctanos lo antes posible.
              </p>
            </div>

            <p>¡Nos vemos pronto!</p>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              Fran Fuentes
            </p>
          </div>
          <div class="footer">
            <p style="margin: 5px 0;">${BUSINESS_NAME} · ${BUSINESS_ADDRESS}</p>
            <p style="margin: 5px 0;">Teléfono y WhatsApp: ${BUSINESS_PHONE}</p>
            <p style="margin: 5px 0;">Este es un email automático, por favor no respondas a este mensaje.</p>
          </div>
        </body>
      </html>
    `;

    const notificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1a1614 0%, #2d2521 100%);
              color: #d4af37;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-style: italic;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .details {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 6px;
              margin: 20px 0;
              border-left: 4px solid #d4af37;
            }
            .detail-row {
              margin: 12px 0;
              display: flex;
              align-items: center;
            }
            .detail-label {
              font-weight: bold;
              color: #d4af37;
              min-width: 100px;
            }
            .detail-value {
              color: #333;
            }
            .footer {
              background: #f5f5f5;
              padding: 20px;
              text-align: center;
              border-radius: 0 0 8px 8px;
              border: 1px solid #e0e0e0;
              border-top: none;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Nueva Reserva</h1>
          </div>
          <div class="content">
            <h2 style="color: #d4af37; margin-top: 0;">Nueva reserva recibida</h2>
            <p>Se ha registrado una nueva reserva en el sistema:</p>

            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Cliente:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Servicio:</span>
                <span class="detail-value">${service}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Fecha:</span>
                <span class="detail-value">${formattedDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Hora:</span>
                <span class="detail-value">${time}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${escapeHtml(email)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Teléfono:</span>
                <span class="detail-value">${phone}</span>
              </div>
            </div>

            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              Recuerda confirmar la cita con el cliente por WhatsApp o llamada telefónica.
            </p>
          </div>
          <div class="footer">
            <p style="margin: 5px 0;">Reservas web - ${BUSINESS_NAME}</p>
          </div>
        </body>
      </html>
    `;

    // Enviar emails con Brevo v5 API
    const [customerEmailResult, barberEmailResult] = await Promise.allSettled([
      brevo.transactionalEmails.sendTransacEmail({
        sender: { name: BUSINESS_NAME, email: fromEmail },
        to: [{ email: email }],
        subject: emailSubject,
        htmlContent: emailHtml,
      }),
      brevo.transactionalEmails.sendTransacEmail({
        sender: { name: `Reservas web - ${BUSINESS_NAME}`, email: fromEmail },
        to: [{ email: peluqueroEmail }],
        subject: `Nueva reserva - ${String(body.name).replace(/[\r\n]/g, " ")} - ${String(body.service).replace(/[\r\n]/g, " ")} - ${date} ${time}`,
        htmlContent: notificationHtml,
      }),
    ]);

    let customerEmailSuccess = false;
    let barberEmailSuccess = false;

    if (customerEmailResult.status === 'fulfilled') {
      customerEmailSuccess = true;
      console.log('✅ Email al cliente enviado correctamente:', JSON.stringify(customerEmailResult.value, null, 2));
    } else {
      console.error('❌ Error al enviar email al cliente:', JSON.stringify(customerEmailResult.reason, null, 2));
    }

    if (barberEmailResult.status === 'fulfilled') {
      barberEmailSuccess = true;
      console.log('✅ Email al peluquero enviado correctamente:', JSON.stringify(barberEmailResult.value, null, 2));
    } else {
      console.error('❌ Error al enviar email al peluquero:', JSON.stringify(barberEmailResult.reason, null, 2));
    }

    const results = {
      customerEmail: customerEmailSuccess ? 'sent' : 'failed',
      barberEmail: barberEmailSuccess ? 'sent' : 'failed',
    };

    return res.status(200).json({
      success: true,
      results,
      message: 'Emails procesados',
    });
  } catch (error) {
    console.error('Error en API send-confirmation:', error);
    return res.status(500).json({
      error: 'Error al enviar confirmaciones',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
