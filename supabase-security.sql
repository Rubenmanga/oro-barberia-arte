-- ============================================
-- PARCHE DE SEGURIDAD Y PRIVACIDAD (ejecutar UNA vez en Supabase → SQL Editor)
-- Sistema de Reservas para Peluquería Fran Fuentes
-- ============================================
-- Qué arregla:
--  1. Hasta ahora cualquiera con la clave pública podía LEER todas las reservas
--     (nombre, email y teléfono de todos los clientes). Eso incumple el RGPD.
--  2. Dos personas podían reservar la misma hora a la vez.
--  3. Cualquier usuario "authenticated" podía editar/borrar reservas.
--  4. No había límites de longitud en los campos públicos.
--
-- Antes de ejecutarlo:
--  - En Supabase → Authentication → Providers → Email, desactiva "Allow new users to sign up"
--    para que nadie más pueda crearse una cuenta.
--  - Cambia el email de abajo por el del usuario admin de Fran.
-- ============================================

-- 1. Función pública que devuelve SOLO las horas ocupadas de un día
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date DATE)
RETURNS TABLE ("time" TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.time FROM bookings b
  WHERE b.date = p_date AND b.status IN ('pending', 'confirmed');
$$;

GRANT EXECUTE ON FUNCTION public.get_booked_slots(DATE) TO anon, authenticated;

-- 2. Quitar la lectura pública de la tabla
DROP POLICY IF EXISTS "Cualquiera puede leer reservas" ON bookings;
DROP POLICY IF EXISTS "Solo admins pueden leer" ON bookings;
DROP POLICY IF EXISTS "Solo admins pueden actualizar" ON bookings;
DROP POLICY IF EXISTS "Solo admins pueden eliminar" ON bookings;

-- 3. Solo el admin (por email) puede leer, editar y borrar
CREATE POLICY "Solo admins pueden leer"
ON bookings FOR SELECT TO authenticated
USING ((auth.jwt() ->> 'email') = 'CAMBIAR-email-admin@ejemplo.com');

CREATE POLICY "Solo admins pueden actualizar"
ON bookings FOR UPDATE TO authenticated
USING ((auth.jwt() ->> 'email') = 'CAMBIAR-email-admin@ejemplo.com');

CREATE POLICY "Solo admins pueden eliminar"
ON bookings FOR DELETE TO authenticated
USING ((auth.jwt() ->> 'email') = 'CAMBIAR-email-admin@ejemplo.com');

-- 4. Las reservas públicas solo pueden entrar como 'pending', con fecha futura y datos razonables
DROP POLICY IF EXISTS "Cualquiera puede crear reservas" ON bookings;
CREATE POLICY "Cualquiera puede crear reservas"
ON bookings FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND date >= CURRENT_DATE
  AND date <= CURRENT_DATE + 90
  AND char_length(name) BETWEEN 2 AND 80
  AND char_length(email) BETWEEN 5 AND 120
  AND char_length(phone) BETWEEN 9 AND 20
  AND char_length(service) <= 60
  AND time ~ '^[0-2][0-9]:[0-5][0-9]$'
  AND (notes IS NULL OR char_length(notes) <= 500)
);

-- 5. Impedir dos reservas activas a la misma hora
--    (si falla, es que ya hay duplicados: cancela uno de ellos y vuelve a ejecutar)
CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_active_slot
ON bookings (date, time)
WHERE status IN ('pending', 'confirmed');
