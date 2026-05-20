import { useEffect, useState } from "react";
import { Menu, X, Scissors } from "lucide-react";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
  { href: "#resenas", label: "Reseñas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-ink/70 border-b border-gold/15"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center group">
  <div
    style={{
      width: "120px",
      height: "120.px",
      background: "transparent",
    }}
  >
    <img
      src="/logo_2.png"
      alt="Fran Fuentes Peluquero's"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))",
        backgroundColor: "transparent",
      }}
    />
  </div>
</a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-accent text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-gold-light transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="#reservar" className="btn-gold !py-2.5 !px-5 !text-xs">
              <Scissors size={14} /> Reservar Cita
            </a>
          </div>

          <button
            className="md:hidden text-gold-light p-2"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-ink/97 backdrop-blur-xl flex flex-col">
          <div className="h-20 px-6 flex items-center justify-between">
            <span className="font-display italic text-2xl text-gold-light">FF</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="text-gold-light p-2">
              <X size={28} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display italic text-4xl text-foreground hover:text-gold-light transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reservar"
              onClick={() => setOpen(false)}
              className="btn-gold mt-4"
            >
              <Scissors size={16} /> Reservar Cita
            </a>
          </div>
        </div>
      )}
    </>
  );
}
