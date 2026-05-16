import { useState, FormEvent } from "react";
import { Phone, MessageCircle, ArrowRight, Check } from "lucide-react";

const services = [
  "Corte Caballeros",
  "Corte Niños",
  "Corte Estudiantes",
  "Mechas (Cortes)",
  "Color (Cortes)",
  "Moldeador",
  "Arreglo de Barba",
  "Color de Barba",
  "Mechas Barba",
  "Desrizado",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};
    if (!String(f.get("name") || "").trim()) newErrors.name = "Indica tu nombre";
    if (!String(f.get("phone") || "").trim()) newErrors.phone = "Indica tu teléfono";
    if (!f.get("service")) newErrors.service = "Elige un servicio";
    if (!f.get("date")) newErrors.date = "Elige un día";
    if (!f.get("time")) newErrors.time = "Elige una hora";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    setName(String(f.get("name")));
    setSubmitted(true);
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
                Te confirmaremos la cita por WhatsApp o llamada en breve. Gracias, <span className="text-gold-light">{name}</span>.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost mt-8">Nueva solicitud</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
              <Field label="Nombre completo" error={errors.name}>
                <input name="name" placeholder="Tu nombre" className="input-dark" />
              </Field>
              <Field label="Teléfono o WhatsApp" error={errors.phone}>
                <input name="phone" type="tel" placeholder="6XX XXX XXX" className="input-dark" />
              </Field>
              <Field label="Servicio" error={errors.service}>
                <select name="service" defaultValue="" className="input-dark appearance-none cursor-pointer">
                  <option value="" disabled>Selecciona un servicio</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Día preferido" error={errors.date}>
                <input name="date" type="date" className="input-dark" />
              </Field>
              <Field label="Hora preferida" error={errors.time}>
                <input name="time" type="time" min="10:00" max="21:00" step={900} className="input-dark" />
              </Field>
              <Field label="Mensaje (opcional)">
                <input name="message" placeholder="Comentarios" className="input-dark" />
              </Field>

              <div className="md:col-span-2 mt-2">
                <button type="submit" className="btn-gold w-full">
                  Solicitar Cita <ArrowRight size={16} />
                </button>
              </div>
            </form>
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-accent text-[11px] text-gold tracking-[0.25em] uppercase block mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-red-400 font-body">{error}</span>}
    </label>
  );
}
