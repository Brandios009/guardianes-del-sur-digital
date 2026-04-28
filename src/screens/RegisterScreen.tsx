import { FormEvent, useState } from "react";
import { useGame } from "@/store/game";
import { Colibri } from "@/components/Colibri";
import { ChevronRight, Sparkles, LogIn, UserPlus } from "lucide-react";

type StoredPlayer = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  city: string;
};

const STORAGE_KEY = "guardianes_players";

const loadPlayers = (): Record<string, StoredPlayer> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const savePlayers = (data: Record<string, StoredPlayer>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const RegisterScreen = () => {
  const setPlayer = useGame((s) => s.setPlayer);
  const setScreen = useGame((s) => s.setScreen);
  const showNotif = useGame((s) => s.showNotif);

  const [mode, setMode] = useState<"register" | "login">("register");
  const [loginName, setLoginName] = useState("");

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    city: "",
    oath: false,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.oath) {
      showNotif("Acepta términos y condiciones para continuar el tour");
      return;
    }
    const uname = form.username.trim().toLowerCase();
    if (!uname) {
      showNotif("Ingresa un nombre de registro válido");
      return;
    }
    const players = loadPlayers();
    if (players[uname]) {
      showNotif("Ese nombre ya existe. Inicia sesión.");
      setMode("login");
      setLoginName(form.username);
      return;
    }
    const newPlayer: StoredPlayer = {
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      age: form.age,
      city: form.city,
    };
    players[uname] = newPlayer;
    savePlayers(players);
    setPlayer(newPlayer);
    setScreen("map");
  };

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    const uname = loginName.trim().toLowerCase();
    if (!uname) {
      showNotif("Ingresa tu nombre de registro");
      return;
    }
    const players = loadPlayers();
    const found = players[uname];
    if (!found) {
      showNotif("No existe un Guardián con ese nombre");
      return;
    }
    setPlayer(found);
    setScreen("map");
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Decorative hero band */}
      <div className="absolute inset-x-0 top-0 h-[55vh] bg-hero-gradient pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--accent)) 0, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--hb-purple)) 0, transparent 45%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center animate-fade-in">
        {/* Left: hero / mascot */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-6">
            <Colibri size={260} />
          </div>
          <p className="eyebrow mb-3 animate-title-rise">— UCC Pasto —</p>
          <h1
            className="font-pixel leading-[1.15] mb-5 animate-title-rise text-pixel-shadow"
            style={{ animationDelay: "0.1s", fontSize: "clamp(22px, 4.2vw, 40px)" }}
          >
            <span className="block text-ink">GUARDIANES</span>
            <span className="block text-accent text-glow">DEL SUR</span>
          </h1>
          <p
            className="font-pixel text-[9px] text-ink-soft max-w-md mx-auto lg:mx-0 animate-title-rise normal-case"
            style={{ animationDelay: "0.25s", lineHeight: 2 }}
          >
            Descubre Nariño.
            Recorre, juega y deja que cada sitio te cuente su historia
                  
            
          </p>

          <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start animate-title-rise" style={{ animationDelay: "0.4s" }}>
            <Stat label="Destinos" value="4" />
            <Stat label="Guardianes" value="4" />
           
          </div>
        </div>

        {/* Right: form panel */}
        <form
          onSubmit={onSubmit}
          className="panel-pixel p-6 sm:p-8 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="font-pixel text-[10px] text-accent flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3" /> ▸ Registro 
          </h2>
          <p className="font-pixel text-[8px] text-ink-mute mb-6 normal-case" style={{ lineHeight: 2 }}>
            Guarda tu progreso en el turismo Nariñense
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre de registro" full>
              <input
                required
                className="input-pixel"
                value={form.username}
                onChange={(e) => set("username", e.target.value)}
                placeholder="usuario123"
              />
            </Field>
            <Field label="Nombre">
              <input
                required
                className="input-pixel"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="nombre"
              />
            </Field>
            <Field label="Apellido">
              <input
                required
                className="input-pixel"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="apellido"
              />
            </Field>
            <Field label="Correo Electrónico" full>
              <input
                required
                type="email"
                className="input-pixel"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="@uccpasto"
              />
            </Field>
            <Field label="Edad">
              <input
                required
                type="number"
                min={1}
                className="input-pixel"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                placeholder="21"
              />
            </Field>
            <Field label="Ciudad">
              <input
                required
                className="input-pixel"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Pasto"
              />
            </Field>
          </div>

          <h3 className="font-pixel text-[10px] text-accent mt-7 mb-3">
            ▸ Acepta los términos
          </h3>

          <label className="flex items-start gap-3 cursor-pointer group">
            <span
              className={`shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                form.oath
                  ? "bg-accent border-accent"
                  : "bg-background border-border-strong group-hover:border-accent"
              }`}
            >
              {form.oath && (
                <span className="font-pixel text-[10px] text-accent-foreground">
                  ✓
                </span>
              )}
            </span>
            <span className="font-pixel text-[8px] text-ink-soft leading-[2] normal-case">
              La información dada será utilizada para bases de datos para mejora del turismo en Nariño.
              Y se guardará para futuras encuestas de satisfacción.
              
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={form.oath}
              onChange={(e) => set("oath", e.target.checked)}
            />
          </label>

          <button type="submit" className="btn-pixel mt-7 w-full">
            [ Registrarse ]
            <ChevronRight className="w-3 h-3" />
          </button>
        </form>
      </div>

      <Footer />
    </section>
  );
};

const Field = ({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) => (
  <label className={`block ${full ? "sm:col-span-2" : ""}`}>
    <span className="font-pixel text-[8px] text-ink-mute uppercase block mb-2">
      {label}
    </span>
    {children}
  </label>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="panel-deep px-4 py-2">
    <div className="font-pixel text-[14px] text-accent leading-none">
      {value}
    </div>
    <div className="font-pixel text-[7px] text-ink-mute mt-1">{label}</div>
  </div>
);

const Footer = () => (
  <div className="absolute bottom-3 left-0 right-0 text-center font-pixel text-[7px] text-ink-mute uppercase pointer-events-none">
    ✦Versión Beta✦
  </div>
);
