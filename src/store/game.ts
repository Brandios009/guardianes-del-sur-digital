import { create } from "zustand";

export type Screen = "register" | "map" | "loading" | "destiny";

export type LocationKey = "lajas" | "cocha" | "galeras" | "juanambu";
export type LocationStatus = "locked" | "active" | "done";

export interface GuardianLocation {
  key: LocationKey;
  name: string;
  subtitle: string;
  lore: string;
  myth: string;
  status: LocationStatus;
  // SVG node coords (viewBox 0 0 800 500)
  x: number;
  y: number;
}

export interface Player {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  city: string;
}

interface GameState {
  screen: Screen;
  setScreen: (s: Screen) => void;

  player: Player | null;
  setPlayer: (p: Player) => void;

  unlocked: boolean;
  setUnlocked: (u: boolean) => void;

  locations: GuardianLocation[];
  activeLocation: LocationKey | null;
  setActiveLocation: (k: LocationKey | null) => void;
  completeLocation: (k: LocationKey) => void;

  notif: string | null;
  showNotif: (msg: string) => void;
}

const initialLocations: GuardianLocation[] = [
  {
    key: "lajas",
    name: "Las Lajas",
    subtitle: "Santuario milagroso",
    lore: "La Virgen del Rosario guía al peregrino sobre el abismo del Guáitara.",
    myth: "Antes del milagro, el demonio rugía bajo el puente; nadie cruzaba de noche.",
    status: "active",
    x: 180,
    y: 340,
  },
  {
    key: "cocha",
    name: "Laguna de la Cocha",
    subtitle: "Lago sagrado",
    lore: "El espíritu del agua escucha a quien sabe callar y mirar.",
    myth: "En sus aguas nace el río Guamuez; los Quillasingas hablan con la luna desde su orilla.",
    status: "locked",
    x: 540,
    y: 220,
  },
  {
    key: "galeras",
    name: "Volcán Galeras",
    subtitle: "Fuego ancestral",
    lore: "Urcunina, montaña de fuego, custodia los sueños de Pasto.",
    myth: "Cuando el Galeras truena, los abuelos dicen que el corazón de la tierra está latiendo.",
    status: "locked",
    x: 320,
    y: 160,
  },
  {
    key: "juanambu",
    name: "Cañón Juanambú",
    subtitle: "Abismo verde",
    lore: "Río de selva y batallas, cuna del valor nariñense.",
    myth: "Sus paredes verdes esconden el eco de los héroes que defendieron al sur.",
    status: "locked",
    x: 660,
    y: 380,
  },
];

export const useGame = create<GameState>((set, get) => ({
  screen: "register",
  setScreen: (s) => set({ screen: s }),

  player: null,
  setPlayer: (p) => set({ player: p }),

  unlocked: false,
  setUnlocked: (u) => set({ unlocked: u }),

  locations: initialLocations,
  activeLocation: null,
  setActiveLocation: (k) => set({ activeLocation: k }),

  completeLocation: (k) => {
    const locations = get().locations.map((l) => {
      if (l.key === k) return { ...l, status: "done" as LocationStatus };
      return l;
    });
    // Activate the next locked one
    const order: LocationKey[] = ["lajas", "cocha", "galeras", "juanambu"];
    const idx = order.indexOf(k);
    const next = order[idx + 1];
    if (next) {
      const i = locations.findIndex((l) => l.key === next);
      if (i >= 0 && locations[i].status === "locked") {
        locations[i] = { ...locations[i], status: "active" };
      }
    }
    const allDone = locations.every((l) => l.status === "done");
    set({ locations, unlocked: allDone });
  },

  notif: null,
  showNotif: (msg) => {
    set({ notif: msg });
    setTimeout(() => set({ notif: null }), 3500);
  },
}));
