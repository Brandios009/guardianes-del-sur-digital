import { useGame } from "@/store/game";
import { RegisterScreen } from "@/screens/RegisterScreen";
import { MapScreen } from "@/screens/MapScreen";
import { LoadingScreen } from "@/screens/LoadingScreen";
import { BossScreen } from "@/screens/BossScreen";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { WorldToggle } from "@/components/WorldToggle";
import { Notif } from "@/components/Notif";
import { useEffect } from "react";

const Index = () => {
  const screen = useGame((s) => s.screen);
  const unlocked = useGame((s) => s.unlocked);

  useEffect(() => {
    document.body.classList.toggle("world-vital", unlocked);
  }, [unlocked]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 z-0 pixel-grid pointer-events-none" />
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none" />
      <ParticleCanvas />

      <WorldToggle />
      {screen !== "register" && <UserPanel />}
      <Notif />

      <main className="relative z-10">
        {screen === "register" && <RegisterScreen />}
        {screen === "map" && <MapScreen />}
        {screen === "loading" && <LoadingScreen />}
        {screen === "boss" && <BossScreen />}
      </main>
    </div>
  );
};

const UserPanel = () => {
  const player = useGame((s) => s.player);
  const setPlayer = useGame((s) => s.setPlayer);
  const setScreen = useGame((s) => s.setScreen);
  const locations = useGame((s) => s.locations);

  const completed = locations.filter((l) => l.status === "unlocked").length;
  const progress = Math.round((completed / locations.length) * 100);

  return (
    <div className="fixed top-4 left-4 right-auto z-[50] panel-pixel p-3 sm:p-4 max-w-[280px] backdrop-blur-sm shadow-2xl border-border-strong">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <p className="font-pixel text-[7px] text-ink-mute uppercase">Registro</p>
          <p className="font-pixel text-[10px] text-accent uppercase">
            {player ? `${player.username || player.firstName}` : "Invitado"}
          </p>
        </div>
        {player ? (
          <button
            type="button"
            onClick={() => {
              setPlayer(null);
              setScreen("register");
            }}
            className="btn-ghost-pixel px-2 py-1 text-[8px]"
          >
            Cerrar
          </button>
        ) : null}
      </div>

      <div className="font-pixel text-[7px] text-ink-mute uppercase mb-2">Progreso de desbloqueo</div>
      <div className="h-2 rounded-full bg-ink/10 overflow-hidden mb-2">
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="font-pixel text-[7px] text-ink-soft uppercase">
        {progress}% Liberado
      </div>
    </div>
  );
};

export default Index;
