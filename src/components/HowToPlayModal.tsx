import { useEffect } from "react";
import { X, Sparkles, Sword, Map, Shield } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const HowToPlayModal = ({ open, onClose }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <button
        aria-label="Cerrar"
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-xl panel-glow p-6 sm:p-8 animate-scale-in">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border-2 border-border-strong bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="eyebrow mb-2">— Códice del Guardián —</p>
        <h3 className="font-pixel text-[14px] sm:text-[16px] text-accent mb-5 text-glow leading-tight">
          ▸ CÓMO JUGAR
        </h3>

        <ol className="space-y-4">
          <Rule
            icon={<Map className="w-3 h-3" />}
            num="01"
            title="Explora el mapa del sur"
            text="Cuatro santuarios sellados aguardan. Solo el destino activo (pulsando) puede ser liberado."
          />
          <Rule
            icon={<Sparkles className="w-3 h-3" />}
            num="02"
            title="Viaja al santuario"
            text="Selecciona el destino activo y cruza el camino del peregrino mientras la tierra te recibe."
          />
          <Rule
            icon={<Sword className="w-3 h-3" />}
            num="03"
            title="Enfrenta al guardián"
            text="Cada lugar esconde un boss ancestral. Estudia su ficha antes de iniciar el combate."
          />
          <Rule
            icon={<Shield className="w-3 h-3" />}
            num="04"
            title="Despierta el sur"
            text="Vence a los 4 guardianes para alzar la luz del colibrí y devolver el color a Nariño."
          />
        </ol>

        <button onClick={onClose} className="btn-pixel w-full mt-7">
          [ ENTENDIDO ]
        </button>
      </div>
    </div>
  );
};

const Rule = ({
  icon,
  num,
  title,
  text,
}: {
  icon: React.ReactNode;
  num: string;
  title: string;
  text: string;
}) => (
  <li className="flex gap-4">
    <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-accent text-accent-foreground border-2 border-hb-deep font-pixel text-[10px]">
      {num}
    </div>
    <div>
      <p className="font-pixel text-[10px] text-ink uppercase mb-2 flex items-center gap-2">
        <span className="text-accent">{icon}</span> {title}
      </p>
      <p className="font-pixel text-[8px] text-ink-soft leading-[1.9] normal-case">
        {text}
      </p>
    </div>
  </li>
);
