import { Star, MapPin, MessageSquare } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export default function About() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();

  return (
    <section
      id="sobre-fran"
      aria-labelledby="sobre-fran-titulo"
      className="relative py-28 md:py-40"
      style={{
        backgroundImage: 'url(/local-interior.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }}
    >
      <div className="absolute inset-0 bg-ink/75 pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[400px] h-[400px] gold-glow opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <div ref={r1} className="reveal md:col-span-6 relative">
          <span className="absolute -top-12 -left-2 font-display text-[10rem] leading-none text-gold/20 select-none">❝</span>
          <p className="font-display italic text-3xl md:text-5xl leading-tight text-gold-light">
            El mejor peluquero de todo El Puerto.
          </p>
          <p className="mt-6 font-accent text-xs text-gold/70 tracking-[0.3em]">— dbmonky, reseña en Google</p>
        </div>

        <div ref={r2} className="reveal md:col-span-6 space-y-5">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Sobre Fran</p>
          <h2 id="sobre-fran-titulo" className="font-display italic text-3xl md:text-4xl text-foreground">
            Tu peluquero de confianza en El Puerto de Santa María
          </h2>
          <p className="font-body text-foreground/80 leading-relaxed">
            En <span className="text-gold-light">Peluquería Fran Fuentes</span> el corte de pelo es un oficio: precisión, paciencia y atención al detalle. Fran escucha lo que quieres, te aconseja según tu tipo de pelo y te deja el corte como te gusta, sin prisas.
          </p>
          <p className="font-body text-foreground/80 leading-relaxed">
            Estamos en la Avenida de la Música, 12, en El Puerto de Santa María (Cádiz). Un local cuidado, un trato cercano y puntualidad con la cita: por eso muchos clientes vienen desde hace años y traen a sus hijos.
          </p>
          <p className="font-body text-foreground/80 leading-relaxed">
            Cortes clásicos y degradados actuales, arreglo de barba, color, mechas y moldeador. Precios claros desde 3 € y la opción de reservar tu cita online en un minuto.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <span className="pill"><Star size={14} className="fill-gold-light text-gold-light" /> 4,9 Google</span>
            <span className="pill"><MessageSquare size={14} /> 97 Reseñas</span>
            <span className="pill"><MapPin size={14} /> El Puerto de Santa María</span>
          </div>
        </div>
      </div>
      <hr className="hairline mt-28 max-w-5xl mx-auto" />
    </section>
  );
}