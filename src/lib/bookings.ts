import { supabase, type Booking } from './supabase';

/**
 * Crea una nueva reserva en la base de datos
 */
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
  // Sin .select(): los visitantes no tienen permiso de lectura sobre la tabla
  // (ver supabase-security.sql), así que pedir la fila de vuelta fallaría.
  const { error } = await supabase
    .from('bookings')
    .insert([{ ...booking, status: 'pending' }]);

  if (error) {
    console.error('Error al crear reserva:', error);
    throw error;
  }
}

/**
 * Obtiene todas las reservas (para el panel admin)
 */
export async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    console.error('Error al obtener reservas:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene las reservas de una fecha específica
 */
export async function getBookingsByDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date)
    .order('time', { ascending: true });

  if (error) {
    console.error('Error al obtener reservas por fecha:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza el estado de una reserva
 */
export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled'
) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar reserva:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina una reserva
 */
export async function deleteBooking(id: string) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar reserva:', error);
    throw error;
  }

  return true;
}

/**
 * Obtiene las horas ocupadas para una fecha específica
 * Útil para deshabilitar slots en el calendario.
 *
 * Usa la función get_booked_slots (ver supabase-security.sql), que solo
 * devuelve horas, sin nombres, emails ni teléfonos de otros clientes.
 * Si la función aún no existe, recurre a la consulta antigua.
 */
export async function getBookedTimeSlots(date: string): Promise<string[]> {
  const { data: slots, error: rpcError } = await supabase.rpc('get_booked_slots', { p_date: date });
  if (!rpcError && Array.isArray(slots)) {
    return slots.map((row: { time: string } | string) => (typeof row === 'string' ? row : row.time));
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('time')
    .eq('date', date)
    .in('status', ['pending', 'confirmed']); // No incluir canceladas

  if (error) {
    console.error('Error al obtener slots ocupados:', error);
    return [];
  }

  return data.map(booking => booking.time);
}
