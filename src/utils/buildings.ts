import type { Building } from "../types";

export const buildings: Building[] = [
  // === Epoca Preistorică ===
  {
    id: "stone_pit",
    name: "Stone Pit",
    era: 1,
    type: "generator",
    produces: ["stone"],
    productionRate: 1.0, // 1 stone per second
    maxLevel: 3,
    constructionCost: { wood: 10 },
    upgradesTo: "copper_mine",
  },
  {
    id: "wood_camp",
    name: "Wood Camp",
    era: 1,
    type: "generator",
    produces: ["wood"],
    productionRate: 1.2, // 1.2 wood per second
    maxLevel: 3,
    constructionCost: { stone: 5 },
  },
  {
    id: "berry_bush",
    name: "Berry Bush",
    era: 1,
    type: "generator",
    produces: ["berries"],
    productionRate: 0.8, // 0.8 berries per second
    maxLevel: 2,
    constructionCost: { wood: 8 },
    upgradesTo: "granary",
  },
  {
    id: "fire_hut",
    name: "Fire Hut",
    era: 1,
    type: "booster",
    boosts: ["berries", "wood"],
    boostPercentage: 15, // 15% boost
    maxLevel: 1,
    constructionCost: { wood: 10, stone: 5 },
  },
  {
    id: "totem_pole",
    name: "Totem Pole",
    era: 1,
    type: "booster",
    boosts: ["stone", "wood", "berries"],
    boostPercentage: 10, // 10% boost
    maxLevel: 1,
    constructionCost: { wood: 15 },
  },

  // === Epoca Bronzului ===
  {
    id: "copper_mine",
    name: "Copper Mine",
    era: 2,
    type: "generator",
    produces: ["copper"],
    productionRate: 0.9, // 0.9 copper per second
    maxLevel: 4,
    constructionCost: { stone: 15, wood: 10 },
    upgradesTo: "iron_mine",
  },
  {
    id: "tin_mine",
    name: "Tin Mine",
    era: 2,
    type: "generator",
    produces: ["tin"],
    productionRate: 0.7, // 0.7 tin per second
    maxLevel: 4,
    constructionCost: { stone: 15, wood: 10 },
  },
  {
    id: "bronze_smelter",
    name: "Bronze Smelter",
    era: 2,
    type: "generator",
    produces: ["bronze"],
    productionRate: 0.5, // 0.5 bronze per second
    maxLevel: 3,
    constructionCost: { copper: 10, tin: 10, stone: 15 },
  },
  {
    id: "grain_field",
    name: "Grain Field",
    era: 2,
    type: "generator",
    produces: ["grain"],
    productionRate: 1.0, // 1.0 grain per second
    maxLevel: 3,
    constructionCost: { wood: 20 },
    upgradesTo: "bakery",
  },
  {
    id: "weaving_hut",
    name: "Weaving Hut",
    era: 2,
    type: "generator",
    produces: ["cloth"],
    productionRate: 0.6, // 0.6 cloth per second
    maxLevel: 2,
    constructionCost: { grain: 10, wood: 10 },
  },
  {
    id: "forge",
    name: "Forge",
    era: 2,
    type: "booster",
    boosts: ["copper", "tin", "bronze"],
    boostPercentage: 20, // 20% boost
    maxLevel: 2,
    constructionCost: { stone: 20, bronze: 5 },
  },
  {
    id: "granary",
    name: "Granary",
    era: 2,
    type: "booster",
    boosts: ["grain"],
    boostPercentage: 25, // 25% boost
    maxLevel: 1,
    constructionCost: { wood: 30 },
  },

  // === Epoca Fierului ===
  {
    id: "iron_mine",
    name: "Iron Mine",
    era: 3,
    type: "generator",
    produces: ["iron"],
    productionRate: 0.8, // 0.8 iron per second
    maxLevel: 5,
    constructionCost: { copper: 20, bronze: 10 },
  },
  {
    id: "coal_mine",
    name: "Coal Mine",
    era: 3,
    type: "generator",
    produces: ["coal"],
    productionRate: 0.7, // 0.7 coal per second
    maxLevel: 4,
    constructionCost: { wood: 25, stone: 20 },
  },
  {
    id: "bakery",
    name: "Bakery",
    era: 3,
    type: "generator",
    produces: ["bread"],
    productionRate: 0.9, // 0.9 bread per second
    maxLevel: 3,
    constructionCost: { grain: 15, wood: 15 },
  },
  {
    id: "toolsmith",
    name: "Toolsmith",
    era: 3,
    type: "generator",
    produces: ["tools"],
    productionRate: 0.5, // 0.5 tools per second
    maxLevel: 3,
    constructionCost: { iron: 10, coal: 5 },
  },
  {
    id: "blacksmith",
    name: "Blacksmith",
    era: 3,
    type: "booster",
    boosts: ["iron", "tools"],
    boostPercentage: 30, // 30% boost
    maxLevel: 2,
    constructionCost: { coal: 10, tools: 5 },
  },
  {
    id: "warehouse",
    name: "Warehouse",
    era: 3,
    type: "booster",
    boosts: ["bread", "tools", "iron"],
    boostPercentage: 20, // 20% boost
    maxLevel: 1,
    constructionCost: { wood: 40, stone: 20 },
  },
];
