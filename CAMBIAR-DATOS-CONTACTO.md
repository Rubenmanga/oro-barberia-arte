# 📞 Cómo cambiar los datos de contacto

## 🎯 Objetivo

Durante el aprendizaje usarás **TUS datos** (tu teléfono, tu email).  
Cuando vayas a venderlo, cambiarás a los **datos REALES del peluquero**.

---

## ⚡ Forma rápida (recomendada)

**Solo tienes que editar 1 archivo:**

### `src/lib/config.ts`

```typescript
export const BUSINESS_CONFIG = {
  contact: {
    phone: "TU_NUMERO_AQUI",      // ⚠️ Sin espacios: 612345678
    whatsapp: "34TU_NUMERO_AQUI",  // ⚠️ Con código país: 34612345678
    email: "TU_EMAIL@gmail.com",   // ⚠️ Tu email real
  },
  // ... resto de la configuración
};
```

**Ejemplo con tus datos:**

```typescript
export const BUSINESS_CONFIG = {
  contact: {
    phone: "612345678",
    whatsapp: "34612345678",
    email: "rubenmanga@gmail.com",
  },
  // ...
};
```

**Cuando lo vendas, cambias a:**

```typescript
export const BUSINESS_CONFIG = {
  contact: {
    phone: "617087011",
    whatsapp: "34617087011",
    email: "franfuentes@peluquero.com",
  },
  // ...
};
```

---

## 🔧 Otros datos que puedes personalizar en el mismo archivo

### Horarios

```typescript
hours: {
  weekday: {
    morning: { start: "10:00", end: "14:00" },
    afternoon: { start: "17:00", end: "21:00" },
  },
  saturday: {
    morning: { start: "10:00", end: "14:00" },
    afternoon: null, // null = cerrado
  },
  closedDays: [0], // 0=Domingo, 6=Sábado, etc.
}
```

### Servicios y precios

```typescript
services: [
  { name: "Corte Caballeros", price: "10€", color: "hsl(45, 85%, 55%)" },
  // Añadir/quitar/modificar servicios aquí
]
```

### Dirección

```typescript
business: {
  name: "Fran Fuentes Peluquero's",
  address: "Av. Música 12",
  city: "El Puerto de Santa María",
}
```

---

## ✅ Ventajas de este sistema

1. **Todo centralizado** - Solo 1 archivo para editar
2. **Fácil de cambiar** - No tienes que buscar en todo el código
3. **Sin errores** - Si cambias aquí, se actualiza en toda la web
4. **Reutilizable** - Puedes venderlo a otros peluqueros cambiando solo este archivo

---

## 🧪 Probar los cambios

Después de editar `config.ts`:

```bash
1. Guarda el archivo
2. El servidor se recarga automáticamente
3. Recarga la página en el navegador (F5)
4. Comprueba que los datos han cambiado
```

---

## 📋 Checklist antes de vender

- [ ] Cambié el teléfono a los datos reales
- [ ] Cambié el email
- [ ] Verifiqué los horarios
- [ ] Revisé los servicios y precios
- [ ] Comprobé la dirección
- [ ] Probé el botón de WhatsApp → Va al número correcto
- [ ] Probé el botón de llamar → Marca el número correcto

---

## ⚠️ IMPORTANTE

### Formato del teléfono

```
✅ CORRECTO:
phone: "617087011"
whatsapp: "34617087011"

❌ INCORRECTO:
phone: "617 087 011"      // Con espacios
phone: "617-087-011"      // Con guiones
whatsapp: "617087011"     // Sin código de país
```

### Formato del email

```
✅ CORRECTO:
email: "contacto@peluquero.com"

❌ INCORRECTO:
email: "Contacto@Peluquero.com"  // Con mayúsculas
email: "contacto @ peluquero.com" // Con espacios
```

---

## 🎓 ¿Por qué es mejor así?

### Antes (forma antigua):

```tsx
// Tenías que buscar y cambiar en 10 sitios diferentes:
<a href="https://wa.me/34617087011">WhatsApp</a>
<a href="tel:617087011">Llamar</a>
const phone = "617087011";
// ... etc
```

**Problemas:**
- Tedioso buscar en todos los archivos
- Fácil olvidarse de cambiar alguno
- Propenso a errores

### Ahora (forma moderna):

```tsx
// Solo cambias 1 vez en config.ts
// El resto del código lo usa automáticamente:
<a href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsapp}`}>
```

**Ventajas:**
- ✅ Un solo lugar para editar
- ✅ Cambio instantáneo en toda la web
- ✅ Sin errores
- ✅ Más profesional

---

## 🚀 Ejemplo real de uso

Imagina que vendes esto a 3 peluquerías diferentes:

**Peluquería 1:** Fran Fuentes
**Peluquería 2:** Barbería El Puerto
**Peluquería 3:** Salón María

Solo necesitas:

1. Clonar el proyecto 3 veces
2. Cambiar `config.ts` en cada uno
3. Desplegar

**5 minutos por cliente** en vez de 2 horas buscando código. 💰

---

## 📝 Resumen

**Para aprender (AHORA):**
```typescript
phone: "TU_TELEFONO"
whatsapp: "34TU_TELEFONO"
email: "TU_EMAIL@gmail.com"
```

**Para vender (DESPUÉS):**
```typescript
phone: "TELEFONO_DEL_CLIENTE"
whatsapp: "34TELEFONO_DEL_CLIENTE"
email: "EMAIL_DEL_CLIENTE"
```

**Archivo a editar:**
```
src/lib/config.ts
```

---

## 🎉 ¡Listo!

Con este sistema puedes:
- ✅ Aprender tranquilamente con tus datos
- ✅ Cambiar a datos reales en 2 minutos
- ✅ Reutilizar el código para otros clientes
- ✅ Parecer un profesional

**¡Ahora sí, a aprender! 🚀**
