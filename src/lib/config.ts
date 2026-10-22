/**
 * 🔧 CONFIGURACIÓN DEL NEGOCIO
 *
 * Única fuente de verdad para nombre, dirección, teléfono y horarios.
 * Todos los componentes leen de aquí: si cambia un dato, cámbialo solo aquí
 * (y en el JSON-LD de index.html, que Google lee sin ejecutar JavaScript).
 */

export const BUSINESS_CONFIG = {
  // 📱 Datos de contacto (los mismos que en la ficha de Google)
  contact: {
    phone: "617087011",
    phoneDisplay: "617 087 011",
    whatsapp: "34617087011",
    email: "franfuentespeluqueros@hotmail.com",
  },

  // 🏢 Información del negocio (NAP idéntico a Google Business Profile)
  business: {
    name: "Peluquería Fran Fuentes",
    brand: "Fran Fuentes Peluquero's",
    address: "Av. de la Música, 12",
    city: "El Puerto de Santa María",
    province: "Cádiz",
    postalCode: "11500",
    mapsUrl: "https://maps.app.goo.gl/WJGmrFbPfvdZdBNj6",
    reviewsUrl: "https://maps.app.goo.gl/XLcAwitWkFQ3kqu1A",
    rating: "4,9",
    reviewCount: 97,
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
    // Días festivos o vacaciones en formato "AAAA-MM-DD": no se podrá reservar
    closedDates: [] as string[],
    // Hasta cuántos días vista se puede reservar
    maxDaysAhead: 60,
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
    google: "https://maps.app.goo.gl/WJGmrFbPfvdZdBNj6",
  },
};

/**
 * 📞 NOTAS IMPORTANTES:
 *
 * 1. El teléfono debe estar sin espacios: "617087011" ✅ no "617 087 011" ❌
 *    (para mostrarlo con espacios usa phoneDisplay)
 * 2. WhatsApp necesita código de país: "34617087011" (34 = España)
 */
