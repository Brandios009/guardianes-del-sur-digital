import { create } from "zustand";
import bossLajas from "@/assets/boss-lajas.png";
import bossCocha from "@/assets/boss-cocha.png";
import bossGaleras from "@/assets/boss-galeras.png";
import bossJuanambu from "@/assets/boss-juanambu.png";

export type Screen = "register" | "map" | "loading" | "boss" | "destiny";

export type LocationKey = "lajas" | "cocha" | "galeras" | "juanambu";
export type LocationStatus = "locked" | "active" | "done";

export interface BossInfo {
  name: string;
  title: string;
  description: string;
  image: string;
  element: string;
  hp: number;
  threat: 1 | 2 | 3 | 4 | 5;
}

export interface GuardianLocation {
  key: LocationKey;
  name: string;
  subtitle: string;
  lore: string;
  myth: string;
  status: LocationStatus;
  boss: BossInfo;
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
    boss: {
      name: "Aurix, Sombra del Guáitara",
      title: "El Demonio del Puente",
      description:
        "Espíritu encadenado que durante siglos rugió bajo el cañón. Forjado en envidia y oscuridad, intenta sellar el santuario con bruma escarlata. Solo la fe del peregrino puede romper sus cadenas.",
      image: bossLajas,
      element: "Sombra · Piedra",
      hp: 1200,
      threat: 3,
    },
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
    boss: {
      name: "Yacumama, Madre de las Aguas",
      title: "La Serpiente del Lago Sagrado",
      description:
        "Antigua serpiente acuática de escamas turquesas que custodia los secretos del Guamuez. Cuando enfurece, el agua se vuelve espejo negro y devora a quien no sepa callar.",
      image: bossCocha,
      element: "Agua · Niebla",
      hp: 1450,
      threat: 4,
    },
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
    boss: {
      name: "Urcunina, Coloso del Magma",
      title: "El Titán del Fuego Andino",
      description:
        "Gigante de obsidiana con grietas de lava viva. Despierta cuando los Quillasingas son olvidados. Cada uno de sus pasos hace temblar a Pasto y enciende el cielo en cenizas.",
      image: bossGaleras,
      element: "Fuego · Tierra",
      hp: 1800,
      threat: 5,
    },
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
    boss: {
      name: "Mayasquer, Espectro del Cañón",
      title: "Guardián de los Caídos",
      description:
        "Guerrero ancestral que cayó defendiendo el sur. Su espíritu camina entre la niebla del cañón con plumas de jade y machete espectral. Solo respeta al valiente que no huye.",
      image: bossJuanambu,
      element: "Espíritu · Selva",
      hp: 1600,
      threat: 4,
    },
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
