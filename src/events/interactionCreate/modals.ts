import type { ButtonBuilder, Client, ModalSubmitInteraction } from "discord.js";
import type { CommandKit } from "commandkit";
import { createUser } from "../../utils/functions/getUserData";
import { ActionRowBuilder, ButtonInteraction, EmbedBuilder } from "discord.js";
import config from "../../utils/config";
import { ClaimButton } from "../../assets/buttons";
import { generateLootbox } from "../../utils/functions/lottbox";
import { saveResources } from "../../utils/functions/resources";
import type { ResourceInput } from "../../types";

export default async function (
  interaction: ModalSubmitInteraction,
  client: Client<true>,
  handler: CommandKit
) {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId !== "startModal") return;

  // Get username from modal input
  const username = interaction.fields.getTextInputValue("username");

  // Defer reply to allow time for database operations
  await interaction.deferReply({ flags: ["Ephemeral"] });

  try {
    // Create user in database
    const userData = await createUser(interaction.user.id, username);

    if (!userData) {
      return await interaction.editReply({
        content: "Failed to create your profile. Please try again later.",
      });
    }

    // Create success embed
    const successEmbed = new EmbedBuilder()
      .setTitle("Profile Created!")
      .setDescription(
        `Welcome to the world of Elysia, **${username}**!\nYour journey begins in the **${userData.current_era}** era.\n\n🎁 Claim your first reward by pressing the button below.`
      )
      .setColor(config.colors.success)
      .setFooter({ text: "Made with 💜 by _wolfy01" })
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      ClaimButton
    );

    const message = await interaction.editReply({
      embeds: [successEmbed],
      components: [row],
    });

    ClaimButton.onClick(
      async (buttonInteraction) => {
        const box = await generateLootbox("starter");
        const boxEmbed = new EmbedBuilder()
          .setTitle("Lootbox")
          .setDescription(
            `You pried open a mysterious **Starter LootBox** and discovered:`
          )
          .setColor(config.colors.primary);

        saveResources(
          userData.id,
          box.filter((item) => item.name !== undefined) as ResourceInput[]
        );

        box.forEach((item) => {
          boxEmbed.addFields({
            name: String(item.name),
            value: String(item.amount),
          });
        });

        buttonInteraction.reply({ embeds: [boxEmbed], flags: ["Ephemeral"] });
      },
      { message }
    );
  } catch (error) {
    console.error("Error in modal submission handler:", error);
    await interaction.editReply({
      content:
        "Couldn't create your profile. You might already have an account.",
    });
  }
}
