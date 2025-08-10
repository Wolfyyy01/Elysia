import { type SlashCommandProps, type CommandOptions, ButtonKit } from "commandkit";
import {
  ActionRowBuilder,
  ButtonInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import config from "../../utils/config";
import { StartButton } from "../../assets/buttons";
import { StartModal } from "../../assets/modals";
import { boxImage } from "../../assets/images/attachments";

export const data = new SlashCommandBuilder()
  .setName("start")
  .setDescription(
    "Begin your adventure! Set up your profile and receive a lootbox with random starting resources."
  );

export async function run({ interaction, client, handler }: SlashCommandProps) {
  
  const beginEmbed = new EmbedBuilder()
    .setTitle("Begin your adventure!")
    .setDescription(
      'Set up your profile pressing the "Start" button and receive a lootbox with random starting resources.'
    )
    .setColor(config.colors.primary)
    .setFooter({ text: "Made with 💜 by _wolfy01" })
    .setTimestamp()
    .setThumbnail(`attachment://${boxImage.name}`);


  const row = new ActionRowBuilder<ButtonKit>().addComponents(StartButton);

  const message = await interaction.reply({
    embeds: [beginEmbed],
    files: [boxImage],
    components: [row as ActionRowBuilder<ButtonKit>],
    flags: ["Ephemeral"],
    fetchReply: true,
  });

  StartButton.onClick((buttonInteraction: ButtonInteraction) => {
    buttonInteraction.showModal(
      StartModal
    )
  }, {message: message as any})
}

export const options: CommandOptions = {
  botPermissions: ["SendMessages"],
  devOnly: false,
  deleted: false,
};
