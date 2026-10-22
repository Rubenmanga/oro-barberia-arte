import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

/**
 * ⚠️ Textos legales base. Antes de publicar, rellenar los datos entre [corchetes]
 * con los del titular real (nombre o razón social y NIF) y revisarlos.
 */
const TITULAR = "[Nombre y apellidos o razón social del titular]";
const NIF = "[NIF]";

const { contact, business } = BUSINESS_CONFIG;
const domicilio = `${business.address}, ${business.postalCode} ${business.city} (${business.province})`;

type Kind = "aviso-legal" | "privacidad" | "cookies";

const pages: Record<Kind, { title: string; body: JSX.Element }> = {
  "aviso-legal": {
    title: "Aviso legal",
    body: (
      <>
        <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
        <ul>
          <li>Titular: {TITULAR}</li>
          <li>NIF: {NIF}</li>
          <li>Nombre comercial: {business.name}</li>
          <li>Domicilio: {domicilio}</li>
          <li>Teléfono: {contact.phoneDisplay}</li>
          <li>Email: {contact.email}</li>
        </ul>
        <h2>Uso del sitio web</h2>
        <p>El acceso a esta web es libre y gratuito. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.</p>
        <h2>Propiedad intelectual</h2>
        <p>Los textos, imágenes, logotipos y diseño de esta web pertenecen a su titular o se usan con autorización. No se permite su reproducción sin consentimiento.</p>
        <h2>Responsabilidad</h2>
        <p>El titular no se hace responsable de los daños derivados de interrupciones del servicio ni del contenido de webs de terceros enlazadas (por ejemplo, Google Maps o WhatsApp).</p>
      </>
    ),
  },
  privacidad: {
    title: "Política de privacidad",
    body: (
      <>
        <h2>Responsable del tratamiento</h2>
        <p>{TITULAR} ({NIF}), {domicilio}. Email: {contact.email}.</p>
        <h2>Qué datos tratamos y para qué</h2>
        <p>Cuando reservas una cita online nos facilitas tu nombre, email y teléfono. Los usamos solo para gestionar tu cita: confirmarla, avisarte de cambios y enviarte el email de confirmación.</p>
        <h2>Base legal</h2>
        <p>Tu consentimiento al enviar el formulario y la gestión de la cita que solicitas.</p>
        <h2>Cuánto tiempo los guardamos</h2>
        <p>Mientras sea necesario para gestionar la cita y, después, durante un máximo de 12 meses, salvo obligación legal de conservarlos más tiempo.</p>
        <h2>Con quién se comparten</h2>
        <p>No cedemos tus datos a terceros. Para prestar el servicio usamos proveedores que actúan como encargados del tratamiento: Supabase (base de datos de reservas), Brevo (envío de emails) y Vercel (alojamiento web).</p>
        <h2>Tus derechos</h2>
        <p>Puedes pedir el acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo a {contact.email}. Si crees que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
      </>
    ),
  },
  cookies: {
    title: "Política de cookies",
    body: (
      <>
        <p>Esta web no usa cookies propias de análisis ni de publicidad.</p>
        <h2>Cookies de terceros</h2>
        <p>El mapa de la sección de contacto es un servicio de Google Maps. Al cargarlo, Google puede instalar sus propias cookies. Puedes consultar cómo las usa en la política de privacidad de Google.</p>
        <h2>Almacenamiento técnico</h2>
        <p>El panel de administración guarda una sesión en el navegador para que el titular pueda gestionar las reservas. Es necesario para ese servicio y no se usa con otros fines.</p>
        <h2>Cómo desactivarlas</h2>
        <p>Puedes bloquear o borrar las cookies desde la configuración de tu navegador.</p>
      </>
    ),
  },
};

export default function Legal({ kind }: { kind: Kind }) {
  const page = pages[kind];

  useEffect(() => {
    document.title = `${page.title} · ${business.name}`;
    window.scrollTo(0, 0);
  }, [page.title]);

  return (
    <main className="bg-ink text-foreground min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-accent text-xs tracking-[0.25em] uppercase text-gold hover:text-gold-light transition-colors">
          <ArrowLeft size={14} /> Volver a la web
        </Link>
        <h1 className="mt-8 font-display italic text-4xl md:text-6xl text-gold-light">{page.title}</h1>
        <div className="mt-10 font-body text-foreground/80 leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:italic [&_h2]:text-2xl [&_h2]:text-gold-light [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          {page.body}
        </div>
      </div>
    </main>
  );
}
