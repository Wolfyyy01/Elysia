import { type SlashCommandProps, type CommandOptions, ButtonKit } from "commandkit";
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  SlashCommandBuilder,
} from "discord.js";
import config from "../../utils/config";
import { StartButton } from "../../assets/buttons";
import { StartModal } from "../../assets/modals";

export const data = new SlashCommandBuilder()
  .setName("start")
  .setDescription(
    "Begin your adventure! Set up your profile and receive a lootbox with random starting resources."
  );

export async function run({ interaction, client, handler }: SlashCommandProps) {
  const boxImage = new AttachmentBuilder("./src/assets/images/startedBox.png", {
    name: "startedBox.png",
  });
  const beginEmbed = new EmbedBuilder()
    .setTitle("Begin your adventure!")
    .setDescription(
      'Set up your profile pressing the "Start" button and receive a lootbox with random starting resources.'
    )
    .setColor(config.colors.primary)
    .setFooter({ text: "Made with 💜 by _wolfy01" })
    .setTimestamp()
    .setThumbnail(`attachment://${boxImage.name}`);

    const StartButton1 = new ButtonKit()
    .setCustomId("start1")
    .setLabel("Start")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder<ButtonKit>().addComponents(StartButton1);

  const message = await interaction.reply({
    embeds: [beginEmbed],
    files: [boxImage],
    components: [row as ActionRowBuilder<ButtonKit>],
    flags: ["Ephemeral"],
    fetchReply: true,
  });

  StartButton1.onClick((buttonInteraction: ButtonInteraction) => {
    console.log('test')
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
