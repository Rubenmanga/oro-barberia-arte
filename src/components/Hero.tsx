import { Star, Scissors, ChevronDown } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

const tickerItems = ["Corte", "Barba", "Color", "Mechas", "Moldeador", "Desrizado"];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden"
  style={{
    backgroundImage: 'url(/local-hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 65%',
  }}
>
      {/* Overlay oscuro para legibilidad */}
<div className="absolute inset-0 bg-ink/80 pointer-events-none" />
      {/* Gold glow */}
      <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] gold-glow pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] gold-glow pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">

        <div className="flex items-start justify-between gap-4 md:grid md:grid-cols-12 md:gap-10 md:items-center">
          <div className="flex-1 md:col-span-7">
            <p className="anim-up font-accent text-xs md:text-sm text-gold tracking-[0.35em] uppercase mb-6 md:mb-8" style={{ animationDelay: "0ms" }}>
              Estilismo · El Puerto de Santa María
            </p>
            <h1
              className="anim-up font-display italic font-semibold leading-[0.95] text-foreground"
              style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", animationDelay: "300ms" }}
            >
              Fran Fuentes
              <span className="block text-gold-light">Peluquero<span className="text-gold">'s</span></span>
              <span className="sr-only"> · Peluquería de caballeros en El Puerto de Santa María</span>
            </h1>
            <p className="anim-up mt-5 md:mt-8 font-body font-light text-base md:text-xl text-foreground/75 max-w-xl" style={{ animationDelay: "450ms" }}>
              Estilismo y tendencia para caballeros. Cortes, barba y color con la precisión de un oficio cuidado.
            </p>
            <a
              href={BUSINESS_CONFIG.business.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="anim-up mt-5 md:mt-7 inline-flex items-center gap-3 px-4 py-2.5 border border-gold/30 bg-gold/5 hover:border-gold/60 transition-colors"
              style={{ animationDelay: "600ms" }}
            >
              <Star size={14} className="fill-gold-light text-gold-light" />
              <span className="font-accent text-sm text-gold-light tracking-wider">{BUSINESS_CONFIG.business.rating}</span>
              <span className="w-px h-4 bg-gold/30" />
              <span className="font-body text-sm text-foreground/70">{BUSINESS_CONFIG.business.reviewCount} reseñas en Google</span>
            </a>
            <div className="anim-up mt-7 md:mt-10 flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4" style={{ animationDelay: "750ms" }}>
              <a href="#reservar" className="btn-gold text-center"><Scissors size={16} /> Reservar Cita</a>
              <a href="#servicios" className="btn-ghost text-center">Ver Servicios</a>
            </div>
          </div>

          {/* Poste de barbero decorativo: pequeño en móvil, grande en escritorio */}
          <div className="anim-up flex-shrink-0 mt-2 md:mt-0 md:col-span-5 md:flex md:justify-end" style={{ animationDelay: "900ms" }} aria-hidden="true">
            <div className="relative">
              <div className="hidden md:block absolute inset-0 -m-8 gold-glow" />
              <div className="relative w-10 h-48 md:w-24 md:h-[520px] rounded-full overflow-hidden border md:border-2 border-gold-dark shadow-[0_10px_40px_-10px_hsl(var(--gold)/0.4)] md:shadow-[0_30px_80px_-20px_hsl(var(--gold)/0.4)]">
                <div className="absolute -top-1 md:-top-2 inset-x-[-3px] md:inset-x-[-6px] h-5 md:h-8 rounded-full bg-gradient-to-b from-gold-light to-gold-dark border border-gold-dark z-10" />
                <div className="absolute -bottom-1 md:-bottom-2 inset-x-[-3px] md:inset-x-[-6px] h-5 md:h-8 rounded-full bg-gradient-to-b from-gold to-gold-dark border border-gold-dark z-10" />
                <div className="absolute inset-0 barber-pole-stripes" style={{ backgroundSize: "100% 80px" }} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/50 to-transparent" />
              </div>
              <p className="mt-3 md:mt-6 text-center font-accent text-[9px] md:text-xs text-gold/70 tracking-[0.2em] md:tracking-[0.35em]">Av. Música 12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-foreground/40">
        <span className="font-accent text-[10px] tracking-[0.3em]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 inset-x-0 border-y border-gold/15 bg-ink-secondary/40 backdrop-blur-sm">
        <div className="marquee py-4">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 pr-12 font-accent text-base md:text-lg text-gold tracking-[0.3em] uppercase">
                {tickerItems.map((t, j) => (
                  <span key={`${i}-${j}`} className="flex items-center gap-12">
                    {t}
                    <span className="text-gold/40">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
