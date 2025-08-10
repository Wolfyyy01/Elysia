import type { SlashCommandProps, CommandOptions, ButtonKit } from "commandkit";
import { ActionRowBuilder, ButtonInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { buildings } from "../../utils/buildings";
import config from "../../utils/config";
import { ConfirmButton } from "../../assets/buttons";
import { buildBuilding } from "../../utils/functions/build";
import { getUserData } from "../../utils/functions/getUserData";

export const data = new SlashCommandBuilder()
  .setName("build")
  .setDescription(
    "Lay the foundations of your civilization. Build structures that shape your legacy."
  )
  .addStringOption((option) =>
    option
      .setName("structure")
      .setDescription("The structure you want to build.")
      .setRequired(true)
      .setAutocomplete(true)
  );

export async function run({ interaction, client, handler }: SlashCommandProps) {
  // Get user data first
  const userData = await getUserData(interaction.user.id);
  if (!userData) {
    return interaction.reply({
      content: "You need to create a profile first! Use the /start command.",
      ephemeral: true,
    });
  }

  const structure = interaction.options.getString("structure");
  if (!structure)
    return interaction.reply({
      content: "You must select a structure to build.",
      ephemeral: true,
    });
  const building = buildings.find((b) => b.id === structure);
  if (!building)
    return interaction.reply({
      content: "Invalid structure selected.",
      ephemeral: true,
    });

  // Check if user's era is high enough for this building
  const userEraId = parseInt(userData.current_era ?? '0');
  if (building.era > userEraId) {
    return interaction.reply({
      content: `You haven't reached the era required for this building yet.`,
      ephemeral: true,
    });
  }

  const constructionCost = Object.keys(building.constructionCost)
    .map((key) => `${building.constructionCost[key]} ${key}`)
    .join("\n");

  const boosts = building.boosts?.map((boost) => boost)?.join(", ");

  const benefits =
    building.type === "generator"
      ? `+${building.productionRate} ${building.produces![0]} /hour`
      : `+${building.boostPercentage}% boost for: ${boosts}`;

  const embed = new EmbedBuilder()
    .setTitle(`Build: ${building.name}`)
    .setDescription(
      `Are you sure you want to build **${building.name}**?\nThis building is a ${building.type}`
    )
    .addFields(
      {
        name: "Required Resources",
        value: constructionCost,
        inline: true,
      },
      {
        name: "Type",
        value: building.type,
        inline: true,
      },
      {
        name: "Benefits",
        value: benefits,
        inline: true,
      }
    )
    .setColor(config.colors.primary)
    .setFooter({ text: "Confirm below to start construction." })
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonKit>().addComponents(ConfirmButton);

  const message = await interaction.reply({
    embeds: [embed],
    components: [row],
    fetchReply: true,
    flags: ['Ephemeral']
  });

  // Handle confirm button click
  ConfirmButton.onClick(async (buttonInteraction: ButtonInteraction): Promise<void> => {
     buttonInteraction.deferUpdate();
    
    // Build the structure
    const result = await buildBuilding(userData.id, structure);
    
    if (!result.success) {
      // If building failed, update the message with the error
      const errorEmbed = new EmbedBuilder()
        .setTitle("Construction Failed")
        .setDescription(result.message)
        .setColor(config.colors.error)
        .setTimestamp();
      
      await buttonInteraction.editReply({
        embeds: [errorEmbed],
        components: []
      });
    }
    
    // If building succeeded, update the message with success
    const successEmbed = new EmbedBuilder()
      .setTitle("🏗️ Building Constructed")
      .setDescription(result.message)
      .setColor(config.colors.success)
      .setTimestamp();
    
    // Add building details
    if (building.type === "generator") {
      successEmbed.addFields({
        name: "Produces",
        value: building.produces?.join(", ") || "Nothing",
        inline: true,
      });
      if (building.productionRate) {
        successEmbed.addFields({
          name: "Production Rate",
          value: `${building.productionRate} per second`,
          inline: true,
        });
      }
    } else if (building.type === "booster") {
      successEmbed.addFields({
        name: "Boosts",
        value: building.boosts?.join(", ") || "Nothing",
        inline: true,
      });
      if (building.boostPercentage) {
        successEmbed.addFields({
          name: "Boost Percentage",
          value: `${building.boostPercentage}%`,
          inline: true,
        });
      }
    }
    
await buttonInteraction.editReply({
      embeds: [successEmbed],
      components: []
    });
  }, { message });
}

export const options: CommandOptions = {
  botPermissions: ["SendMessages"],
  devOnly: false,
  deleted: false,
};
