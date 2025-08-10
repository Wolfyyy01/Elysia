import { and, eq } from "drizzle-orm";
import db from "../../database/drizzleClient";
import { buildings as buildingsTable, resources as resourcesTable } from "../../database/schema";
import { buildings } from "../buildings";

/**
 * Build a new building for a user
 * @param userId The database user ID
 * @param buildingId The ID of the building to construct
 * @returns Object with success status and message
 */
export async function buildBuilding(userId: number, buildingId: string) {
  try {
    // Find the building template
    const buildingTemplate = buildings.find((b) => b.id === buildingId);
    if (!buildingTemplate) {
      return { success: false, message: "Building not found" };
    }

    // Check if user already has this building
    const existingBuilding = await db
      .select()
      .from(buildingsTable)
      .where(
        and(
          eq(buildingsTable.user_id, userId),
          eq(buildingsTable.building_id, buildingId)
        )
      )
      .limit(1);

    if (existingBuilding.length > 0) {
      return { 
        success: false, 
        message: "You already have this building" 
      };
    }

    // Check if user has enough resources
    const constructionCost = buildingTemplate.constructionCost;
    const requiredResources = Object.entries(constructionCost).map(
      ([name, amount]) => ({ name, amount })
    );

    // Get user's current resources
    const userResources = await Promise.all(
      requiredResources.map(async (resource) => {
        const result = await db
          .select()
          .from(resourcesTable)
          .where(
            and(
              eq(resourcesTable.user_id, userId),
              eq(resourcesTable.resource_id, resource.name)
            )
          )
          .limit(1);

        return {
          name: resource.name,
          required: resource.amount,
          available: result[0]?.amount || 0,
        };
      })
    );

    // Check if any resources are insufficient
    const insufficientResources = userResources.filter(
      (r) => r.available < r.required
    );

    if (insufficientResources.length > 0) {
      const missingResources = insufficientResources
        .map((r) => `${r.name}: ${r.available}/${r.required}`)
        .join(", ");

      return {
        success: false,
        message: `Insufficient resources: ${missingResources}`,
      };
    }

    // Deduct resources from user
    for (const resource of userResources) {
      await db
        .update(resourcesTable)
        .set({ amount: resource.available - resource.required })
        .where(
          and(
            eq(resourcesTable.user_id, userId),
            eq(resourcesTable.resource_id, resource.name)
          )
        );
    }

    // Add building to user's buildings
    await db.insert(buildingsTable).values({
      building_id: buildingId,
      user_id: userId,
      name: buildingTemplate.name,
      type: buildingTemplate.type,
      level: 1,
      created_at: new Date(),
    });

    return {
      success: true,
      message: `Successfully built ${buildingTemplate.name}`,
      building: buildingTemplate,
    };
  } catch (error) {
    console.error("Error building structure:", error);
    return { success: false, message: "An error occurred during construction" };
  }
}
