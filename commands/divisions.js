const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('divisions')
    .setDescription('View RLOS divisions'),

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
        '❌ No players signed up yet.'
      );
    }

    // Separate divisions
    const elite = playerList.filter(
      player => player.mmr >= 1190
    );

    const contender = playerList.filter(
      player => player.mmr <= 1189
    );

    // Sort highest MMR first
    elite.sort((a, b) => b.mmr - a.mmr);
    contender.sort((a, b) => b.mmr - a.mmr);

    // Format output
    const formatDivision = division => {

      if (division.length === 0) {
        return 'No players';
      }

      return division
        .map(
          player =>
            `🎮 ${player.username} (${player.mmr})`
        )
        .join('\n');
    };

    await interaction.reply(

`🏆 **Elite Division** (1190+)

${formatDivision(elite)}

⚔️ **Contender Division** (1189 and below)

${formatDivision(contender)}`
    );
  },
};
