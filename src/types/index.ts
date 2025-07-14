export interface Era {
  id: number;
  name: string;
  altName: string;
  description: string;
}

export interface Building  {
  id: string;
  name: string;
  era: number;
  type: "generator" | "booster";
  produces?: string[]; // ID-uri din resources.ts
  productionRate?: number; // Amount produced per second
  boosts?: string[]; // ID-uri din resources.ts
  boostPercentage?: number; // Percentage boost for resources
  maxLevel: number;
  constructionCost: { [resourceId: string]: number };
  upgradesTo?: string; // ID-ul clădirii în era următoare (dacă poate fi evoluată)
};
export interface EraResource  {
  id: string;
  name: string;
  era: number;
  replaces?: string;
};

export interface ResourceInput  {
  name: string;
  amount: number;
};