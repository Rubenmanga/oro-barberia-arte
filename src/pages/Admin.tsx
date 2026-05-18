import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, Check, X, Trash2, ArrowLeft, LogOut } from "lucide-react";
import { getAllBookings, updateBookingStatus, deleteBooking } from "@/lib/bookings";
import { signIn, signOut, getSession } from "@/lib/auth";
import { type Booking } from "@/lib/supabase";
import { toast } from "sonner";

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  // Comprobar sesión al cargar
  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setCheckingAuth(false);
      if (s) loadBookings();
    });
  }, []);

  async function handleLogin() {
    setLoginLoading(true);
    try {
      const data = await signIn(email, password);
      setSession(data.session);
      loadBookings();
    } catch (error) {
      toast.error("Email o contraseña incorrectos");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    setSession(null);
    setBookings([]);
  }

  async function loadBookings() {
    setLoading(true);
    try {
      const data = await getAllBookings();
      setBookings(data || []);
    } catch (error) {
      toast.error("Error al cargar las reservas");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: "pending" | "confirmed" | "cancelled") {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Reserva ${status === "confirmed" ? "confirmada" : "cancelada"}`);
      loadBookings();
    } catch (error) {
      toast.error("Error al actualizar la reserva");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar esta reserva?")) return;
    try {
      await deleteBooking(id);
      toast.success("Reserva eliminada");
      loadBookings();
    } catch (error) {
      toast.error("Error al eliminar la reserva");
    }
  }

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  // Cargando sesión
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  // Login
  if (!session) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-ink-card border border-border p-8">
          <h1 className="font-display italic text-3xl text-gold-light mb-2">Acceso Admin</h1>
          <p className="font-body text-sm text-foreground/50 mb-8">Oro Barbería</p>

          <div className="space-y-4">
            <div>
              <label className="font-accent text-xs tracking-wider uppercase text-gold/70 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-ink border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold/60"
                placeholder="admin@email.com"
              />
            </div>
            <div>
              <label className="font-accent text-xs tracking-wider uppercase text-gold/70 block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-ink border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold/60"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full bg-gold text-ink py-3 font-accent text-xs tracking-wider uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loginLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Panel admin
  return (
    <div className="min-h-screen bg-ink text-foreground">
      <header className="border-b border-border bg-ink-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-3">
                <ArrowLeft size={16} />
                <span className="font-accent text-xs tracking-wider uppercase">Volver a la web</span>
              </a>
              <h1 className="font-display italic text-4xl md:text-5xl text-foreground">
                Panel de <span className="text-gold-light">Administración</span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-border text-foreground/50 hover:border-red-500/40 hover:text-red-400 transition-colors font-accent text-xs tracking-wider uppercase"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} color="text-foreground" />
          <StatCard label="Pendientes" value={stats.pending} color="text-yellow-400" />
          <StatCard label="Confirmadas" value={stats.confirmed} color="text-green-400" />
          <StatCard label="Canceladas" value={stats.cancelled} color="text-red-400" />
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>Todas ({stats.total})</FilterButton>
          <FilterButton active={filter === "pending"} onClick={() => setFilter("pending")}>Pendientes ({stats.pending})</FilterButton>
          <FilterButton active={filter === "confirmed"} onClick={() => setFilter("confirmed")}>Confirmadas ({stats.confirmed})</FilterButton>
          <FilterButton active={filter === "cancelled"} onClick={() => setFilter("cancelled")}>Canceladas ({stats.cancelled})</FilterButton>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-foreground/50">No hay reservas para mostrar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-ink-card border border-border p-5">
      <p className="font-accent text-xs text-gold/70 tracking-wider uppercase mb-2">{label}</p>
      <p className={`font-display italic text-3xl ${color}`}>{value}</p>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-accent text-xs tracking-wider uppercase transition-all ${
        active
          ? "bg-gold text-ink border-2 border-gold"
          : "bg-transparent text-foreground/70 border border-border hover:border-gold/40 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

function BookingCard({ booking, onStatusChange, onDelete }: { booking: Booking; onStatusChange: (id: string, status: "pending" | "confirmed" | "cancelled") => void; onDelete: (id: string) => void }) {
  const statusColors = {
    pending: "border-yellow-500/40 bg-yellow-500/5",
    confirmed: "border-green-500/40 bg-green-500/5",
    cancelled: "border-red-500/40 bg-red-500/5",
  };

  const statusLabels = { pending: "Pendiente", confirmed: "Confirmada", cancelled: "Cancelada" };

  const formattedDate = new Date(booking.date + "T00:00:00").toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className={`border ${statusColors[booking.status]} p-6 transition-all`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-display italic text-2xl text-gold-light">{booking.name}</h3>
            <span className={`inline-block mt-2 px-3 py-1 font-accent text-[10px] tracking-wider uppercase ${
              booking.status === "pending" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
              : booking.status === "confirmed" ? "bg-green-500/20 text-green-400 border border-green-500/40"
              : "bg-red-500/20 text-red-400 border border-red-500/40"
            }`}>
              {statusLabels[booking.status]}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 font-body text-sm text-foreground/70">
            <div className="flex items-center gap-2"><Calendar size={16} className="text-gold" /><span>{formattedDate}</span></div>
            <div className="flex items-center gap-2"><Clock size={16} className="text-gold" /><span>{booking.time}</span></div>
            <div className="flex items-center gap-2"><User size={16} className="text-gold" /><span>{booking.service}</span></div>
            <div className="flex items-center gap-2"><Phone size={16} className="text-gold" /><a href={`tel:${booking.phone}`} className="hover:text-gold-light transition-colors">{booking.phone}</a></div>
            <div className="flex items-center gap-2 sm:col-span-2"><Mail size={16} className="text-gold" /><a href={`mailto:${booking.email}`} className="hover:text-gold-light transition-colors">{booking.email}</a></div>
          </div>
        </div>
        <div className="flex md:flex-col gap-2">
          {booking.status === "pending" && (
            <>
              <button onClick={() => onStatusChange(booking.id!, "confirmed")} className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/40 text-green-400 hover:bg-green-500/20 transition-colors font-accent text-xs tracking-wider uppercase">
                <Check size={14} /> Confirmar
              </button>
              <button onClick={() => onStatusChange(booking.id!, "cancelled")} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 transition-colors font-accent text-xs tracking-wider uppercase">
                <X size={14} /> Cancelar
              </button>
            </>
          )}
          <button onClick={() => onDelete(booking.id!)} className="flex items-center gap-2 px-4 py-2 bg-transparent border border-border text-foreground/50 hover:border-red-500/40 hover:text-red-400 transition-colors font-accent text-xs tracking-wider uppercase">
            <Trash2 size={14} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}