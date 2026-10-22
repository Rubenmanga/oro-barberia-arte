import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink text-foreground px-6">
      <div className="text-center">
        <h1 className="mb-4 font-display italic text-6xl text-gold-light">404</h1>
        <p className="mb-6 font-body text-lg text-foreground/70">Esta página no existe.</p>
        <Link to="/" className="btn-gold">Volver a Peluquería Fran Fuentes</Link>
      </div>
    </main>
  );
};

export default NotFound;
