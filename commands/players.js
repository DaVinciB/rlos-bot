const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('View all signed up players'),

  async execute(interaction) {

    let players = {};

    try {
      players = JSON.parse(
        fs.readFileSync('./data/players.json')
      );
    } catch (err) {
      console.error(err);

      return interaction.reply(
        '❌ Error reading player data.'
      );
    }

    const playerList = Object.values(players);

    if (playerList.length === 0) {
      return interaction.reply(
        'No players signed up yet.'
      );
    }

    const formatted = playerList
      .map(
        player =>
          `🎮 ${player.username} — ${player.mmr} MMR`
      )
      .join('\n');

    await interaction.reply(
      `📋 **Signed Up Players**\n\n${formatted}`
    );
  },
};
