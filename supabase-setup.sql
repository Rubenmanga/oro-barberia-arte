-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE SUPABASE
-- Sistema de Reservas para Fran Fuentes Peluquero's
-- ============================================

-- 1. Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings(date);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 4. Política: Cualquiera puede crear una reserva (para el formulario público)
CREATE POLICY "Cualquiera puede crear reservas"
ON bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Política: Cualquiera puede leer reservas (para mostrar disponibilidad)
CREATE POLICY "Cualquiera puede leer reservas"
ON bookings
FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Política: Solo usuarios autenticados pueden actualizar/eliminar
-- (Para el panel de administración - lo configuraremos más adelante)
CREATE POLICY "Solo admins pueden actualizar"
ON bookings
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Solo admins pueden eliminar"
ON bookings
FOR DELETE
TO authenticated
USING (true);

-- 7. Crear una función para limpiar reservas antiguas automáticamente
-- (Opcional: elimina reservas canceladas de hace más de 30 días)
CREATE OR REPLACE FUNCTION cleanup_old_bookings()
RETURNS void AS $$
BEGIN
  DELETE FROM bookings
  WHERE status = 'cancelled'
  AND created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- INSTRUCCIONES DE USO:
-- ============================================
-- 1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
-- 2. Selecciona tu proyecto
-- 3. Ve a "SQL Editor" en el menú lateral
-- 4. Copia y pega todo este script
-- 5. Haz clic en "Run" para ejecutarlo
-- 6. ¡Listo! Tu base de datos está configurada
-- ============================================
