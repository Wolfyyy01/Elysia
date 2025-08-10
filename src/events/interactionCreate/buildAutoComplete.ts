import { AutocompleteInteraction } from 'discord.js';
import { getUserData } from '../../utils/functions/getUserData';
import { buildings } from '../../utils/buildings';

export default async function (interaction: AutocompleteInteraction) {
  if (interaction.commandName !== 'build') return;

  const focusedOption = interaction.options.getFocused(true);
  if (!focusedOption || focusedOption.name !== 'structure') return;

  const userId = interaction.user.id;
  const userData = await getUserData(userId);

  if (!userData) return interaction.respond([]);

  const currentEra = userData.current_era;

  const filtered = buildings
    .filter(b => b.era === Number(currentEra))
    .filter(b => b.name.toLowerCase().includes(focusedOption.value.toLowerCase()))
    .map(b => ({
      name: b.name,
      value: b.id.toString(),
    }))
    .slice(0, 25); // max 25 choices pentru Discord

  await interaction.respond(filtered);
}
