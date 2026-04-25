import { useGame } from "@/store/game";

/**
 * Toast-style notification anchored to bottom-right, pixel framed.
 */
export const Notif = () => {
  const notif = useGame((s) => s.notif);
  return (
    <div
      className={`fixed bottom-6 right-6 z-[1000] panel-pixel px-4 py-3 max-w-[300px] transition-transform duration-300 ${
        notif ? "translate-x-0" : "translate-x-[140%]"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="font-pixel text-[8px] text-accent mb-1">▸ MENSAJE</div>
      <div className="font-body text-sm text-ink">{notif}</div>
    </div>
  );
};
