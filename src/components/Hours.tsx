import { MapPin, Phone, Mail } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const schedule = [
  ["Lunes – Viernes", "10:00–14:00 · 17:00–21:00"],
  ["Sábados", "10:00–14:00"],
  ["Domingos", "Cerrado"],
];

export default function Hours() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  return (
    <section id="contacto" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20">
        <div ref={r1} className="reveal">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Visítanos</p>
          <h2 className="font-display italic text-5xl md:text-7xl mt-3 text-foreground">Horario</h2>

          <ul className="mt-10 space-y-1">
            {schedule.map(([d, h]) => (
              <li key={d} className="flex items-baseline py-4 border-b border-gold/15">
                <span className="font-accent text-base text-foreground/90 tracking-[0.18em] uppercase">{d}</span>
                <span className="dotted-leader" />
                <span className="font-body text-foreground/80">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 space-y-4">
            <ContactRow icon={<MapPin size={18} />} text="Av. de la Música, 12 · El Puerto de Santa María · Cádiz" href="https://maps.app.goo.gl/WJGmrFbPfvdZdBNj6" />
            <ContactRow icon={<Phone size={18} />} text="617 087 011" href="tel:617087011" />
            <ContactRow icon={<Mail size={18} />} text="franfuentespeluqueros@hotmail.com" href="mailto:franfuentespeluqueros@hotmail.com" />
          </div>
        </div>

        <div ref={r2} className="reveal">
          <div className="relative border border-gold/40 overflow-hidden rounded-sm shadow-[0_30px_80px_-30px_hsl(var(--gold)/0.4)]">
            <iframe
              title="Ubicación Fran Fuentes Peluquero's"
              src="https://www.google.com/maps?q=Peluqueria+Fran+Fuentes,+Av.+de+la+Musica+12,+El+Puerto+de+Santa+Maria&output=embed"
              width="100%"
              height="520"
              style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) brightness(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const Inner = (
    <div className="flex items-center gap-4 group">
      <span className="w-10 h-10 inline-flex items-center justify-center border border-gold/30 text-gold-light group-hover:border-gold transition-colors">{icon}</span>
      <span className="font-body text-foreground/85 group-hover:text-gold-light transition-colors">{text}</span>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : Inner;
}
