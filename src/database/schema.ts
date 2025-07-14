import { bigint, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { eras } from "../utils/eras"
import type { InferModel } from "drizzle-orm"

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  discord_id: text("discord_id").unique(),
  username: text("username"),
  current_era: text("current_era").default(eras[0]?.name || `Prehistoric`),
  joined_at: timestamp("joined_at").default(new Date())
})

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => user.id),
  name: text("name"),
  amount: bigint("amount", { mode: "number" }).default(0),
})

export const buildings = pgTable("buildings", {
  id: serial("id").primaryKey(),
  building_id: text("building_id"),
  user_id: integer("user_id").references(() => user.id),
  name: text("name"),
  type: text("type"),
  level: integer("level").default(1),
  created_at: timestamp("created_at").default(new Date()),
})

export type User = InferModel<typeof user> 
export type Resource = InferModel<typeof resources>
export type Building = InferModel<typeof buildings>