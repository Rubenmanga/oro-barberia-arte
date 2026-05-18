# ✂️ Fran Fuentes Peluquero's - Sistema de Reservas

<div align="center">

![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

**Web premium para peluquería con sistema de reservas en tiempo real**

[Demo](#) • [Documentación](#-documentación) • [Configuración](#-configuración-rápida)

</div>

---

## 📖 Descripción

Sistema de gestión de reservas para **Fran Fuentes Peluquero's** ubicado en El Puerto de Santa María. 

Incluye:
- ✨ Diseño premium con selector circular de servicios
- 📅 Wizard de reservas en 4 pasos
- ⚡ Sistema en tiempo real con Supabase
- 📱 Responsive (móvil y desktop)
- 🔒 Detección de horarios ocupados
- 🎨 Panel de administración completo

---

## 🚀 Características

### Para clientes:
- Selector visual de servicios (rueda circular)
- Calendario con domingos cerrados automáticamente
- Horarios ocupados bloqueados en tiempo real
- Confirmación por WhatsApp
- Interfaz elegante y fácil de usar

### Para el peluquero:
- Panel de administración (`/admin`)
- Ver todas las reservas
- Confirmar/cancelar citas
- Filtros por estado
- Estadísticas básicas

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **React 18** | Framework frontend |
| **TypeScript** | Tipado estático |
| **Vite** | Build tool rápido |
| **Tailwind CSS** | Estilos utility-first |
| **shadcn/ui** | Componentes UI |
| **Supabase** | Base de datos + Auth |
| **React Router** | Navegación SPA |
| **Sonner** | Notificaciones toast |

---

## ⚡ Configuración rápida

### Prerrequisitos

- Node.js 18+ 
- npm o bun
- Cuenta en Supabase (gratis)

### Instalación

```bash
# 1. Clonar el repositorio
git clone [tu-repo-url]
cd oro-barberia-arte

# 2. Instalar dependencias
npm install

# 3. Configurar Supabase (ver SETUP-RAPIDO.md)
# - Crear proyecto en Supabase
# - Ejecutar supabase-setup.sql
# - Copiar credenciales a .env.local

# 4. Arrancar en desarrollo
npm run dev
```

### Variables de entorno

Crear archivo `.env.local` en la raíz:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| **[SETUP-RAPIDO.md](./SETUP-RAPIDO.md)** | Guía de instalación paso a paso (15 min) |
| **[GUIA-SISTEMA-RESERVAS.md](./GUIA-SISTEMA-RESERVAS.md)** | Guía completa para aprender cómo funciona |
| **[supabase-setup.sql](./supabase-setup.sql)** | Script SQL para crear tabla en Supabase |

---

## 📁 Estructura del proyecto

```
oro-barberia-arte/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Booking.tsx     # Wizard de reservas
│   │   ├── Hero.tsx        # Sección hero
│   │   ├── Services.tsx    # Lista de servicios
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx       # Página principal
│   │   └── Admin.tsx       # Panel administración
│   ├── lib/
│   │   ├── supabase.ts     # Cliente Supabase
│   │   └── bookings.ts     # Funciones CRUD
│   └── ...
├── .env.local              # Variables de entorno (no subir a Git)
├── supabase-setup.sql      # Script BD
└── package.json
```

---

## 🎨 Capturas

### Selector circular de servicios
![Selector circular](docs/images/selector.png)

### Panel de administración
![Panel admin](docs/images/admin.png)

---

## 🚢 Despliegue

### Vercel (Recomendado)

```bash
# 1. Push a GitHub
git push origin main

# 2. Importar en Vercel
https://vercel.com/new

# 3. Añadir variables de entorno
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# 4. Deploy
```

### Netlify

```bash
# 1. Build
npm run build

# 2. Subir carpeta dist/
https://app.netlify.com/drop
```

---

## 🗺️ Roadmap

- [x] Sistema de reservas básico
- [x] Panel de administración
- [x] Detección de horarios ocupados
- [ ] Autenticación para admin
- [ ] Notificaciones por email
- [ ] Recordatorios automáticos
- [ ] Integración con Google Calendar
- [ ] Sistema de pagos (Stripe)
- [ ] App móvil (React Native)

---

## 🤝 Contribuir

Este es un proyecto de aprendizaje, pero las mejoras son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de uso personal para **Fran Fuentes Peluquero's**.

---

## 📞 Contacto

**Peluquería:**
- 📍 Dirección: Av. Música 12, El Puerto de Santa María
- 📱 WhatsApp: [617 087 011](https://wa.me/34617087011)
- ⏰ Horario: L-V 10:00-14:00 y 17:00-21:00 | Sábados 10:00-14:00

**Desarrollador:**
- GitHub: [@rubenmanga](https://github.com/rubenmanga)

---

## 🙏 Agradecimientos

- [Supabase](https://supabase.com) - Base de datos backend
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI
- [Lucide Icons](https://lucide.dev) - Iconos
- [Vercel](https://vercel.com) - Hosting

---

<div align="center">

**¡Hecho con ❤️ para aprender desarrollo web!**

[⬆ Volver arriba](#-fran-fuentes-peluqueros---sistema-de-reservas)

</div>
