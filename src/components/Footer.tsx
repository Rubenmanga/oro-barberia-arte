import { MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESS_CONFIG } from "@/lib/config";

const { contact, business } = BUSINESS_CONFIG;

export default function Footer() {
  return (
    <footer className="relative">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-body text-xs text-foreground/60 text-center sm:text-left space-y-2">
          <p>
            © {new Date().getFullYear()} <span className="font-display italic text-gold-light">{business.name}</span> · Peluquería y barbería en {business.address}, {business.postalCode} {business.city} ({business.province}) · {contact.phoneDisplay}
          </p>
          <nav aria-label="Información legal" className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1">
            <Link to="/aviso-legal" className="hover:text-gold-light transition-colors">Aviso legal</Link>
            <Link to="/privacidad" className="hover:text-gold-light transition-colors">Política de privacidad</Link>
            <Link to="/cookies" className="hover:text-gold-light transition-colors">Política de cookies</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Pedir cita por WhatsApp"
             className="w-10 h-10 inline-flex items-center justify-center border border-gold/40 text-gold-light hover:bg-gold/10 transition-colors">
            <MessageCircle size={16} />
          </a>
          <a href={`tel:+34${contact.phone}`} aria-label={`Llamar al ${contact.phoneDisplay}`}
             className="w-10 h-10 inline-flex items-center justify-center border border-gold/40 text-gold-light hover:bg-gold/10 transition-colors">
            <Phone size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
