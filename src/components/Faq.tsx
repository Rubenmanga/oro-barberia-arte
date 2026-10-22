import { useReveal } from "@/hooks/use-reveal";

const faqs = [
  {
    q: "¿Dónde está la peluquería?",
    a: "Estamos en la Av. de la Música, 12, 11500 El Puerto de Santa María (Cádiz). Puedes abrir la ubicación en Google Maps desde la sección de horario.",
  },
  {
    q: "¿Cuánto cuesta un corte de pelo de caballero?",
    a: "El corte de caballero cuesta 10 €, el corte infantil (hasta 12 años) 8 € y el de estudiante (hasta 18 años) 9 €. El arreglo de barba son 3 €.",
  },
  {
    q: "¿Cómo puedo pedir cita?",
    a: "Reserva online en esta web eligiendo servicio, día y hora, o pide cita por WhatsApp o llamando al 617 087 011. Te confirmamos la cita lo antes posible.",
  },
  {
    q: "¿Qué horario tenéis?",
    a: "De lunes a viernes de 10:00 a 14:00 y de 17:00 a 21:00. Los sábados de 10:00 a 14:00. Los domingos cerramos.",
  },
  {
    q: "¿Cortáis el pelo a niños?",
    a: "Sí. El corte infantil para niños de hasta 12 años cuesta 8 €.",
  },
  {
    q: "¿Hacéis color y mechas para hombre?",
    a: "Sí. Hacemos color (25 €), mechas (20 €) y moldeador (30 €), además de color y mechas en barba (15 €).",
  },
];

export default function Faq() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="preguntas" className="relative py-24 md:py-32 bg-ink-secondary">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div ref={head} className="reveal">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Dudas frecuentes</p>
          <h2 className="font-display italic text-4xl md:text-6xl mt-3 text-foreground">
            Preguntas <span className="text-gold-light">frecuentes</span>
          </h2>
        </div>

        <div className="mt-12 divide-y divide-gold/15 border-y border-gold/15">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-body text-lg text-foreground/90 hover:text-gold-light transition-colors">
                <h3 className="font-body text-lg">{q}</h3>
                <span className="text-gold text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 font-body text-foreground/70 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
