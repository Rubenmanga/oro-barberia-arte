import { Star, Scissors, ChevronDown } from "lucide-react";

const tickerItems = ["Corte", "Barba", "Color", "Mechas", "Moldeador", "Desrizado"];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Gold glow */}
      <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] gold-glow pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] gold-glow pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-12 gap-10 items-center">
        {/* Text */}
        <div className="md:col-span-7">
          <p className="anim-up font-accent text-xs md:text-sm text-gold tracking-[0.35em] uppercase mb-8" style={{ animationDelay: "0ms" }}>
            ⎯⎯ Estilismo · El Puerto de Santa María
          </p>

          <h1
            className="anim-up font-display italic font-semibold leading-[0.95] text-foreground"
            style={{ fontSize: "clamp(3.25rem, 9vw, 8rem)", animationDelay: "150ms" }}
          >
            Fran Fuentes
            <span className="block text-gold-light">Peluquero<span className="text-gold">'s</span></span>
          </h1>

          <p
            className="anim-up mt-8 font-body font-light text-lg md:text-xl text-foreground/75 max-w-xl"
            style={{ animationDelay: "300ms" }}
          >
            Estilismo y tendencia para caballeros. Cortes, barba y color con la precisión de un oficio cuidado.
          </p>

          <div
            className="anim-up mt-7 inline-flex items-center gap-3 px-4 py-2.5 border border-gold/30 bg-gold/5"
            style={{ animationDelay: "450ms" }}
          >
            <Star size={16} className="fill-gold-light text-gold-light" />
            <span className="font-accent text-sm text-gold-light tracking-wider">4,9</span>
            <span className="w-px h-4 bg-gold/30" />
            <span className="font-body text-sm text-foreground/70">97 reseñas en Google</span>
          </div>

          <div className="anim-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "600ms" }}>
            <a href="#reservar" className="btn-gold"><Scissors size={16} /> Reservar Cita</a>
            <a href="#servicios" className="btn-ghost">Ver Servicios</a>
          </div>
        </div>

        {/* Decorative barber pole */}
        <div className="md:col-span-5 flex justify-center md:justify-end anim-up" style={{ animationDelay: "750ms" }}>
          <div className="relative">
            <div className="absolute inset-0 -m-8 gold-glow" />
            <div className="relative w-28 md:w-36 h-[420px] md:h-[520px] rounded-full overflow-hidden border-2 border-gold-dark shadow-[0_30px_80px_-20px_hsl(var(--gold)/0.4)]">
              {/* Caps */}
              <div className="absolute -top-2 inset-x-[-10px] h-8 rounded-full bg-gradient-to-b from-gold-light to-gold-dark border border-gold-dark z-10" />
              <div className="absolute -bottom-2 inset-x-[-10px] h-8 rounded-full bg-gradient-to-b from-gold to-gold-dark border border-gold-dark z-10" />
              {/* Stripes */}
              <div className="absolute inset-0 barber-pole-stripes" style={{ backgroundSize: "100% 80px" }} />
              {/* Glass shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/50 to-transparent" />
            </div>
            <p className="mt-6 text-center font-accent text-xs text-gold/70 tracking-[0.35em]">— Av. Música 12 —</p>
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
