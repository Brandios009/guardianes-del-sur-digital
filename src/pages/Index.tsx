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

export default Index;
