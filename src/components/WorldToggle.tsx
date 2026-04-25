import { useGame } from "@/store/game";
import { Lock, Unlock } from "lucide-react";

/**
 * Floating world toggle: forces vital/decadent state. Useful for QA & for the user to feel the duality.
 */
export const WorldToggle = () => {
  const unlocked = useGame((s) => s.unlocked);
  const setUnlocked = useGame((s) => s.setUnlocked);

  return (
    <div className="fixed top-4 right-4 z-[9999] panel-pixel px-3 py-2 flex items-center gap-3 backdrop-blur-sm">
      <span className="font-pixel text-[8px] text-ink-mute uppercase hidden sm:inline">
        Mundo
      </span>
      <button
        type="button"
        onClick={() => setUnlocked(!unlocked)}
        className="flex items-center gap-2 cursor-pointer group"
        aria-label="Cambiar estado del mundo"
      >
        <span className="font-pixel text-[8px] text-accent uppercase">
          {unlocked ? "Vital" : "Decadente"}
        </span>
        <span
          className={`relative w-10 h-5 border-2 border-border-strong bg-background transition-colors ${
            unlocked ? "border-accent" : ""
          }`}
        >
          <span
            className={`absolute top-[2px] w-2 h-2 bg-accent transition-all ${
              unlocked ? "left-[24px]" : "left-[2px]"
            }`}
          />
        </span>
        {unlocked ? (
          <Unlock className="w-3 h-3 text-accent" />
        ) : (
          <Lock className="w-3 h-3 text-ink-mute" />
        )}
      </button>
    </div>
  );
};
