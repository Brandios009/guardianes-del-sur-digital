import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props { onSelect: () => void; }

export default function Mapa({ onSelect }: Props) {
  const [tooltip, setTooltip] = useState('');

  return (
    <div className="flex h-screen">
      <div className="w-1/3 pixel-frame p-4">
        <h2>Destinos</h2>
        <div className="space-y-2">
          <Button onClick={onSelect} className="pixel-btn w-full" onMouseEnter={() => setTooltip('Las Lajas - Activo')} onMouseLeave={() => setTooltip('')}>Las Lajas</Button>
          <Button disabled className="pixel-btn w-full opacity-50">La Cocha - Sellado</Button>
          <Button disabled className="pixel-btn w-full opacity-50">Galeras - Sellado</Button>
          <Button disabled className="pixel-btn w-full opacity-50">Juanambú - Sellado</Button>
        </div>
      </div>
      <div className="w-2/3 relative">
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          <circle cx="100" cy="100" r="20" fill="var(--dk-accent)" onClick={onSelect} />
          <text x="100" y="105" textAnchor="middle" fill="var(--dk-fg)">Las Lajas</text>
        </svg>
        {tooltip && <div className="absolute top-10 left-10 pixel-frame p-2">{tooltip}</div>}
      </div>
    </div>
  );
}