// POST /api/booking-status  { id, action: "confirmed" | "cancelled" | "deleted" }
// Lo llama el panel /admin después de cambiar una reserva, para reflejarlo en Google Calendar.
// Solo acepta la sesión del admin (ADMIN_EMAIL).
import { calendarEnabled, upsertBookingEvent, deleteBookingEvent } from './_google-calendar.js';

async function getAdminBooking(token, id) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
  if (!url || !key || !adminEmail) return { error: 500 };

  const userResponse = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${token}` },
  });
  if (!userResponse.ok) return { error: 401 };
  const user = await userResponse.json();
  if ((user.email || '').toLowerCase() !== adminEmail) return { error: 403 };

  // Leemos la reserva con la sesión del admin (las políticas de Supabase lo permiten)
  const bookingResponse = await fetch(`${url}/rest/v1/bookings?id=eq.${encodeURIComponent(id)}&select=*`, {
    headers: { apikey: key, Authorization: `Bearer ${token}` },
  });
  if (!bookingResponse.ok) return { error: 500 };
  const [booking] = await bookingResponse.json();
  return { booking };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!calendarEnabled()) return res.status(200).json({ calendar: 'disabled' });

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const { id, action } = req.body || {};
  if (!token || !id || !['confirmed', 'cancelled', 'deleted'].includes(action)) {
    return res.status(400).json({ error: 'Datos no válidos' });
  }

  try {
    const { booking, error } = await getAdminBooking(token, id);
    if (error) return res.status(error).json({ error: 'No autorizado' });

    if (action === 'confirmed' && booking) {
      return res.status(200).json({ calendar: await upsertBookingEvent({ ...booking, status: 'confirmed' }) });
    }
    return res.status(200).json({ calendar: await deleteBookingEvent(id) });
  } catch (error) {
    console.error('Error actualizando Google Calendar:', error);
    return res.status(502).json({ error: 'No se pudo actualizar el calendario' });
  }
}
