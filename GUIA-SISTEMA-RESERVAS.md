# 📚 Guía Completa: Sistema de Reservas con Supabase

**Por:** Tu amigo Claude 🤖  
**Para:** Aprender a crear un sistema de reservas real  
**Nivel:** Principiante / Intermedio

---

## 📖 Índice

1. [¿Qué hemos construido?](#qué-hemos-construido)
2. [Conceptos clave](#conceptos-clave)
3. [Arquitectura del sistema](#arquitectura-del-sistema)
4. [Paso a paso: Cómo funciona](#paso-a-paso-cómo-funciona)
5. [Configuración desde cero](#configuración-desde-cero)
6. [Estructura de archivos](#estructura-de-archivos)
7. [Código explicado](#código-explicado)
8. [Próximos pasos](#próximos-pasos)
9. [Solución de problemas](#solución-de-problemas)

---

## 🎯 ¿Qué hemos construido?

Hemos creado un **sistema completo de gestión de reservas** que incluye:

✅ **Formulario de reservas** con 4 pasos (wizard)  
✅ **Base de datos en la nube** (Supabase - PostgreSQL)  
✅ **Detección de horarios ocupados** en tiempo real  
✅ **Panel de administración** para gestionar citas  
✅ **Notificaciones por WhatsApp** (opcional)  
✅ **Interfaz responsive** (móvil y desktop)

---

## 🧠 Conceptos clave

### 1. **Base de Datos (Database)**

Es como un Excel gigante en la nube donde guardas información de forma organizada.

**En nuestro caso:**
- Tabla: `bookings` (reservas)
- Columnas: `id`, `service`, `date`, `time`, `name`, `email`, `phone`, `status`, `created_at`

```
┌─────────────────────────────────────────────────┐
│  TABLA: bookings                                │
├──────┬─────────┬──────────┬───────┬────────────┤
│  id  │ service │   date   │ time  │   name     │
├──────┼─────────┼──────────┼───────┼────────────┤
│  1   │ Corte   │2026-05-20│ 10:00 │ Juan Pérez │
│  2   │ Barba   │2026-05-20│ 10:30 │ Ana López  │
└──────┴─────────┴──────────┴───────┴────────────┘
```

### 2. **API (Application Programming Interface)**

Es el "mensajero" que conecta tu web con la base de datos.

**Analogía:**
- Tu web es un restaurante 🍽️
- La API es el camarero 👨‍🍳
- La base de datos es la cocina 🍳

```javascript
// Tú le pides al camarero (API):
await supabase.from('bookings').select('*')

// El camarero va a la cocina (BD) y te trae los datos
```

### 3. **CRUD (Create, Read, Update, Delete)**

Las 4 operaciones básicas con datos:

| Operación | SQL      | Función en nuestra app           |
|-----------|----------|----------------------------------|
| **C**reate| INSERT   | `createBooking()` - Crear reserva|
| **R**ead  | SELECT   | `getAllBookings()` - Leer citas  |
| **U**pdate| UPDATE   | `updateBookingStatus()` - Cambiar estado |
| **D**elete| DELETE   | `deleteBooking()` - Eliminar cita|

### 4. **Async/Await (Asíncrono)**

Cuando haces una operación que tarda tiempo (como llamar a una API), usas `async/await`.

```javascript
// ❌ INCORRECTO: Esto no funciona porque getData() tarda tiempo
const data = getData();
console.log(data); // undefined

// ✅ CORRECTO: Esperas a que termine
const data = await getData();
console.log(data); // { ... datos reales ... }
```

**Regla de oro:** Si una función es `async`, debes llamarla con `await`.

### 5. **Environment Variables (Variables de entorno)**

Son datos sensibles (contraseñas, claves API) que NO quieres subir a GitHub.

```
.env.local  ← Aquí guardas secretos (NO se sube a Git)
.gitignore  ← Le dice a Git que ignore .env.local
```

---

## 🏗️ Arquitectura del sistema

```
┌─────────────────────────────────────────────────┐
│         NAVEGADOR DEL CLIENTE                   │
│  ┌──────────────┐       ┌──────────────┐       │
│  │ Formulario   │       │ Panel Admin  │       │
│  │ (Booking.tsx)│       │ (Admin.tsx)  │       │
│  └──────┬───────┘       └──────┬───────┘       │
│         │                      │                │
│         └──────────┬───────────┘                │
│                    │                            │
└────────────────────┼────────────────────────────┘
                     │
                     ▼
            ┌────────────────┐
            │   Supabase     │
            │   (API Client) │
            │ src/lib/       │
            │ supabase.ts    │
            └────────┬───────┘
                     │
                     ▼
            ┌─────────────────┐
            │  SUPABASE CLOUD │
            │  (PostgreSQL)   │
            │                 │
            │  Tabla:         │
            │  bookings       │
            └─────────────────┘
```

**Flujo de datos:**

1. Usuario rellena formulario → Click "Reservar"
2. `Booking.tsx` llama a `createBooking()`
3. `bookings.ts` usa `supabase.from('bookings').insert()`
4. Supabase guarda en PostgreSQL
5. Respuesta vuelve al navegador
6. Se muestra confirmación ✅

---

## 🚀 Paso a paso: Cómo funciona

### **PASO 1: El usuario rellena el formulario**

```tsx
// Booking.tsx - Línea 33
const [bookingData, setBookingData] = useState<Partial<BookingData>>({});

// Cada paso guarda datos:
setBookingData({ ...bookingData, service: "Corte Caballeros" });
setBookingData({ ...bookingData, date: "2026-05-20" });
// ... etc
```

**¿Qué pasa aquí?**
- `useState` crea una variable que React observa
- Cuando cambias `bookingData`, React re-renderiza la página
- `...bookingData` mantiene los datos anteriores y añade el nuevo

### **PASO 2: Click en "Confirmar reserva"**

```tsx
// Booking.tsx - Línea 46
async function handleSubmit() {
  toast.loading("Creando tu reserva...");
  const result = await submitBooking(bookingData as BookingData);
  
  if (result.success) {
    toast.success("¡Reserva creada con éxito!");
    setSubmitted(true);
  }
}
```

**¿Qué pasa aquí?**
1. Muestra un mensaje de carga
2. Llama a `submitBooking()` y ESPERA (`await`)
3. Si funciona → Muestra éxito + pantalla de confirmación

### **PASO 3: Guardar en Supabase**

```tsx
// Booking.tsx - Línea 27
async function submitBooking(data: BookingData) {
  try {
    await createBooking({
      service: data.service,
      date: data.date,
      time: data.time,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: 'pending',
    });
    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false };
  }
}
```

**¿Qué pasa aquí?**
- `try/catch` = "Intenta esto, y si falla, captura el error"
- `createBooking()` es nuestra función auxiliar
- Devuelve `success: true/false` para saber si funcionó

### **PASO 4: Función auxiliar `createBooking()`**

```typescript
// src/lib/bookings.ts - Línea 6
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('bookings')              // Tabla
    .insert([{ ...booking }])      // Insertar datos
    .select()                      // Devolver el registro creado
    .single();                     // Solo 1 resultado

  if (error) throw error;
  return data;
}
```

**¿Qué hace cada parte?**

| Línea | Qué hace |
|-------|----------|
| `supabase.from('bookings')` | Selecciona la tabla |
| `.insert([{ ...booking }])` | Inserta el objeto como una fila |
| `.select()` | Devuelve lo que se insertó |
| `.single()` | Solo espera 1 resultado (no un array) |
| `if (error) throw error` | Si hay error, lo lanza |

### **PASO 5: Mostrar horarios ocupados**

```tsx
// Booking.tsx - Línea 486
useEffect(() => {
  async function loadBookedSlots() {
    const booked = await getBookedTimeSlots(date);
    setBookedSlots(booked);
  }
  loadBookedSlots();
}, [date]); // Se ejecuta cada vez que cambia "date"
```

**¿Qué es `useEffect`?**
- Es un "efecto secundario" que se ejecuta cuando algo cambia
- `[date]` = "Ejecuta esto cada vez que `date` cambie"
- Útil para cargar datos cuando el usuario selecciona un día

```typescript
// src/lib/bookings.ts - Línea 85
export async function getBookedTimeSlots(date: string) {
  const { data } = await supabase
    .from('bookings')
    .select('time')                              // Solo queremos la columna "time"
    .eq('date', date)                            // Filtrar: date = "2026-05-20"
    .in('status', ['pending', 'confirmed']);     // Solo pendientes y confirmadas

  return data.map(booking => booking.time);      // ["10:00", "10:30", ...]
}
```

**Resultado:** Array de strings con las horas ocupadas.

---

## ⚙️ Configuración desde cero

### **1. Crear cuenta en Supabase**

1. Ve a https://supabase.com
2. Crea una cuenta (gratis)
3. Click "New Project"
4. Rellena:
   - **Name:** `fran-fuentes-reservas`
   - **Database Password:** (guárdala en un lugar seguro)
   - **Region:** Europe West (London) - más cerca = más rápido
5. Espera 2 minutos a que se cree

### **2. Crear la tabla**

1. En el panel de Supabase → Click "SQL Editor"
2. Abre el archivo `supabase-setup.sql` (está en la raíz del proyecto)
3. Copia TODO el contenido
4. Pégalo en el editor SQL de Supabase
5. Click "Run"
6. ✅ ¡Tabla creada!

### **3. Obtener credenciales**

1. En Supabase → "Settings" (⚙️) → "API"
2. Copia estos 2 valores:

```
Project URL:  https://xxxxxxxxxxxx.supabase.co
anon public:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **4. Configurar el proyecto**

1. Abre el archivo `.env.local` (está en la raíz)
2. Pega tus credenciales:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Guarda el archivo

### **5. Arrancar el proyecto**

```bash
npm run dev
```

4. Abre http://localhost:5173
5. Prueba a crear una reserva
6. Ve a http://localhost:5173/admin para ver el panel

**Si funciona → ¡FELICIDADES! 🎉**

---

## 📂 Estructura de archivos

```
oro-barberia-arte/
├── src/
│   ├── lib/                     ← Lógica de negocio
│   │   ├── supabase.ts          ← Configuración cliente Supabase
│   │   └── bookings.ts          ← Funciones CRUD (Create, Read, Update, Delete)
│   │
│   ├── components/
│   │   └── Booking.tsx          ← Formulario de reservas (4 pasos)
│   │
│   ├── pages/
│   │   ├── Index.tsx            ← Página principal
│   │   └── Admin.tsx            ← Panel de administración
│   │
│   └── App.tsx                  ← Rutas de la aplicación
│
├── .env.local                   ← CREDENCIALES (NO SUBIR A GIT)
├── .gitignore                   ← Archivos ignorados por Git
├── supabase-setup.sql           ← Script para crear tabla
└── GUIA-SISTEMA-RESERVAS.md     ← Este archivo 📄
```

---

## 💻 Código explicado

### **A. Configuración de Supabase**

**Archivo:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que existan
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan credenciales de Supabase');
}

// Crear cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**¿Por qué `import.meta.env`?**
- En Vite, así accedes a variables de entorno
- `VITE_` es obligatorio como prefijo
- Solo las variables con `VITE_` están disponibles en el navegador

---

### **B. Función Create (Crear reserva)**

**Archivo:** `src/lib/bookings.ts`

```typescript
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
```

**Explicación línea por línea:**

| Línea | Qué hace |
|-------|----------|
| `Omit<Booking, 'id' \| 'created_at'>` | TypeScript: "Booking sin id ni created_at" (los crea Supabase) |
| `const { data, error }` | Destructuring: sacamos data y error de la respuesta |
| `.from('bookings')` | Selecciona la tabla |
| `.insert([...])` | Inserta datos (array porque puedes insertar varios) |
| `{ ...booking, status: 'pending' }` | Spread operator: copia booking + añade status |
| `.select()` | "Devuélveme lo que insertaste" |
| `.single()` | "Espero solo 1 resultado" (devuelve objeto, no array) |
| `if (error) throw error` | Si hay error, lo lanza para que lo capture el try/catch |

---

### **C. Función Read (Leer reservas)**

```typescript
export async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) throw error;
  return data;
}
```

**Explicación:**

| Línea | Qué hace | Equivalente SQL |
|-------|----------|-----------------|
| `.select('*')` | Selecciona todas las columnas | `SELECT * FROM bookings` |
| `.order('date', { ascending: true })` | Ordena por fecha ascendente | `ORDER BY date ASC` |
| `.order('time', ...)` | Ordena por hora | `ORDER BY time ASC` |

**Resultado:** Array de objetos `Booking[]`

---

### **D. Función Update (Actualizar estado)**

```typescript
export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled'
) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })           // ES6: status: status
    .eq('id', id)                 // WHERE id = ...
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

**Equivalente SQL:**

```sql
UPDATE bookings
SET status = 'confirmed'
WHERE id = '123e4567-e89b-12d3-a456-426614174000';
```

---

### **E. Función Delete (Eliminar reserva)**

```typescript
export async function deleteBooking(id: string) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
```

**Equivalente SQL:**

```sql
DELETE FROM bookings
WHERE id = '123e4567-e89b-12d3-a456-426614174000';
```

---

### **F. Hook `useEffect` para cargar datos**

```tsx
// Booking.tsx - Step3
const [bookedSlots, setBookedSlots] = useState<string[]>([]);

useEffect(() => {
  async function loadBookedSlots() {
    const booked = await getBookedTimeSlots(date);
    setBookedSlots(booked);
  }
  loadBookedSlots();
}, [date]); // ← Dependency array
```

**¿Cómo funciona?**

1. Usuario selecciona fecha → `date` cambia
2. `useEffect` detecta el cambio (porque `date` está en `[date]`)
3. Se ejecuta `loadBookedSlots()`
4. Llama a la API
5. Actualiza `bookedSlots` con `setBookedSlots()`
6. React re-renderiza con las nuevas horas ocupadas

**Sin `useEffect`:** Tendrías que llamar manualmente cada vez.  
**Con `useEffect`:** Se ejecuta automáticamente cuando cambia `date`.

---

## 🔮 Próximos pasos

### **Nivel 1: Mejoras básicas**

1. **Añadir autenticación al panel admin**
   - Ahora cualquiera puede entrar a `/admin`
   - Deberías agregar login con email/contraseña

2. **Notificación por email al peluquero**
   - Cuando alguien reserva, enviar email automático
   - Usar servicios como Resend, SendGrid o Supabase Edge Functions

3. **Campo de notas en el formulario**
   - "¿Algo que debamos saber?" (opcional)

### **Nivel 2: Funcionalidades intermedias**

4. **Recordatorios automáticos**
   - Email/SMS 1 día antes de la cita
   - Usar Supabase Edge Functions + Cron Jobs

5. **Exportar calendario**
   - Botón "Añadir a Google Calendar"
   - Generar archivo `.ics`

6. **Estadísticas en el admin**
   - Gráficos de servicios más pedidos
   - Horas pico
   - Ingresos estimados

### **Nivel 3: Producto completo**

7. **Multi-tenant (varias peluquerías)**
   - Tabla `shops`
   - Cada peluquería tiene su subdominio

8. **Sistema de pagos**
   - Integrar Stripe
   - Reservar = pagar señal del 20%

9. **App móvil**
   - React Native
   - Notificaciones push

---

## 🛠️ Solución de problemas

### **Error: "Faltan credenciales de Supabase"**

**Causa:** No configuraste `.env.local`

**Solución:**
1. Crea el archivo `.env.local` en la raíz
2. Añade:
```env
VITE_SUPABASE_URL=tu-url
VITE_SUPABASE_ANON_KEY=tu-key
```
3. Reinicia el servidor (`npm run dev`)

---

### **Error: "relation "bookings" does not exist"**

**Causa:** No ejecutaste el script SQL en Supabase

**Solución:**
1. Ve a Supabase → SQL Editor
2. Copia `supabase-setup.sql`
3. Run

---

### **Error: "Row Level Security policy violation"**

**Causa:** RLS está activado pero no configuraste políticas correctamente

**Solución:**
```sql
-- En Supabase SQL Editor:
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
```

⚠️ **Solo para desarrollo.** En producción usa políticas correctas.

---

### **Las reservas no se guardan**

**Checklist:**

1. ¿El archivo `.env.local` existe y tiene las credenciales?
2. ¿Ejecutaste el script SQL?
3. ¿Hay errores en la consola del navegador? (F12 → Console)
4. ¿Supabase está activo? (Ve al dashboard)

**Debug:**
```typescript
// Añade esto en bookings.ts
console.log("🔍 Guardando:", booking);
const { data, error } = await supabase...
console.log("✅ Respuesta:", { data, error });
```

---

## 🎓 Recursos para seguir aprendiendo

### **Documentación oficial**
- [Supabase Docs](https://supabase.com/docs) - Muy buena documentación
- [React Query Docs](https://tanstack.com/query/latest) - Para gestionar estado y cache
- [Vite Docs](https://vitejs.dev/) - El build tool que usas

### **Tutoriales recomendados**
- [Supabase YouTube Channel](https://www.youtube.com/@Supabase) - Tutoriales oficiales
- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified) - React básico
- [Fireship](https://www.youtube.com/@Fireship) - Conceptos rápidos

### **Práctica**
1. **Clona este proyecto** y modifícalo
2. **Añade una nueva feature** cada semana
3. **Compártelo** con amigos/familia para feedback

---

## ✅ Checklist de aprendizaje

Marca lo que ya dominas:

**Conceptos básicos:**
- [ ] Qué es una base de datos
- [ ] Qué es una API
- [ ] CRUD (Create, Read, Update, Delete)
- [ ] Async/Await
- [ ] Try/Catch (manejo de errores)

**React:**
- [ ] useState
- [ ] useEffect
- [ ] Props
- [ ] Componentes
- [ ] Eventos (onClick, onChange)

**Supabase:**
- [ ] Crear proyecto
- [ ] Ejecutar SQL
- [ ] Usar el cliente JS
- [ ] Operaciones CRUD

**TypeScript:**
- [ ] Tipos básicos (string, number, boolean)
- [ ] Interfaces
- [ ] Omit / Pick
- [ ] Opcional (?)

---

## 🎉 ¡Enhorabuena!

Si has llegado hasta aquí, ya sabes:

✅ Cómo conectar una web con una base de datos  
✅ Qué es una API y cómo usarla  
✅ Programación asíncrona (async/await)  
✅ Gestión de estado en React  
✅ SQL básico  

**Esto es MUCHO más de lo que sabe el 90% de la gente.**

---

## 📝 Notas finales

- **Guarda este documento** para futuras referencias
- **Experimenta** cambiando el código
- **No tengas miedo de romper cosas** (usa Git para volver atrás)
- **Pregunta** cuando no entiendas algo

**Recuerda:** Todos los programadores profesionales usan Google, Stack Overflow y ChatGPT. No estás haciendo trampa, estás siendo eficiente.

---

**¿Preguntas?**  
Léeme de nuevo con calma. Si algo no se entiende, pruébalo en el código y verás cómo funciona.

🚀 **¡A por tu próximo proyecto!**
