import { MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-body text-xs text-foreground/60 text-center sm:text-left">
          © 2025 <span className="font-display italic text-gold-light">Fran Fuentes Peluquero's</span> · El Puerto de Santa María, Cádiz
        </p>
        <div className="flex items-center gap-3">
          <a href="https://wa.me/34617087011" target="_blank" rel="noopener" aria-label="WhatsApp"
             className="w-10 h-10 inline-flex items-center justify-center border border-gold/40 text-gold-light hover:bg-gold/10 transition-colors">
            <MessageCircle size={16} />
          </a>
          <a href="tel:617087011" aria-label="Llamar"
             className="w-10 h-10 inline-flex items-center justify-center border border-gold/40 text-gold-light hover:bg-gold/10 transition-colors">
            <Phone size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
