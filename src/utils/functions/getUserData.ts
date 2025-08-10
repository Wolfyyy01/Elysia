import db from "../../database/drizzleClient";
import { user, resources, buildings, type User, type Resource } from "../../database/schema";
import { eq } from "drizzle-orm";
import { eras } from "../eras";
export const getUserData = async (discordId: string) => {
  try {
    const [userData] = (await db
      .select()
      .from(user)
      .where(eq(user.discord_id, discordId))) as User[];

    if (!userData) return null;

    return userData
    
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const createUser = async (discordId: string, username: string) => {
  try {
    const existingUser = await getUserData(discordId);
    if (existingUser) {
      return 
    }

    const [newUser] = await db
      .insert(user)
      .values({
        discord_id: discordId,
        username: username,
        current_era: eras[0]?.id.toString() || "1",
        joined_at: new Date(),
      })
      .returning();

    if (!newUser) {
      throw new Error("Failed to create user");
    }
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
