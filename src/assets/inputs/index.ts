import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

const UsernameInput = new ActionRowBuilder<TextInputBuilder>().addComponents(
  new TextInputBuilder()
    .setCustomId("username")
    .setLabel("Username")
    .setStyle(TextInputStyle.Short)
);

export { UsernameInput };
