import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } from '@getbrevo/brevo';
import { NextResponse } from 'next/server';

interface BookingEmailData {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    // Inicializar API instance dentro del handler
    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

    const body: BookingEmailData = await request.json();
    const { name, email, service, date, time, phone } = body;

    if (!name || !email || !service || !date || !time || !phone) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const peluqueroEmail = process.env.PELUQUERO_EMAIL;
    if (!peluqueroEmail) {
      console.error('PELUQUERO_EMAIL no está configurado');
      return NextResponse.json(
        { error: 'Configuración de email incompleta' },
        { status: 500 }
      );
    }

    const fromEmail = process.env.BREVO_FROM_EMAIL;
    if (!fromEmail) {
      console.error('BREVO_FROM_EMAIL no está configurado');
      return NextResponse.json(
        { error: 'Configuración de email incompleta' },
        { status: 500 }
      );
    }

    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const emailSubject = `Confirmación de reserva - ${service}`;
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
            <h1>Oro Barbería Arte</h1>
          </div>
          <div class="content">
            <h2 style="color: #d4af37; margin-top: 0;">¡Reserva confirmada!</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p>Hemos recibido tu reserva correctamente. Aquí están los detalles de tu cita:</p>

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
              El equipo de Oro Barbería Arte
            </p>
          </div>
          <div class="footer">
            <p style="margin: 5px 0;">Oro Barbería Arte</p>
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
                <span class="detail-value">${email}</span>
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
            <p style="margin: 5px 0;">Sistema de Reservas - Oro Barbería Arte</p>
          </div>
        </body>
      </html>
    `;

    // Preparar emails con Brevo
    const customerEmail = new SendSmtpEmail();
    customerEmail.sender = { name: 'Oro Barbería Arte', email: fromEmail };
    customerEmail.to = [{ email: email }];
    customerEmail.subject = emailSubject;
    customerEmail.htmlContent = emailHtml;

    const barberEmail = new SendSmtpEmail();
    barberEmail.sender = { name: 'Sistema de Reservas', email: fromEmail };
    barberEmail.to = [{ email: peluqueroEmail }];
    barberEmail.subject = `Nueva Reserva - ${name} - ${service}`;
    barberEmail.htmlContent = notificationHtml;

    const [customerEmailResult, barberEmailResult] = await Promise.allSettled([
      apiInstance.sendTransacEmail(customerEmail),
      apiInstance.sendTransacEmail(barberEmail),
    ]);

    // Brevo lanza excepciones en caso de error, por lo que solo verificamos el status de la promesa
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

    return NextResponse.json({
      success: true,
      results,
      message: 'Emails procesados',
    });
  } catch (error) {
    console.error('Error en API send-confirmation:', error);
    return NextResponse.json(
      { error: 'Error al enviar confirmaciones', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
