import { Star } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const reviews = [
  { name: "Abel Lozano", tag: "Local Guide", text: "Excelente peluquero, muy simpático y corte de pelo con mucho estilo. Puntual, local agradable y buen precio. No se puede pedir más." },
  { name: "dbmonky", text: "Profesional, limpio, rápido y encima simpático. El mejor peluquero de todo el Puerto. Recomendado." },
  { name: "Aranzazu Gutierrez", text: "Fran es nuestro peluquero de confianza, muy buen profesional. Encantados con los resultados siempre." },
  { name: "Jose Manuel Peña", text: "Excelente peluquero, gran profesionalidad en su trabajo. Facilidad y rapidez en dar cita." },
  { name: "Esperanza", text: "Fran es buen profesional, todo de 10." },
];

function ReviewCard({ r, i }: { r: typeof reviews[number]; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="reveal-x snap-start shrink-0 w-[85vw] sm:w-[420px] bg-ink-card border border-border p-8 md:p-10 relative"
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <span className="absolute -top-6 left-6 font-display text-7xl text-gold leading-none select-none">❝</span>
      <div className="flex gap-0.5 mb-5 mt-2">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} size={14} className="fill-gold-light text-gold-light" />
        ))}
      </div>
      <p className="font-body italic text-foreground/85 leading-relaxed">{r.text}</p>
      <div className="mt-8 pt-5 border-t border-border flex items-baseline justify-between">
        <span className="font-accent text-gold-light tracking-[0.2em]">{r.name}</span>
        {r.tag && <span className="font-accent text-[10px] text-gold/60 tracking-[0.25em]">{r.tag}</span>}
      </div>
    </article>
  );
}

export default function Reviews() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-24 md:py-36 bg-ink-secondary/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={head} className="reveal max-w-3xl">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Lo que dicen nuestros clientes</p>
          <h2 className="font-display italic text-5xl md:text-7xl mt-3 text-foreground">
            Reseñas <span className="text-gold-light">reales</span>
          </h2>
        </div>
      </div>

      <div className="mt-14 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div className="flex gap-6 px-6 md:px-10 pb-6 max-w-[100vw]">
          {reviews.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
          <div className="shrink-0 w-2" />
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://maps.app.goo.gl/XLcAwitWkFQ3kqu1A"
          target="_blank"
          rel="noopener noreferrer"
          className="font-accent text-sm text-gold-light tracking-[0.25em] uppercase border-b border-gold/40 pb-1 hover:text-gold-light hover:border-gold transition-colors"
        >
          Ver todas las reseñas en Google →
        </a>
      </div>
    </section>
  );
}
