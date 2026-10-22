// GET /api/availability?date=AAAA-MM-DD
// Devuelve las horas ocupadas de un día juntando:
//  - las reservas hechas en la web (Supabase)
//  - lo que Fran tenga apuntado en su Google Calendar (citas por teléfono, descansos, vacaciones)
import { calendarEnabled, getBusyIntervals, madridToDate, SLOT_MINUTES } from './_google-calendar.js';

async function webBookedSlots(date) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Faltan las credenciales de Supabase');
  const response = await fetch(`${url}/rest/v1/rpc/get_booked_slots`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_date: date }),
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}`);
  const rows = await response.json();
  return rows.map((row) => row.time ?? row);
}

function calendarBusySlots(date, busy) {
  const slots = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += SLOT_MINUTES) {
    const time = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
    const start = madridToDate(date, time);
    const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);
    if (busy.some((b) => b.start < end && b.end > start)) slots.push(time);
  }
  return slots;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const date = String(req.query.date || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'Fecha no válida' });

  let web;
  try {
    web = await webBookedSlots(date);
  } catch (error) {
    console.error('Error leyendo reservas web:', error);
    // Sin la función de Supabase el navegador hará la consulta por su cuenta
    return res.status(503).json({ error: 'Disponibilidad no disponible' });
  }

  let calendar = [];
  if (calendarEnabled()) {
    try {
      calendar = calendarBusySlots(date, await getBusyIntervals(date));
    } catch (error) {
      // Si Google falla, seguimos con las reservas web para no dejar la web sin reservas
      console.error('Error leyendo Google Calendar:', error);
    }
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ booked: [...new Set([...web, ...calendar])].sort() });
}
