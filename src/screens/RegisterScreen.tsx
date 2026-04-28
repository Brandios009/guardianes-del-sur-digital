import { FormEvent, useState } from "react";
import { useGame } from "@/store/game";
import { Colibri } from "@/components/Colibri";
import { ChevronRight, Sparkles } from "lucide-react";

export const RegisterScreen = () => {
  const setPlayer = useGame((s) => s.setPlayer);
  const setScreen = useGame((s) => s.setScreen);
  const showNotif = useGame((s) => s.showNotif);

  const [form, setForm] = useState({
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
      showNotif("Debes jurar honrar los mitos del sur.");
      return;
    }
    setPlayer({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      age: form.age,
      city: form.city,
    });
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
          <p className="eyebrow mb-3 animate-title-rise">— Nariño profundo · 2026 —</p>
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
            Forja tu leyenda y despierta los destinos andinos. Cuatro santuarios
            sellados aguardan: Las Lajas, La Cocha, Galeras y Juanambú.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start animate-title-rise" style={{ animationDelay: "0.4s" }}>
            <Stat label="Destinos" value="4" />
            <Stat label="Mitos" value="∞" />
            <Stat label="Sur" value="Nariño" />
          </div>
        </div>

        {/* Right: form panel */}
        <form
          onSubmit={onSubmit}
          className="panel-pixel p-6 sm:p-8 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="font-pixel text-[10px] text-accent flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3" /> ▸ DATOS DEL GUARDIÁN
          </h2>
          <p className="font-pixel text-[8px] text-ink-mute mb-6 normal-case" style={{ lineHeight: 2 }}>
            Tu pacto será grabado en la piedra.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre">
              <input
                required
                className="input-pixel"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="Atahualpa"
              />
            </Field>
            <Field label="Apellido">
              <input
                required
                className="input-pixel"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Quillasinga"
              />
            </Field>
            <Field label="Correo ancestral" full>
              <input
                required
                type="email"
                className="input-pixel"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="@tribu.sur"
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
            <Field label="Ciudad / Comunidad">
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
            ▸ VÍNCULO CON NARIÑO
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
              Juro honrar los mitos, los ríos y la naturaleza del sur, y
              caminaré con los pies descalzos sobre la memoria de mis abuelos.
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={form.oath}
              onChange={(e) => set("oath", e.target.checked)}
            />
          </label>

          <button type="submit" className="btn-pixel mt-7 w-full">
            [ INICIAR PEREGRINAJE ]
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
    ✦ Guardianes del Sur · Tierra de leyenda ✦
  </div>
);
