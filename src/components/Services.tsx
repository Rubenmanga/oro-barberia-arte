import { Scissors } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const cortes = [
  ["Caballeros", "10,00€"],
  ["Niños (hasta 12 años)", "8,00€"],
  ["Estudiantes (hasta 18 años)", "9,00€"],
  ["Mechas", "20,00€"],
  ["Color", "25,00€"],
  ["Moldeador", "30,00€"],
];

const barba = [
  ["Arreglo de Barba", "3,00€"],
  ["Color", "15,00€"],
  ["Mechas", "15,00€"],
  ["Desrizado", "15,00€"],
];

function Card({ title, items, delay = 0 }: { title: string; items: string[][]; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal relative bg-ink-card border border-border p-8 md:p-10 group transition-transform duration-500 hover:scale-[1.015]"
      style={{ transitionDelay: `${delay}ms`, boxShadow: "0 30px 60px -30px rgba(0,0,0,0.7)" }}
    >
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />
      <div className="absolute -top-12 right-6 w-40 h-40 gold-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <p className="font-accent text-xs text-gold tracking-[0.35em]">⎯ Carta</p>
      <h3 className="font-display italic text-3xl md:text-4xl text-foreground mt-2">{title}</h3>
      <ul className="mt-8 space-y-4">
        {items.map(([name, price]) => (
          <li key={name} className="flex items-baseline">
            <span className="font-body text-foreground/85">{name}</span>
            <span className="dotted-leader" />
            <span className="font-accent text-xl text-gold-light tracking-wider">{price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="servicios" className="relative py-24 md:py-36 bg-ink-secondary/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={head} className="reveal max-w-3xl">
          <p className="font-accent text-xs text-gold tracking-[0.35em] uppercase">⎯⎯ Servicios</p>
          <h2 className="font-display italic text-5xl md:text-7xl mt-3 text-foreground">
            Carta y <span className="text-gold-light">precios</span>
          </h2>
          <p className="mt-5 font-body text-foreground/70 max-w-xl">
            Tarifas transparentes. Reserva el servicio que necesitas y te confirmamos disponibilidad.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-10">
          <Card title="Cortes" items={cortes} />
          <Card title="Barba & Tratamientos" items={barba} delay={120} />
        </div>

        <div className="mt-16 text-center">
          <a href="#reservar" className="btn-gold"><Scissors size={16} /> Reservar tu servicio</a>
        </div>
      </div>
    </section>
  );
}
