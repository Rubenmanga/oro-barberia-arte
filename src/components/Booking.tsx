import { useState, useEffect } from "react";
import { Phone, MessageCircle, Check, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
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
];

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

function submitBooking(data: BookingData) {
  console.log("📅 Nueva reserva:", data);
  // Aquí se conectará con API o base de datos en el futuro
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});

  const progress = (step / 4) * 100;

  function nextStep() {
    if (step < 4) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit() {
    if (bookingData.service && bookingData.date && bookingData.time && bookingData.name && bookingData.email && bookingData.phone) {
      submitBooking(bookingData as BookingData);
      setSubmitted(true);
    }
  }

  function reset() {
    setStep(1);
    setBookingData({});
    setSubmitted(false);
  }

  return (
    <section id="reservar" className="relative py-24 md:py-36">
      <div className="absolute top-20 right-10 w-[400px] h-[400px] gold-glow opacity-50 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Agenda</p>
          <h2 className="font-display italic text-5xl md:text-7xl mt-3 text-foreground">
            Reserva tu <span className="text-gold-light">cita</span>
          </h2>
          <p className="mt-5 font-body text-foreground/70 max-w-xl">
            Gestión rápida por WhatsApp o llamada. Te confirmamos en minutos.
          </p>
        </div>

        <div className="mt-14 bg-ink-card border border-border p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold-light via-gold to-transparent" />

          {submitted ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold mb-6">
                <Check className="text-gold-light" size={28} />
              </div>
              <h3 className="font-display italic text-3xl md:text-4xl text-gold-light">¡Solicitud recibida!</h3>
              <p className="mt-4 font-body text-foreground/80 max-w-lg mx-auto">
                Te confirmaremos la cita por WhatsApp o llamada en breve. Gracias, <span className="text-gold-light">{bookingData.name}</span>.
              </p>
              <button onClick={reset} className="btn-ghost mt-8">Nueva solicitud</button>
            </div>
          ) : (
            <>
              {/* Barra de progreso */}
              <div className="mb-10">
                <div className="flex justify-between mb-3">
                  {["Servicio", "Día", "Hora", "Datos"].map((label, i) => (
                    <div key={label} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-accent text-sm transition-all ${
                          step > i + 1
                            ? "bg-gold text-ink border-2 border-gold"
                            : step === i + 1
                            ? "bg-gold-light text-ink border-2 border-gold-light scale-110"
                            : "bg-transparent border-2 border-gold/30 text-gold/50"
                        }`}
                      >
                        {step > i + 1 ? <Check size={16} /> : i + 1}
                      </div>
                      <span className={`mt-2 font-accent text-[10px] tracking-[0.2em] uppercase ${step === i + 1 ? "text-gold-light" : "text-gold/50"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-gold/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-light to-gold transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Paso 1: Servicio */}
              {step === 1 && <Step1 selected={bookingData.service} onSelect={(s) => { setBookingData({ ...bookingData, service: s }); nextStep(); }} />}

              {/* Paso 2: Día */}
              {step === 2 && <Step2 selected={bookingData.date} onSelect={(d) => { setBookingData({ ...bookingData, date: d }); nextStep(); }} />}

              {/* Paso 3: Hora */}
              {step === 3 && <Step3 date={bookingData.date || ""} selected={bookingData.time} onSelect={(t) => { setBookingData({ ...bookingData, time: t }); nextStep(); }} />}

              {/* Paso 4: Datos personales */}
              {step === 4 && <Step4 data={bookingData} onChange={(d) => setBookingData({ ...bookingData, ...d })} onSubmit={handleSubmit} />}

              {/* Navegación */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button onClick={prevStep} className="btn-ghost flex-1">
                    <ChevronLeft size={16} /> Anterior
                  </button>
                )}
                {step < 4 && step > 1 && (
                  <button onClick={nextStep} className="btn-gold flex-1" disabled={!bookingData[["service", "date", "time"][step - 1] as keyof BookingData]}>
                    Siguiente <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <a
            href="https://wa.me/34617087011"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-3 py-4 border border-emerald-500/40 bg-emerald-500/5 text-emerald-300 font-accent tracking-[0.2em] text-sm uppercase hover:bg-emerald-500/10 transition-colors"
          >
            <MessageCircle size={18} /> WhatsApp · 617 087 011
          </a>
          <a
            href="tel:617087011"
            className="flex items-center justify-center gap-3 py-4 border border-gold/40 bg-gold/5 text-gold-light font-accent tracking-[0.2em] text-sm uppercase hover:bg-gold/10 transition-colors"
          >
            <Phone size={18} /> Llamar · 617 087 011
          </a>
        </div>
      </div>
    </section>
  );
}

// Paso 1: Selector de servicio circular con sectores e imagen de fondo
function Step1({ selected, onSelect }: { selected?: string; onSelect: (s: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [autoHighlightIndex, setAutoHighlightIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const total = services.length;
  const angleStep = 360 / total;
  const rotationOffset = angleStep; // Rotar un sector en sentido horario

  // Detectar si es dispositivo táctil
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  // Animación automática rotativa (solo en dispositivos táctiles)
  useEffect(() => {
    if (!isTouchDevice || isAutoPaused || selected) return;

    const interval = setInterval(() => {
      setAutoHighlightIndex((prev) => (prev + 1) % total);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, [isTouchDevice, isAutoPaused, selected, total]);

  // Pausar animación en hover o touch
  function handleInteractionStart(serviceName: string) {
    setIsAutoPaused(true);
    setHovered(serviceName);
  }

  function handleInteractionEnd() {
    setHovered(null);
    // Reanudar después de 3 segundos de inactividad
    setTimeout(() => {
      setIsAutoPaused(false);
    }, 3000);
  }

  return (
    <div className="py-8">
      <h3 className="font-display italic text-2xl md:text-3xl text-gold-light text-center mb-2">Elige tu servicio</h3>
      <p className="font-body text-foreground/60 text-center text-sm mb-10">Selecciona el servicio que necesitas</p>

      <div className="relative w-full max-w-[600px] mx-auto aspect-square">
        {/* Imagen de fondo circular */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gold shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <img
            src="/service-wheel.png"
            alt="Servicios"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sectores interactivos con overlay */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            {/* Filtro de brillo para hover */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {services.map((service, i) => {
            const startAngle = i * angleStep + rotationOffset;
            const endAngle = (i + 1) * angleStep + rotationOffset;
            const isHovered = hovered === service.name;
            const isSelected = selected === service.name;
            const isAutoHighlighted = isTouchDevice && !isAutoPaused && !selected && autoHighlightIndex === i;
            const isHighlighted = isHovered || isAutoHighlighted;
            const path = describeArc(100, 100, 85, startAngle, endAngle);

            // Calcular posición del texto en el sector
            const midAngle = (startAngle + endAngle) / 2;
            const textRadius = 65;
            const textPos = polarToCartesian(100, 100, textRadius, midAngle);

            return (
              <g key={service.name}>
                {/* Overlay oscuro semitransparente */}
                <path
                  d={path}
                  fill="rgba(0, 0, 0, 0.7)"
                  opacity={isHighlighted ? 0 : isSelected ? 0.3 : 1}
                  className="cursor-pointer transition-opacity duration-500 pointer-events-none"
                />

                {/* Área clickeable invisible */}
                <path
                  d={path}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => handleInteractionStart(service.name)}
                  onMouseLeave={handleInteractionEnd}
                  onTouchStart={() => handleInteractionStart(service.name)}
                  onTouchEnd={handleInteractionEnd}
                  onClick={() => onSelect(service.name)}
                />

                {/* Borde del sector seleccionado */}
                {isSelected && (
                  <path
                    d={path}
                    fill="none"
                    stroke="hsl(45, 85%, 55%)"
                    strokeWidth="3"
                    className="pointer-events-none"
                    style={{ filter: 'drop-shadow(0 0 8px hsl(45, 85%, 55%))' }}
                  />
                )}

                {/* Texto del servicio */}
                <text
                  x={textPos.x}
                  y={textPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-accent text-[7px] tracking-wider uppercase pointer-events-none rotate-90 transition-all duration-500"
                  fill={isHighlighted || isSelected ? "hsl(45, 85%, 65%)" : "hsl(45, 85%, 55%)"}
                  style={{
                    transformOrigin: `${textPos.x}px ${textPos.y}px`,
                    filter: isHighlighted || isSelected ? 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.8))' : 'none'
                  }}
                >
                  {service.name}
                </text>
              </g>
            );
          })}

          {/* Círculo central dorado */}
          <circle
            cx="100"
            cy="100"
            r="25"
            fill="hsl(45, 85%, 55%)"
            className="pointer-events-none"
            style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))' }}
          />
        </svg>

        {/* Texto central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center px-4">
            <p className="font-accent text-[10px] text-ink tracking-[0.3em] uppercase font-bold leading-tight">
              Elige tu<br/>servicio
            </p>
          </div>
        </div>

        {/* Información del servicio hover/seleccionado/auto-destacado */}
        {(hovered || selected || (isTouchDevice && !isAutoPaused && !selected)) && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-opacity duration-500">
            <p className="font-display italic text-xl md:text-2xl text-gold-light">
              {hovered || selected || (isTouchDevice ? services[autoHighlightIndex].name : '')}
            </p>
            <p className="font-accent text-gold text-sm mt-1">
              {services.find((s) => s.name === (hovered || selected || (isTouchDevice ? services[autoHighlightIndex].name : '')))?.price}
            </p>
          </div>
        )}
      </div>

      {/* Botones de acceso rápido */}
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-2xl mx-auto">
        {services.map((s) => (
          <button
            key={s.name}
            onClick={() => onSelect(s.name)}
            onMouseEnter={() => handleInteractionStart(s.name)}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={() => handleInteractionStart(s.name)}
            onTouchEnd={handleInteractionEnd}
            className={`px-3 py-2 text-xs font-accent tracking-wider border transition-all ${
              selected === s.name
                ? "border-gold bg-gold/10 text-gold-light"
                : "border-gold/20 bg-transparent text-foreground/70 hover:border-gold/40 hover:text-gold"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Paso 2: Calendario mensual
function Step2({ selected, onSelect }: { selected?: string; onSelect: (d: string) => void }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  function isDayClosed(day: number) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0; // Domingo cerrado
  }

  function isPastDay(day: number) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return date < todayDate;
  }

  function handleDayClick(day: number) {
    if (isDayClosed(day) || isPastDay(day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onSelect(dateStr);
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div className="py-8">
      <h3 className="font-display italic text-2xl md:text-3xl text-gold-light text-center mb-2">Elige el día</h3>
      <p className="font-body text-foreground/60 text-center text-sm mb-8">Selecciona una fecha disponible</p>

      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 text-gold hover:text-gold-light transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h4 className="font-accent text-gold tracking-[0.2em] uppercase text-sm">{monthName}</h4>
          <button onClick={nextMonth} className="p-2 text-gold hover:text-gold-light transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
            <div key={d} className="text-center font-accent text-xs text-gold/50 py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isSelected = selected === dateStr;
            const isClosed = isDayClosed(day);
            const isPast = isPastDay(day);
            const isDisabled = isClosed || isPast;

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={isDisabled}
                className={`aspect-square flex items-center justify-center font-body text-sm transition-all ${
                  isSelected
                    ? "bg-gold text-ink font-bold scale-110"
                    : isDisabled
                    ? "text-foreground/20 cursor-not-allowed line-through"
                    : "text-foreground/80 hover:bg-gold/20 hover:text-gold-light hover:scale-105"
                } border ${isSelected ? "border-gold" : isDisabled ? "border-border/30" : "border-border hover:border-gold/40"}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs font-body text-foreground/50 text-center">Los domingos permanecemos cerrados</p>
      </div>
    </div>
  );
}

// Paso 3: Selector de hora
function Step3({ date, selected, onSelect }: { date: string; selected?: string; onSelect: (t: string) => void }) {
  const selectedDate = new Date(date + "T00:00:00");
  const dayOfWeek = selectedDate.getDay();
  const isSaturday = dayOfWeek === 6;
  const isToday = date === new Date().toISOString().split("T")[0];

  // Horario: L-V 10:00-14:00 y 17:00-21:00, Sábados 10:00-14:00
  const morningSlots = generateTimeSlots("10:00", "14:00");
  const afternoonSlots = isSaturday ? [] : generateTimeSlots("17:00", "21:00");
  const allSlots = [...morningSlots, ...afternoonSlots];

  function isTimePast(time: string) {
    if (!isToday) return false;
    const now = new Date();
    const [h, m] = time.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(h, m, 0, 0);
    return slotTime <= now;
  }

  return (
    <div className="py-8">
      <h3 className="font-display italic text-2xl md:text-3xl text-gold-light text-center mb-2">Elige la hora</h3>
      <p className="font-body text-foreground/60 text-center text-sm mb-8">
        {new Date(date + "T00:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
      </p>

      <div className="max-w-2xl mx-auto space-y-6">
        {morningSlots.length > 0 && (
          <div>
            <p className="font-accent text-xs text-gold tracking-[0.2em] uppercase mb-3">Mañana (10:00 - 14:00)</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {morningSlots.map((time) => {
                const isPast = isTimePast(time);
                const isSelected = selected === time;
                return (
                  <button
                    key={time}
                    onClick={() => onSelect(time)}
                    disabled={isPast}
                    className={`py-3 font-body text-sm transition-all ${
                      isSelected
                        ? "bg-gold text-ink border-2 border-gold font-bold"
                        : isPast
                        ? "text-foreground/20 cursor-not-allowed bg-transparent border border-border/30"
                        : "text-foreground/80 border border-border hover:border-gold/60 hover:bg-gold/10 hover:text-gold-light"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {afternoonSlots.length > 0 && (
          <div>
            <p className="font-accent text-xs text-gold tracking-[0.2em] uppercase mb-3">Tarde (17:00 - 21:00)</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {afternoonSlots.map((time) => {
                const isPast = isTimePast(time);
                const isSelected = selected === time;
                return (
                  <button
                    key={time}
                    onClick={() => onSelect(time)}
                    disabled={isPast}
                    className={`py-3 font-body text-sm transition-all ${
                      isSelected
                        ? "bg-gold text-ink border-2 border-gold font-bold"
                        : isPast
                        ? "text-foreground/20 cursor-not-allowed bg-transparent border border-border/30"
                        : "text-foreground/80 border border-border hover:border-gold/60 hover:bg-gold/10 hover:text-gold-light"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Paso 4: Datos personales
function Step4({ data, onChange, onSubmit }: { data: Partial<BookingData>; onChange: (d: Partial<BookingData>) => void; onSubmit: () => void }) {
  const canSubmit = data.name && data.email && data.phone;

  return (
    <div className="py-8">
      <h3 className="font-display italic text-2xl md:text-3xl text-gold-light text-center mb-2">Tus datos</h3>
      <p className="font-body text-foreground/60 text-center text-sm mb-8">Completa tu información para confirmar</p>

      <div className="max-w-lg mx-auto space-y-5">
        <Field label="Nombre completo">
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Tu nombre"
            className="input-dark"
          />
        </Field>

        <Field label="Correo electrónico">
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="tu@email.com"
            className="input-dark"
          />
        </Field>

        <Field label="Teléfono o WhatsApp">
          <input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="6XX XXX XXX"
            className="input-dark"
          />
        </Field>

        <div className="pt-4 border-t border-gold/20">
          <p className="font-accent text-[10px] text-gold/70 tracking-[0.2em] uppercase mb-3">Resumen de tu cita</p>
          <div className="space-y-2 font-body text-sm text-foreground/70">
            <p><span className="text-gold-light">Servicio:</span> {data.service}</p>
            <p><span className="text-gold-light">Día:</span> {data.date && new Date(data.date + "T00:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
            <p><span className="text-gold-light">Hora:</span> {data.time}</p>
          </div>
        </div>

        <button onClick={onSubmit} disabled={!canSubmit} className="btn-gold w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed">
          <Check size={16} /> Confirmar reserva
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-accent text-[11px] text-gold tracking-[0.25em] uppercase block mb-2">{label}</span>
      {children}
    </label>
  );
}

// Utilidades
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function generateTimeSlots(start: string, end: string) {
  const slots = [];
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  let h = startH;
  let m = startM;

  while (h < endH || (h === endH && m < endM)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }

  return slots;
}
