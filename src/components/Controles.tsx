import { Button } from '@/components/ui/button';

interface Props { onNext: () => void; }

export default function Controles({ onNext }: Props) {
  return (
    <div className="pixel-frame p-8 max-w-2xl mx-auto mt-20">
      <h1>Mecánicas del Juego</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3>Combate</h3>
          <p>WASD: Mover | Espacio: Atacar</p>
        </div>
        <div>
          <h3>Exploración</h3>
          <p>Clic: Interactuar</p>
        </div>
      </div>
      <Button onClick={onNext} className="pixel-btn mt-4">Ir al Minijuego</Button>
    </div>
  );
}