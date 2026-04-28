import { useState } from 'react';
import { useAppStore } from '../App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props { onNext: () => void; }

export default function Registro({ onNext }: Props) {
  const { setUsuario } = useAppStore();
  const [form, setForm] = useState({ nombre: '', edad: '', genero: '' });

  const handleSubmit = () => {
    setUsuario({ ...form, edad: parseInt(form.edad) });
    onNext();
  };

  return (
    <div className="pixel-frame p-8 max-w-md mx-auto mt-20">
      <img src="/assets/sprites/colibri_idle.gif" alt="Colibrí" className="w-32 h-32 mx-auto mb-4" onError={(e) => e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="var(--dk-accent)"/></svg>'} />
      <h1 className="text-center mb-4">Registro de Guardián</h1>
      <Input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="pixel-input mb-2" />
      <Input placeholder="Edad" type="number" value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} className="pixel-input mb-2" />
      <select value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })} className="pixel-input mb-4">
        <option value="">Género</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
      <Button onClick={handleSubmit} className="pixel-btn w-full">Iniciar Aventura</Button>
      <div className="ticker mt-4">Bienvenido a Guardianes del Sur...</div>
    </div>
  );
}