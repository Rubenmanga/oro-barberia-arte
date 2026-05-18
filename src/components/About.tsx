import { Star, MapPin, MessageSquare } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export default function About() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-0 md:py-0 overflow-hidden">

      {/* SPLIT SCREEN */}
      <div className="grid md:grid-cols-2 min-h-[600px]">

        {/* Foto izquierda */}
        <div className="relative h-72 md:h-auto overflow-hidden">
          <img
            src="/local-interior.jpg"
            alt="Interior de Fran Fuentes Peluquero's"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Overlay sutil dorado */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent" />
        </div>

        {/* Contenido derecha */}
        <div className="bg-ink-card px-8 md:px-14 py-16 md:py-24 flex flex-col justify-center relative">
          <div className="absolute top-8 right-8 font-display text-[8rem] leading-none text-gold/10 select-none">❝</div>

          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase mb-6">⎯⎯ Sobre nosotros</p>

          <p className="font-display italic text-2xl md:text-4xl leading-tight text-gold-light mb-6">
            El mejor peluquero de todo El Puerto.
          </p>
          <p className="font-accent text-xs text-gold/70 tracking-[0.3em] mb-8">— Reseña verificada en Google</p>

          <div ref={r1} className="reveal space-y-4">
            <p className="font-body text-foreground/80 leading-relaxed">
              En <span className="text-gold-light">Fran Fuentes Peluquero's</span> entendemos el corte como un oficio: precisión, paciencia y atención al detalle. Cada visita es un momento cuidado, sin prisa y con la técnica al servicio del estilo de cada cliente.
            </p>
            <p className="font-body text-foreground/80 leading-relaxed">
              Profesionalidad y puntualidad son la base. Local agradable, ambiente cercano y un trato sincero que convierte a quienes nos visitan en clientes de confianza.
            </p>
          </div>

          <div ref={r2} className="reveal pt-8 flex flex-wrap gap-3">
            <span className="pill"><Star size={14} className="fill-gold-light text-gold-light" /> 4,9 Google</span>
            <span className="pill"><MessageSquare size={14} /> 97 Reseñas</span>
            <span className="pill"><MapPin size={14} /> El Puerto de Sta. María</span>
          </div>
        </div>
      </div>

      <hr className="hairline max-w-5xl mx-auto mt-0" />
    </section>
  );
}