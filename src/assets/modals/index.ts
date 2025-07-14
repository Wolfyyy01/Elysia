import { ActionRowBuilder, ModalBuilder } from "discord.js";
import { UsernameInput } from "../inputs";

const StartModal = new ModalBuilder()
  .setCustomId("startModal")
  .setTitle("Start a game")
  .addComponents(UsernameInput);

export { StartModal };
