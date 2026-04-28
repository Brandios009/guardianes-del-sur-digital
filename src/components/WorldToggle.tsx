import { useGame } from "@/store/game";
import { Lock, Unlock } from "lucide-react";

/**
 * Floating world toggle: forces vital/decadent state. Useful for QA & for the user to feel the duality.
 */
export const WorldToggle = () => {
  const unlocked = useGame((s) => s.unlocked);
  const setUnlocked = useGame((s) => s.setUnlocked);

  return (
    <button
      type="button"
      onClick={() => setUnlocked(!unlocked)}
      aria-label="Cambiar versión del mundo"
      className="fixed top-4 left-4 z-[9999] panel-pixel p-2 border border-border-strong bg-background/90 rounded-full shadow-lg"
    >
      <span
        className={`relative block w-9 h-5 rounded-full border-2 border-border-strong transition-colors ${
          unlocked ? "bg-emerald-500/20" : "bg-destructive/20"
        }`}
      >
        <span
          className={`absolute top-[2px] w-3 h-3 rounded-full bg-accent transition-all ${
            unlocked ? "left-[22px]" : "left-[2px]"
          }`}
        />
      </span>
    </button>
  );
};
