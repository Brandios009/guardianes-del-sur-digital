import colibriVital from "@/assets/colibri-vital.png";
import colibriDecadente from "@/assets/colibri-decadente.png";
import { useGame } from "@/store/game";

interface Props {
  size?: number;
  className?: string;
  forceState?: "vital" | "decadent";
}

/**
 * Hummingbird mascot. Cross-fades between the decadent ruined version
 * and the vital armored hero based on the world state.
 */
export const Colibri = ({ size = 220, className = "", forceState }: Props) => {
  const unlocked = useGame((s) => s.unlocked);
  const showVital = forceState ? forceState === "vital" : unlocked;

  return (
    <div
      className={`relative inline-block animate-float-soft ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow halo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-2xl opacity-50 transition-opacity duration-1000"
        style={{
          background: showVital
            ? "radial-gradient(circle, hsl(var(--hb-gold) / 0.7), transparent 65%)"
            : "radial-gradient(circle, hsl(var(--accent) / 0.5), transparent 65%)",
        }}
      />
      <img
        src={colibriDecadente}
        alt=""
        aria-hidden
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
          showVital ? "opacity-0" : "opacity-100"
        }`}
        style={{ imageRendering: "pixelated" }}
      />
      <img
        src={colibriVital}
        alt="Colibrí guardián de Nariño"
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
          showVital ? "opacity-100" : "opacity-0"
        }`}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};
