import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Props { onNext: () => void; }

export default function Lore({ onNext }: Props) {
  return (
    <div className="pixel-frame p-8 max-w-4xl mx-auto mt-10 flex">
      <div className="w-1/2">
        <img src="/assets/sprites/demonio_final.png" alt="Demonio" className="w-64 h-64" onError={(e) => e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="var(--dk-accent)"/></svg>'} />
        <h2>Demonio Guardián</h2>
        <div className="space-y-2">
          <div>Fuerza: <Progress value={80} /></div>
          <div>Magia: <Progress value={90} /></div>
          <div>Resistencia: <Progress value={70} /></div>
        </div>
      </div>
      <div className="w-1/2">
        <h2>Leyenda</h2>
        <ul className="list-disc pl-4">
          <li>Protector de Las Lajas.</li>
          <li>Despierta con el ritual.</li>
        </ul>
        <Button onClick={onNext} className="pixel-btn mt-4">Continuar</Button>
      </div>
    </div>
  );
}