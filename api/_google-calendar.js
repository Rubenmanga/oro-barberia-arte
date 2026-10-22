// Conexión con el Google Calendar de Fran mediante una cuenta de servicio.
// Los archivos de /api que empiezan por "_" no se publican como endpoints.
//
// Variables de entorno (ver GOOGLE-CALENDAR.md):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  email de la cuenta de servicio
//   GOOGLE_PRIVATE_KEY            clave privada del JSON (con los \n tal cual)
//   GOOGLE_CALENDAR_ID            email del Gmail de Fran (o el ID del calendario)
// Si falta alguna, todas las funciones no hacen nada y la web sigue funcionando.

import crypto from 'node:crypto';

export const TIME_ZONE = 'Europe/Madrid';
export const SLOT_MINUTES = 30;

const SCOPE = 'https://www.googleapis.com/auth/calendar';
const API = 'https://www.googleapis.com/calendar/v3';

let cachedToken = null;

export function calendarEnabled() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_CALENDAR_ID
  );
}

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(privateKey);
  const assertion = `${header}.${claims}.${base64url(signature)}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  if (!response.ok) throw new Error(`Google token ${response.status}: ${await response.text()}`);
  const data = await response.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

async function googleFetch(path, options = {}) {
  const token = await getAccessToken();
  return fetch(`${API}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
}

const calendarPath = () => `/calendars/${encodeURIComponent(process.env.GOOGLE_CALENDAR_ID)}`;

// Google solo acepta ids de evento con letras a-v y dígitos: un UUID sin guiones vale
export function eventIdFor(bookingId) {
  return String(bookingId).toLowerCase().replace(/[^a-v0-9]/g, '');
}

// "2026-10-23" + "17:30" (hora de Madrid) → Date en UTC
export function madridToDate(date, time) {
  const [y, mo, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    }).formatToParts(new Date(guess)).map((p) => [p.type, p.value])
  );
  const asMadrid = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(guess - (asMadrid - guess));
}

function localDateTime(date, time, plusMinutes = 0) {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + plusMinutes;
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${date}T${hh}:${mm}:00`;
}

function eventBody(booking) {
  const pending = booking.status !== 'confirmed';
  return {
    summary: `${pending ? '⏳ ' : '✂️ '}${booking.name} · ${booking.service}`,
    description: [
      `Servicio: ${booking.service}`,
      `Teléfono: ${booking.phone}`,
      `Email: ${booking.email}`,
      pending ? 'Estado: pendiente de confirmar (reserva web)' : 'Estado: confirmada',
      `Gestionar: ${process.env.SITE_URL || 'https://franfuentespeluqueros.vercel.app'}/admin`,
    ].join('\n'),
    start: { dateTime: localDateTime(booking.date, booking.time), timeZone: TIME_ZONE },
    end: { dateTime: localDateTime(booking.date, booking.time, SLOT_MINUTES), timeZone: TIME_ZONE },
    colorId: pending ? '5' : '10', // 5 = amarillo, 10 = verde
    reminders: { useDefault: true },
  };
}

// Crea o actualiza el evento de una reserva
export async function upsertBookingEvent(booking) {
  if (!calendarEnabled() || !booking.id) return 'disabled';
  const id = eventIdFor(booking.id);
  const body = JSON.stringify(eventBody(booking));
  const patch = await googleFetch(`${calendarPath()}/events/${id}`, { method: 'PATCH', body });
  if (patch.ok) return 'updated';
  if (patch.status === 410) return 'skipped'; // El evento se borró a propósito; no lo resucitamos
  if (patch.status !== 404) {
    throw new Error(`Google Calendar ${patch.status}: ${await patch.text()}`);
  }
  const insert = await googleFetch(`${calendarPath()}/events`, {
    method: 'POST',
    body: JSON.stringify({ ...eventBody(booking), id }),
  });
  if (!insert.ok && insert.status !== 409) {
    throw new Error(`Google Calendar ${insert.status}: ${await insert.text()}`);
  }
  return 'created';
}

export async function deleteBookingEvent(bookingId) {
  if (!calendarEnabled() || !bookingId) return 'disabled';
  const response = await googleFetch(`${calendarPath()}/events/${eventIdFor(bookingId)}`, { method: 'DELETE' });
  if (!response.ok && response.status !== 404 && response.status !== 410) {
    throw new Error(`Google Calendar ${response.status}: ${await response.text()}`);
  }
  return 'deleted';
}

// Intervalos ocupados del calendario de Fran en un día (incluye lo que él apunte a mano)
export async function getBusyIntervals(date) {
  if (!calendarEnabled()) return [];
  const timeMin = madridToDate(date, '00:00').toISOString();
  const timeMax = new Date(madridToDate(date, '00:00').getTime() + 24 * 3600 * 1000).toISOString();
  const response = await googleFetch('/freeBusy', {
    method: 'POST',
    body: JSON.stringify({ timeMin, timeMax, timeZone: TIME_ZONE, items: [{ id: process.env.GOOGLE_CALENDAR_ID }] }),
  });
  if (!response.ok) throw new Error(`Google freeBusy ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const calendar = Object.values(data.calendars || {})[0] || {};
  return (calendar.busy || []).map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}
