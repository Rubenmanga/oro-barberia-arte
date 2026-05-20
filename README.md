# ✂️ Oro Barbería Arte - Sistema de Reservas

<div align="center">

![Status](https://img.shields.io/badge/Status-Producción-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)
![Brevo](https://img.shields.io/badge/Brevo-5.0.4-purple)

**Web premium para barbería con sistema de reservas en tiempo real y emails automáticos**

[Demo en vivo](https://oro-barberia-arte.vercel.app) • [Documentación](#-documentación) • [Inicio rápido](#-inicio-rápido)

</div>

---

## 📖 Descripción

Sistema completo de gestión de reservas para **Oro Barbería Arte** ubicado en El Puerto de Santa María. 

Incluye:
- ✨ Diseño premium con selector circular de servicios
- 📅 Wizard de reservas en 4 pasos
- ⚡ Sistema en tiempo real con Supabase
- 📧 Emails automáticos con Brevo (cliente + peluquero)
- 📱 Responsive (móvil, tablet y desktop)
- 🔒 Detección de horarios ocupados en tiempo real
- 🎨 Panel de administración completo
- 🚀 Desplegado en Vercel con Serverless Functions

---

## 🚀 Características

### Para clientes:
- Selector visual de servicios (rueda circular premium)
- Calendario con domingos cerrados automáticamente
- Horarios ocupados bloqueados en tiempo real
- Email de confirmación automático con detalles de la cita
- Notificación por WhatsApp
- Interfaz elegante y fácil de usar

### Para el peluquero:
- Panel de administración (`/admin`)
- Ver todas las reservas en tiempo real
- Confirmar/cancelar citas
- Filtros por estado
- Estadísticas básicas
- Email automático con cada nueva reserva

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **React 18** | Framework frontend |
| **TypeScript 5.8** | Tipado estático |
| **Vite 5.4** | Build tool rápido |
| **Tailwind CSS** | Estilos utility-first |
| **shadcn/ui** | Componentes UI profesionales |
| **Supabase** | Base de datos PostgreSQL + Realtime |
| **React Router** | Navegación SPA |
| **Sonner** | Notificaciones toast |
| **Brevo SDK v5** | Emails transaccionales |
| **Vercel** | Hosting + Serverless Functions |

---

## ⚡ Inicio rápido

### Prerrequisitos

- Node.js 18+ 
- npm, pnpm o bun
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Brevo](https://www.brevo.com) (gratis - 300 emails/día)

### Instalación (15 minutos)

```bash
# 1. Clonar el repositorio
git clone https://github.com/rubenmanga/oro-barberia-arte.git
cd oro-barberia-arte

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales (ver abajo)

# 4. Crear tabla en Supabase
# - Ir a https://supabase.com/dashboard
# - Crear proyecto nuevo
# - SQL Editor → Ejecutar supabase-setup.sql

# 5. Arrancar en desarrollo
npm run dev
```

### Variables de entorno

Edita `.env.local`:

```env
# Supabase (obligatorio)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key

# Brevo (obligatorio para emails)
BREVO_API_KEY=tu-brevo-api-key
BREVO_FROM_EMAIL=tu-email-verificado@ejemplo.com
PELUQUERO_EMAIL=email-destino@ejemplo.com
```

**⚠️ IMPORTANTE:** Los emails solo funcionan en producción (Vercel) o con `vercel dev`. No funcionan con `npm run dev` local. Ver [DESARROLLO-LOCAL-EMAILS.md](./DESARROLLO-LOCAL-EMAILS.md) para más detalles.

**Configurar Brevo:**

1. Crea cuenta gratuita en [Brevo](https://app.brevo.com/account/register)
2. Ve a Settings → API Keys → Crea nueva API Key
3. Verifica tu email en Settings → Senders
4. Añade las 3 variables a `.env.local` (local) y a Vercel (producción)

---

## 📚 Documentación

### 🚨 Lee primero

| Documento | Descripción |
|-----------|-------------|
| **[EMPEZAR-AQUI.md](./EMPEZAR-AQUI.md)** | 👉 **Empieza aquí** - Guía paso a paso completa (20 min) |
| **[DOCUMENTACION-INDICE.md](./DOCUMENTACION-INDICE.md)** | 📇 Índice maestro de toda la documentación |
| **[DESARROLLO-LOCAL-EMAILS.md](./DESARROLLO-LOCAL-EMAILS.md)** | 🚨 **Importante** - Por qué emails no funcionan en local |

### Guías de configuración

| Documento | Descripción |
|-----------|-------------|
| **[CAMBIAR-DATOS-CONTACTO.md](./CAMBIAR-DATOS-CONTACTO.md)** | 📝 Personalizar teléfono, email, horarios y servicios |
| **[TESTING-EMAILS.md](./TESTING-EMAILS.md)** | 🧪 Guía completa para testing de emails |

### Deploy y producción

| Documento | Descripción |
|-----------|-------------|
| **[DESPLEGAR-A-PRODUCCION.md](./DESPLEGAR-A-PRODUCCION.md)** | 🚀 Guía completa de deploy en Vercel |
| **[DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md)** | ✅ Checklist exhaustivo pre/post-deploy |
| **[ANTES-DE-VENDER.md](./ANTES-DE-VENDER.md)** | 💼 Checklist completo antes de presentar al cliente |

### Aprendizaje y referencia

| Documento | Descripción |
|-----------|-------------|
| **[GUIA-SISTEMA-RESERVAS.md](./GUIA-SISTEMA-RESERVAS.md)** | 📖 Guía didáctica completa - aprende cómo funciona todo |
| **[RESUMEN-IMPLEMENTACION.md](./RESUMEN-IMPLEMENTACION.md)** | 📋 Resumen ejecutivo del proyecto |
| **[NEXT-STEPS.md](./NEXT-STEPS.md)** | 🎯 Próximos pasos después del setup |
| **[CHANGELOG.md](./CHANGELOG.md)** | 📝 Registro de cambios y versiones |

---

## 📁 Estructura del proyecto

```
oro-barberia-arte/
├── api/
│   └── send-confirmation.js    # ⚡ Serverless Function (Brevo emails)
├── src/
│   ├── components/              # Componentes React
│   │   ├── Booking.tsx         # Wizard de reservas (4 pasos)
│   │   ├── Hero.tsx            # Hero section con animaciones
│   │   ├── Services.tsx        # Selector circular de servicios
│   │   ├── ui/                 # Componentes shadcn/ui
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx           # Página principal
│   │   └── Admin.tsx           # Panel administración
│   ├── lib/
│   │   ├── supabase.ts         # Cliente Supabase
│   │   ├── bookings.ts         # Funciones CRUD
│   │   └── config.ts           # 🎯 Configuración centralizada
│   └── ...
├── .env.local                   # Variables de entorno (NO subir a Git)
├── .env.local.example           # Plantilla de variables
├── supabase-setup.sql           # Script SQL para crear tabla
├── vercel.json                  # Configuración Vercel
└── package.json
```

---

## 📧 Sistema de Emails (Brevo)

El sistema envía automáticamente 2 emails cuando se crea una reserva:

### 1. Email al cliente
- ✅ Confirmación inmediata de la reserva
- 📝 Detalles completos: servicio, fecha, hora, datos de contacto
- 🎨 Diseño profesional con colores dorado/negro del brand
- 📌 Nota recordando confirmación por WhatsApp

### 2. Email al peluquero
- 🔔 Notificación instantánea de nueva reserva
- 👤 Todos los datos del cliente (nombre, email, teléfono)
- 📅 Información completa de la cita
- 💡 Recordatorio para confirmar con el cliente

**Plan gratuito de Brevo:** 300 emails/día (9,000/mes) - más que suficiente para una barbería.

**Nota técnica:** Los emails usan Vercel Serverless Functions (`/api/send-confirmation.js`) que solo funcionan en producción o con `vercel dev`. Ver [DESARROLLO-LOCAL-EMAILS.md](./DESARROLLO-LOCAL-EMAILS.md) para detalles.

---

## 🚢 Despliegue en Vercel (Recomendado)

### Opción 1: CLI (rápido)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variables de entorno
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add BREVO_API_KEY production
vercel env add BREVO_FROM_EMAIL production
vercel env add PELUQUERO_EMAIL production

# 4. Redeploy con variables
vercel --prod
```

### Opción 2: Dashboard (recomendado para principiantes)

1. Push tu código a GitHub
2. Ir a [vercel.com/new](https://vercel.com/new)
3. Importar repositorio de GitHub
4. Añadir variables de entorno en Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `BREVO_API_KEY`
   - `BREVO_FROM_EMAIL`
   - `PELUQUERO_EMAIL`
5. Deploy

**✅ Checklist post-deploy:** Ver [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md)

---

## 🎯 Roadmap

### ✅ Implementado (v2.0.0)
- [x] Sistema de reservas con wizard 4 pasos
- [x] Panel de administración completo
- [x] Detección de horarios ocupados en tiempo real
- [x] Emails automáticos con Brevo
- [x] Selector circular de servicios premium
- [x] Responsive design (móvil, tablet, desktop)
- [x] Deploy en Vercel con Serverless Functions

### 🔜 Próximas mejoras
- [ ] Autenticación para panel admin (Supabase Auth)
- [ ] Recordatorios automáticos por email (1 día antes)
- [ ] Integración con Google Calendar
- [ ] Dashboard con estadísticas avanzadas
- [ ] Sistema de pagos anticipados (Stripe)
- [ ] Multi-idioma (ES/EN)

### 🚀 Futuro (v3.0)
- [ ] App móvil nativa (React Native)
- [ ] Sistema de fidelización de clientes
- [ ] Integración con Instagram/Facebook
- [ ] IA para recomendación de servicios

---

## 🤝 Contribuir

Este es un proyecto de código abierto. Las mejoras son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/MejoraMaestría`)
3. Commit cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push (`git push origin feature/MejoraMaestría`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de uso personal para **Oro Barbería Arte**. Siéntete libre de usarlo como base para tu propio proyecto.

---

## 📞 Contacto

**Oro Barbería Arte:**
- 📍 Dirección: Av. Música 12, El Puerto de Santa María, Cádiz
- 📱 WhatsApp: [617 087 011](https://wa.me/34617087011)
- ✉️ Email: ruben.rugbier99@gmail.com
- ⏰ Horario: L-V 10:00-14:00 y 17:00-21:00 | Sábados 10:00-14:00
- 🌐 Web: [oro-barberia-arte.vercel.app](https://oro-barberia-arte.vercel.app)

**Desarrollador:**
- GitHub: [@rubenmanga](https://github.com/rubenmanga)
- Proyecto: [oro-barberia-arte](https://github.com/rubenmanga/oro-barberia-arte)

---

## 🙏 Agradecimientos

- [Supabase](https://supabase.com) - Base de datos PostgreSQL con Realtime
- [Brevo](https://www.brevo.com) - Emails transaccionales profesionales
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI de calidad
- [Lucide Icons](https://lucide.dev) - Iconos modernos
- [Vercel](https://vercel.com) - Hosting y Serverless Functions
- [Vite](https://vitejs.dev) - Build tool ultra-rápido

---

<div align="center">

**¡Hecho con ❤️ para transformar negocios locales con tecnología moderna!**

[⬆ Volver arriba](#-oro-barbería-arte---sistema-de-reservas)

</div>
