import type { EraResource } from "../types";

export const resources: EraResource[] = [
  // Preistorică
  { id: "stone", name: "Stone", era: 1 },
  { id: "wood", name: "Wood", era: 1 },
  { id: "berries", name: "Berries", era: 1 },

  // Epoca Bronzului
  { id: "copper", name: "Copper", era: 2 },
  { id: "tin", name: "Tin", era: 2 },
  { id: "bronze", name: "Bronze", era: 2 },
  { id: "grain", name: "Grain", era: 2, replaces: "berries" },
  { id: "cloth", name: "Cloth", era: 2 },

  // Epoca Fierului
  { id: "iron", name: "Iron", era: 3, replaces: "bronze" },
  { id: "coal", name: "Coal", era: 3 },
  { id: "tools", name: "Tools", era: 3 },
  { id: "bread", name: "Bread", era: 3, replaces: "grain" },
];
