import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que existan las variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '⚠️ Faltan las credenciales de Supabase. ' +
    'Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local'
  );
}

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para las tablas
export interface Booking {
  id?: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
  notes?: string;
}
