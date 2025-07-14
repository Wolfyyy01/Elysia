import { and, eq } from "drizzle-orm";
import type { ResourceInput } from "../../types";
import db from "../../database/drizzleClient";
import { resources } from "../../database/schema";

export async function saveResources(
  userId: number,
  newResources: ResourceInput[]
) {
  for (const resource of newResources) {
    const existing = await db
      .select()
      .from(resources)
      .where(
        and(eq(resources.user_id, userId), eq(resources.name, resource.name))
      )
      .limit(1);

    if (existing.length > 0) {
      // Update amount
      await db
        .update(resources)
        .set({ amount: Number(existing[0]?.amount ?? 0) + resource.amount })
        .where(eq(resources.id, existing[0]?.id ?? 0));
    } else {
      // Insert new resource
      await db.insert(resources).values({
        user_id: userId,
        name: resource.name,
        amount: resource.amount,
      });
    }
  }
}
