# 📝 Changelog

Registro de cambios importantes en el proyecto Oro Barbería Arte.

---

## [2.0.1] - 2026-05-20

### 🐛 Correcciones
- **Migración completa a Brevo SDK v5**
  - Corregido error 500 en envío de emails
  - Actualizado de `TransactionalEmailsApi` (v3) a `BrevoClient` (v5)
  - Eliminado archivo obsoleto `src/app/api/send-confirmation/route.ts`
  - El único archivo funcional es `/api/send-confirmation.js` (Vercel Serverless Function)

### 📚 Documentación
- README actualizado con información correcta:
  - Stack: Vite + React (no Next.js)
  - Emails: Brevo SDK v5 (no Resend)
  - Badges actualizados
  - Instrucciones de configuración claras
- Eliminados archivos obsoletos:
  - `SETUP-RAPIDO.md` (consolidado en README)
  - `RESEND-SETUP.md` (ya no se usa Resend)
  - `GUIA_PRODUCTO_VENDIBLE.md` (duplicado con otros docs)

### 🔧 Técnico
- Vercel Serverless Functions (`/api/send-confirmation.js`)
- Brevo SDK v5.0.4 con API correcta
- Variables de entorno actualizadas: `BREVO_API_KEY`, `BREVO_FROM_EMAIL`, `PELUQUERO_EMAIL`

---

## [2.0.0] - 2024-05-18

### ✨ Añadido
- **Sistema de emails automáticos**
  - Email de confirmación para clientes con diseño profesional
  - Email de notificación para el peluquero con datos de la reserva
  - Templates HTML responsive con estilos inline
  - Manejo de errores sin interrumpir el flujo de reservas
  - API route en `/api/send-confirmation`

### 📚 Documentación
- Documentación completa del sistema
- Archivo `.env.local.example` con variables requeridas
- Guías de setup, deploy y testing
- Sección de Agradecimientos actualizada

### 🔧 Técnico
- Vercel Serverless Functions para emails
- Integración con Brevo para emails transaccionales
- Modificado componente `Booking.tsx` para integrar envío de emails
- Añadidas variables de entorno para configuración

### 📊 Stack
- React 18.3
- TypeScript 5.8
- Vite 5.4 (Build tool)
- Supabase (base de datos)
- Brevo SDK v5 (emails transaccionales)
- Tailwind CSS + shadcn/ui
- Vercel (hosting + Serverless Functions)

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
