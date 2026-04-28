import { useState } from "react";
import { useGame } from "@/store/game";
import { HowToPlayModal } from "@/components/HowToPlayModal";
import { Sword, HelpCircle, ArrowLeft, Skull, Heart, Flame } from "lucide-react";

export const BossScreen = () => {
  const setScreen = useGame((s) => s.setScreen);
  const activeKey = useGame((s) => s.activeLocation);
  const locations = useGame((s) => s.locations);
  const completeLocation = useGame((s) => s.completeLocation);
  const showNotif = useGame((s) => s.showNotif);

  const loc = locations.find((l) => l.key === activeKey);
  const [howOpen, setHowOpen] = useState(false);

  if (!loc) return null;
  const { boss } = loc;

  const onStart = () => {
    completeLocation(loc.key);
    const doneNow = locations.filter((l) => l.status === "done").length + 1;
    if (doneNow === 4) {
      showNotif("¡El sur ha despertado! Eres Guardián Eterno.");
    } else {
      showNotif(`Has vencido a ${boss.name}. El sur agradece.`);
    }
    setScreen("map");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 30%, hsl(var(--accent) / 0.5), transparent 55%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl animate-fade-in">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => setScreen("map")} className="btn-ghost-pixel">
            <ArrowLeft className="w-3 h-3" /> Mapa
          </button>
          <p className="eyebrow hidden sm:block">— Ficha del guardián —</p>
          <span className="font-pixel text-[8px] text-accent uppercase">
            {loc.name}
          </span>
        </div>

        {/* Card */}
        <div className="panel-glow p-5 sm:p-8 grid md:grid-cols-[300px_1fr] gap-6 sm:gap-8 relative overflow-hidden">
          {/* Scan line accent */}
          <div
            aria-hidden
            className="absolute left-0 right-0 h-[2px] bg-accent/30 pointer-events-none animate-scan-line"
          />

          {/* Portrait */}
          <div className="relative">
            <div className="panel-deep p-3 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.5), transparent 70%)",
                }}
              />
              <img
                src={boss.image}
                alt={boss.name}
                width={512}
                height={512}
                className="relative w-full h-auto animate-boss-breathe"
                style={{ imageRendering: "pixelated" }}
              />
              {/* Pixel corners */}
              <span className="absolute top-1 left-1 w-2 h-2 bg-accent" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent" />
              <span className="absolute bottom-1 left-1 w-2 h-2 bg-accent" />
              <span className="absolute bottom-1 right-1 w-2 h-2 bg-accent" />
            </div>

            {/* HP bar */}
            <div className="mt-3 panel-deep p-1">
              <div className="relative h-5 bg-surface overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-destructive"
                  style={{ width: `100%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-pixel text-[8px] text-ink mix-blend-difference">
                  HP {boss.hp}
                </div>
              </div>
            </div>

            {/* Threat */}
            <div className="mt-2 flex items-center justify-between font-pixel text-[7px] text-ink-mute uppercase">
              <span className="flex items-center gap-1">
                <Skull className="w-3 h-3 text-destructive" /> Amenaza
              </span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 border ${
                      i < boss.threat
                        ? "bg-destructive border-destructive"
                        : "bg-transparent border-border-strong"
                    }`}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="eyebrow mb-2">▸ {boss.title}</p>
            <h2 className="font-pixel text-[16px] sm:text-[22px] text-ink leading-[1.3] text-pixel-shadow mb-4">
              {boss.name}
            </h2>

            <div className="flex gap-2 mb-5 flex-wrap">
              <Tag icon={<Flame className="w-3 h-3" />} label={boss.element} />
              <Tag icon={<Heart className="w-3 h-3" />} label={`HP ${boss.hp}`} />
            </div>

            <div className="panel-deep p-4 mb-6">
              <p className="font-pixel text-[8px] text-accent uppercase mb-3">
                — Crónica del guardián —
              </p>
              <p
                className="font-pixel text-[9px] text-ink-soft normal-case"
                style={{ lineHeight: 2 }}
              >
                {boss.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button onClick={onStart} className="btn-gold-pixel flex-1">
                <Sword className="w-3 h-3" /> [ COMENZAR ]
              </button>
              <button onClick={() => setHowOpen(true)} className="btn-ghost-pixel">
                <HelpCircle className="w-3 h-3" /> Cómo jugar
              </button>
            </div>
          </div>
        </div>

        <p className="text-center font-pixel text-[7px] text-ink-mute uppercase mt-6">
          ✦ Que el colibrí guíe tu espada ✦
        </p>
      </div>

      <HowToPlayModal open={howOpen} onClose={() => setHowOpen(false)} />
    </section>
  );
};

const Tag = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-2 px-3 py-2 bg-surface-2 border-2 border-border-strong font-pixel text-[8px] text-ink uppercase">
    <span className="text-accent">{icon}</span>
    {label}
  </span>
);
