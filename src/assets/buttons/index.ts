import { ButtonKit } from "commandkit";
import { ButtonStyle } from "discord.js";

const StartButton = new ButtonKit()
    .setCustomId("start")
    .setLabel("Start")
    .setStyle(ButtonStyle.Primary);

const ClaimButton = new ButtonKit()
   .setCustomId("claim")
   .setLabel("Claim")
   .setStyle(ButtonStyle.Success);

const ConfirmButton = new ButtonKit()
    .setCustomId("confirm")
    .setLabel("Confirm")
    .setStyle(ButtonStyle.Success);


export { StartButton, ClaimButton, ConfirmButton}