# 📝 Changelog

Registro de cambios importantes en el proyecto Oro Barbería Arte.

---

## [2.0.0] - 2024-XX-XX

### ✨ Añadido
- **Sistema de emails automáticos con Resend**
  - Email de confirmación para clientes con diseño profesional
  - Email de notificación para el peluquero con datos de la reserva
  - Templates HTML responsive con estilos inline
  - Manejo de errores sin interrumpir el flujo de reservas
  - API route en `/api/send-confirmation`

### 📚 Documentación
- Nuevo documento `RESEND-SETUP.md` con guía de configuración
- Archivo `.env.local.example` con variables requeridas
- README actualizado con información del sistema de emails
- Sección de Agradecimientos actualizada

### 🔧 Técnico
- Instalado paquete `resend` v6.12.3
- Creada API Route en Next.js para envío de emails
- Modificado componente `Booking.tsx` para integrar envío de emails
- Añadidas variables de entorno: `RESEND_API_KEY` y `PELUQUERO_EMAIL`

### 📊 Stack actualizado
- React 18.3
- TypeScript 5.8
- Next.js (App Router)
- Supabase (base de datos)
- Resend (emails transaccionales)
- Tailwind CSS + shadcn/ui

---

## [1.0.0] - 2024-XX-XX

### ✨ Release inicial
- Sistema de reservas con wizard de 4 pasos
- Selector circular de servicios
- Calendario interactivo con días cerrados
- Detección de horarios ocupados en tiempo real
- Panel de administración básico
- Integración con Supabase
- Notificación por WhatsApp
- Diseño responsive premium
- Deploy en Vercel

---

## 📋 Próximas versiones

### [2.1.0] - Planificado
- [ ] Autenticación para el panel admin
- [ ] Recordatorios automáticos por email (24h antes)
- [ ] Emails de seguimiento post-cita
- [ ] Personalización de templates de email desde admin

### [3.0.0] - Futuro
- [ ] Integración con Google Calendar
- [ ] Sistema de pagos online (Stripe)
- [ ] App móvil React Native
- [ ] Multi-idioma (ES/EN)
- [ ] Programa de fidelización

---

## 🐛 Bugs conocidos

Ninguno reportado actualmente.

---

## 🔐 Seguridad

- Todas las API keys están en variables de entorno
- Conexión segura con Supabase (RLS habilitada)
- Validación de datos en cliente y servidor
- Rate limiting en API routes (próximamente)

---

## 🚀 Performance

- Tiempo de carga: < 2s
- Lighthouse Score: 90+
- Optimización de imágenes con Next.js
- Lazy loading de componentes

---

**Notas:**
- Versiones siguen [Semantic Versioning](https://semver.org/)
- Formato basado en [Keep a Changelog](https://keepachangelog.com/)
