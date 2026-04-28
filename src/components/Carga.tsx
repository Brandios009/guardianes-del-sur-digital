import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface Props { onComplete: () => void; }

export default function Carga({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  }, [onComplete]);

  return (
    <div className="pixel-frame p-8 max-w-md mx-auto mt-20 text-center">
      <img src="/assets/sprites/colibri_run.gif" alt="Colibrí corriendo" className="w-32 h-32 mx-auto mb-4" onError={(e) => e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="var(--dk-secondary)"/></svg>'} />
      <h1>Caminando hacia Las Lajas...</h1>
      <Progress value={progress} className="mt-4" />
      <div className="mt-4">Polvillo mágico flota...</div>
    </div>
  );
}