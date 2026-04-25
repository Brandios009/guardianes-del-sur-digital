import { useEffect, useRef } from "react";
import { useGame } from "@/store/game";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

/**
 * Atmospheric pixel particles — embers in decadent state, petals/fireflies in vital state.
 */
export const ParticleCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const unlocked = useGame((s) => s.unlocked);
  const unlockedRef = useRef(unlocked);
  unlockedRef.current = unlocked;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const particles: Particle[] = [];
    const TARGET = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const vital = unlockedRef.current;
      particles.push({
        x: Math.random() * canvas.width,
        y: vital ? Math.random() * canvas.height : canvas.height + 10,
        vx: (Math.random() - 0.5) * (vital ? 0.6 : 0.3),
        vy: vital ? -0.2 - Math.random() * 0.4 : -0.4 - Math.random() * 0.7,
        life: 0,
        maxLife: 200 + Math.random() * 200,
        size: 2 + Math.floor(Math.random() * 3),
        hue: vital
          ? [42, 184, 150, 330][Math.floor(Math.random() * 4)]
          : [10, 18, 0][Math.floor(Math.random() * 3)],
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      while (particles.length < TARGET) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.05;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        const sat = unlockedRef.current ? 80 : 60;
        const light = unlockedRef.current ? 65 : 50;
        ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${light}%, ${alpha * 0.85})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

        if (p.life > p.maxLife || p.y < -20 || p.y > canvas.height + 20) {
          particles.splice(i, 1);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-[2] pointer-events-none"
      aria-hidden="true"
    />
  );
};
