/**
 * 🔧 CONFIGURACIÓN DEL NEGOCIO
 *
 * Cambia estos valores según el cliente final.
 * Mientras aprendes, usa TUS datos.
 */

export const BUSINESS_CONFIG = {
  // 📱 Datos de contacto (ACTUALMENTE: Datos de Juan Miguel para pruebas)
  contact: {
    phone: "637663153",           // Número de Juan Miguel (para pruebas)
    whatsapp: "34637663153",      // WhatsApp de Juan Miguel
    email: "spam.inservible@gmail.com", // Email de Juan Miguel (para pruebas)
  },

  // 🏢 Información del negocio
  business: {
    name: "Fran Fuentes Peluquero's",
    address: "Av. Música 12",
    city: "El Puerto de Santa María",
    postalCode: "11500",
  },

  // ⏰ Horarios
  hours: {
    weekday: {
      morning: { start: "10:00", end: "14:00" },
      afternoon: { start: "17:00", end: "21:00" },
    },
    saturday: {
      morning: { start: "10:00", end: "14:00" },
      afternoon: null, // Cerrado por la tarde
    },
    closedDays: [0], // 0 = Domingo, 6 = Sábado
  },

  // 💰 Servicios y precios
  services: [
    { name: "Caballeros", price: "10€", color: "hsl(45, 85%, 55%)" },
    { name: "Niños", price: "8€", color: "hsl(45, 75%, 60%)" },
    { name: "Estudiantes", price: "9€", color: "hsl(45, 80%, 52%)" },
    { name: "Mechas", price: "20€", color: "hsl(42, 78%, 48%)" },
    { name: "Color", price: "25€", color: "hsl(40, 82%, 50%)" },
    { name: "Moldeador", price: "30€", color: "hsl(38, 80%, 46%)" },
    { name: "Arreglo de Barba", price: "3€", color: "hsl(43, 88%, 58%)" },
    { name: "Color Barba", price: "15€", color: "hsl(41, 76%, 44%)" },
    { name: "Mechas Barba", price: "15€", color: "hsl(44, 84%, 54%)" },
    { name: "Desrizado", price: "15€", color: "hsl(39, 79%, 42%)" },
  ],

  // 🔗 Redes sociales (opcional)
  social: {
    instagram: null,
    facebook: null,
    google: "https://maps.google.com/?q=Fran+Fuentes+Peluquero",
  },
};

/**
 * 📞 NOTAS IMPORTANTES:
 *
 * 1. El teléfono debe estar sin espacios: "617087011" ✅ no "617 087 011" ❌
 * 2. WhatsApp necesita código de país: "34617087011" (34 = España)
 * 3. Mientras aprendes, pon TU número para probar
 * 4. Antes de venderlo, cambia a los datos REALES del cliente
 */
