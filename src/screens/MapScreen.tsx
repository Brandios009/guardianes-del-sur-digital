import { useGame, type GuardianLocation, type LocationKey } from "@/store/game";
import { Colibri } from "@/components/Colibri";
import { ArrowLeft, Lock, Swords, Sparkles, MapPin } from "lucide-react";
import landscapeDecadente from "@/assets/landscape-decadente.jpg";
import landscapeVital from "@/assets/landscape-vital.jpg";
import { useState } from "react";

export const MapScreen = () => {
  const locations = useGame((s) => s.locations);
  const setActive = useGame((s) => s.setActiveLocation);
  const setScreen = useGame((s) => s.setScreen);
  const player = useGame((s) => s.player);
  const unlocked = useGame((s) => s.unlocked);
  const showNotif = useGame((s) => s.showNotif);

  const [hovered, setHovered] = useState<LocationKey | null>(null);

  const completed = locations.filter((l) => l.status === "done").length;
  const rank =
    completed === 4
      ? "Guardián Eterno"
      : completed >= 2
      ? "Caminante del Sur"
      : completed >= 1
      ? "Aprendiz"
      : "Forastero";

  const onSelect = (loc: GuardianLocation) => {
    if (loc.status === "locked") {
      showNotif(`${loc.name} aún está sellado. Libera el destino anterior.`);
      return;
    }
    setActive(loc.key);
    setScreen("loading");
  };

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={unlocked ? landscapeVital : landscapeDecadente}
          alt=""
          aria-hidden
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ filter: unlocked ? "saturate(1.1)" : "saturate(0.6) brightness(0.55)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background) / 0.4) 0%, hsl(var(--background) / 0.85) 60%, hsl(var(--background)) 100%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 panel-pixel border-x-0 border-t-0 px-4 sm:px-8 py-3 flex flex-wrap items-center gap-3 justify-between">
        <button
          onClick={() => setScreen("register")}
          className="btn-ghost-pixel"
          aria-label="Salir"
        >
          <ArrowLeft className="w-3 h-3" /> Salir
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-pixel text-[8px] sm:text-[10px] text-ink uppercase">
            ✦ Guardianes del Sur ✦
          </span>
          <span className="hidden sm:inline font-pixel text-[8px] text-ink-mute">|</span>
          <span className="font-pixel text-[8px] text-accent uppercase">
            Tierra de Guardianes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="panel-deep px-3 py-2 flex items-center gap-2">
            <Swords className="w-3 h-3 text-accent" />
            <span className="font-pixel text-[9px] text-accent">
              {completed} / 4
            </span>
          </div>
          <div className="panel-deep px-3 py-2 hidden md:block">
            <span className="font-pixel text-[8px] text-ink-mute uppercase">
              {player?.firstName ?? "Anónimo"} · {rank}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Map */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 vignette">
          {/* Floating mascot in corner */}
          <div className="absolute bottom-6 left-6 hidden md:block opacity-90">
            <Colibri size={140} />
          </div>

          <svg
            viewBox="0 0 800 500"
            className="w-full max-w-3xl h-auto drop-shadow-[6px_6px_0_hsl(var(--background))]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Old parchment-style map frame */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeOpacity="0.25"
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--surface))" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.85" />
              </linearGradient>
              <filter id="pixelize">
                <feFlood floodColor="hsl(var(--accent))" />
                <feComposite in2="SourceGraphic" operator="in" />
              </filter>
            </defs>

            <rect
              x="6"
              y="6"
              width="788"
              height="488"
              fill="url(#mapBg)"
              stroke="hsl(var(--border))"
              strokeWidth="3"
            />
            <rect x="6" y="6" width="788" height="488" fill="url(#grid)" />

            {/* Stylized rivers / paths between nodes */}
            <g stroke="hsl(var(--accent))" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 6" fill="none">
              <path d={pathBetween(locations[0], locations[1])} />
              <path d={pathBetween(locations[1], locations[2])} />
              <path d={pathBetween(locations[1], locations[3])} />
            </g>

            {/* Decorative compass */}
            <g transform="translate(720, 60)">
              <circle r="28" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="2" />
              <text
                x="0"
                y="-12"
                textAnchor="middle"
                fontFamily="Press Start 2P"
                fontSize="8"
                fill="hsl(var(--accent))"
              >
                N
              </text>
              <polygon points="0,-6 4,8 0,4 -4,8" fill="hsl(var(--accent))" />
            </g>

            {/* Nodes */}
            {locations.map((loc) => (
              <MapNode
                key={loc.key}
                loc={loc}
                onClick={() => onSelect(loc)}
                onHover={setHovered}
                hovered={hovered === loc.key}
              />
            ))}
          </svg>

          {/* Floating tooltip on hover */}
          {hovered && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 panel-pixel px-4 py-3 pointer-events-none animate-fade-in">
              <p className="font-pixel text-[8px] text-accent uppercase mb-1">
                ▸ {locations.find((l) => l.key === hovered)?.name}
              </p>
              <p className="font-pixel text-[7px] text-ink-soft uppercase">
                {locations.find((l) => l.key === hovered)?.subtitle}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[300px] panel-pixel border-r-0 border-b-0 lg:border-l-2 border-t-2 lg:border-t-0 flex flex-col max-h-[420px] lg:max-h-none overflow-y-auto">
          <div className="px-5 py-4 border-b-2 border-border-strong">
            <h2 className="font-pixel text-[10px] text-accent uppercase flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Destinos por liberar
            </h2>
            <div className="flex gap-3 mt-3 flex-wrap">
              <LegendDot tone="active" label="Activo" />
              <LegendDot tone="locked" label="Sellado" />
              <LegendDot tone="done" label="Liberado" />
            </div>
          </div>
          {locations.map((loc) => (
            <button
              key={loc.key}
              onClick={() => onSelect(loc)}
              onMouseEnter={() => setHovered(loc.key)}
              onMouseLeave={() => setHovered(null)}
              className="text-left px-5 py-4 border-b border-border-strong hover:bg-surface-2 transition-colors"
            >
              <div className="font-pixel text-[9px] text-ink uppercase mb-2">
                ▸ {loc.name}
              </div>
              <div className="font-pixel text-[7px] text-ink-mute mb-3 uppercase leading-loose">
                {loc.subtitle}
              </div>
              <StatusBadge status={loc.status} />
            </button>
          ))}
        </aside>
      </div>
    </section>
  );
};

const pathBetween = (a: GuardianLocation, b: GuardianLocation) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 40;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
};

const MapNode = ({
  loc,
  onClick,
  onHover,
  hovered,
}: {
  loc: GuardianLocation;
  onClick: () => void;
  onHover: (k: LocationKey | null) => void;
  hovered: boolean;
}) => {
  const colors = {
    active: { fill: "hsl(var(--accent))", stroke: "hsl(var(--primary))" },
    locked: { fill: "hsl(var(--muted))", stroke: "hsl(var(--ink-mute))" },
    done:   { fill: "hsl(var(--hb-gold))", stroke: "hsl(var(--hb-jade))" },
  }[loc.status];

  return (
    <g
      transform={`translate(${loc.x}, ${loc.y})`}
      onClick={onClick}
      onMouseEnter={() => onHover(loc.key)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: loc.status === "locked" ? "not-allowed" : "pointer" }}
    >
      {/* Pulse rings only for active */}
      {loc.status === "active" && (
        <>
          <g className="svg-pulse">
            <circle r="22" fill="none" stroke={colors.fill} strokeWidth="2" />
          </g>
          <g className="svg-pulse-2">
            <circle r="30" fill="none" stroke={colors.fill} strokeWidth="1.5" />
          </g>
        </>
      )}

      {/* Pixel pin (octagon-ish) */}
      <polygon
        points="-12,-6 -6,-12 6,-12 12,-6 12,6 6,12 -6,12 -12,6"
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth="2"
      />
      {/* Inner glyph */}
      <text
        x="0"
        y="4"
        textAnchor="middle"
        fontFamily="Press Start 2P"
        fontSize="9"
        fill={colors.stroke}
      >
        {loc.status === "locked" ? "✕" : loc.status === "done" ? "✓" : "▲"}
      </text>

      {/* Label */}
      <g transform="translate(0, 32)">
        <rect
          x="-46"
          y="-8"
          width="92"
          height="18"
          fill="hsl(var(--background))"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Press Start 2P"
          fontSize="6"
          fill={hovered ? colors.fill : "hsl(var(--foreground))"}
        >
          {loc.name.toUpperCase()}
        </text>
      </g>
    </g>
  );
};

const StatusBadge = ({ status }: { status: GuardianLocation["status"] }) => {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 font-pixel text-[7px] uppercase px-2 py-1 bg-accent text-accent-foreground">
        <Sparkles className="w-2.5 h-2.5" /> Activo
      </span>
    );
  }
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 font-pixel text-[7px] uppercase px-2 py-1 bg-hb-gold text-background">
        ✓ Liberado
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-pixel text-[7px] uppercase px-2 py-1 bg-muted text-ink-mute border border-border-strong">
      <Lock className="w-2.5 h-2.5" /> Sellado
    </span>
  );
};

const LegendDot = ({ tone, label }: { tone: "active" | "locked" | "done"; label: string }) => {
  const cls = {
    active: "bg-accent border-primary animate-flicker",
    locked: "bg-muted border-ink-mute",
    done: "bg-hb-gold border-hb-jade",
  }[tone];
  return (
    <span className="flex items-center gap-2 font-pixel text-[6px] uppercase text-ink-mute">
      <span className={`w-3 h-3 border-2 ${cls}`} />
      {label}
    </span>
  );
};
