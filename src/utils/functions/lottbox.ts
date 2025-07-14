import { resources } from "../resources";

type LootboxType = "starter"; // Extinde în viitor cu: | "daily" | "battle" | "event" etc.

export const generateLootbox = (type: LootboxType) => {
  switch (type) {
    case "starter": {
      const possibleResources = resources.filter((res) => res.era === 1);
      const count = Math.random() < 0.5 ? 1 : 2;

      let selected;

      if (count === 1) {
        selected = possibleResources.filter(
          (res) => res.name === "Wood" || res.name === "Stone"
        );
        const chosen = selected[Math.floor(Math.random() * selected.length)];
        return [{
          name: chosen?.name,
          amount: Math.floor(Math.random() * 6) + 10 // 10–15
        }];
      }

      const shuffled = [...possibleResources].sort(() => Math.random() - 0.5);
      selected = shuffled.slice(0, 2);

      return selected.map((res) => ({
        name: res.name,
        amount: Math.floor(Math.random() * 6) + 10 // 10–15
      }));
    }

    // în viitor: alte cazuri de lootboxuri
    default:
      throw new Error(`Unknown lootbox type: ${type}`);
  }
};