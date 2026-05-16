import { Star, MapPin, MessageSquare } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export default function About() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-28 md:py-40">
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[400px] h-[400px] gold-glow opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <div ref={r1} className="reveal md:col-span-6 relative">
          <span className="absolute -top-12 -left-2 font-display text-[10rem] leading-none text-gold/20 select-none">❝</span>
          <p className="font-display italic text-3xl md:text-5xl leading-tight text-gold-light">
            El mejor peluquero de todo El Puerto.
          </p>
          <p className="mt-6 font-accent text-xs text-gold/70 tracking-[0.3em]">— Reseña verificada en Google</p>
        </div>

        <div ref={r2} className="reveal md:col-span-6 space-y-5">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Sobre nosotros</p>
          <p className="font-body text-foreground/80 leading-relaxed">
            En <span className="text-gold-light">Fran Fuentes Peluquero's</span> entendemos el corte como un oficio: precisión, paciencia y atención al detalle. Cada visita es un momento cuidado, sin prisa y con la técnica al servicio del estilo de cada cliente.
          </p>
          <p className="font-body text-foreground/80 leading-relaxed">
            Profesionalidad y puntualidad son la base. Local agradable, ambiente cercano y un trato sincero que convierte a quienes nos visitan en clientes de confianza.
          </p>
          <p className="font-body text-foreground/80 leading-relaxed">
            Cortes clásicos, tendencias actuales, barba, color y tratamientos — todo con un precio justo y resultados que se notan.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <span className="pill"><Star size={14} className="fill-gold-light text-gold-light" /> 4,9 Google</span>
            <span className="pill"><MessageSquare size={14} /> 97 Reseñas</span>
            <span className="pill"><MapPin size={14} /> El Puerto de Sta. María</span>
          </div>
        </div>
      </div>
      <hr className="hairline mt-28 max-w-5xl mx-auto" />
    </section>
  );
}
