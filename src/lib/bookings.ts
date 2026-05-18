import { supabase, type Booking } from './supabase';

/**
 * Crea una nueva reserva en la base de datos
 */
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ ...booking, status: 'pending' }])
    .select()
    .single();

  if (error) {
    console.error('Error al crear reserva:', error);
    throw error;
  }

  return data;
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
 * Útil para deshabilitar slots en el calendario
 */
export async function getBookedTimeSlots(date: string) {
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
