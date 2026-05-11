const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('teams')
    .setDescription('Generate balanced teams'),

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

    if (playerList.length < 2) {
      return interaction.reply(
        '❌ Not enough players signed up.'
      );
    }

    // Sort highest MMR first
    playerList.sort((a, b) => b.mmr - a.mmr);

    let team1 = [];
    let team2 = [];

    // Alternate players
    playerList.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });

    // Team totals
    const total1 = team1.reduce((sum, p) => sum + p.mmr, 0);
    const total2 = team2.reduce((sum, p) => sum + p.mmr, 0);

    // Format team output
    const formatTeam = team =>
      team
        .map(p => `🎮 ${p.username} (${p.mmr})`)
        .join('\n');

    await interaction.reply(

`🏆 **Team 1** — ${total1} MMR

${formatTeam(team1)}

🔥 **Team 2** — ${total2} MMR

${formatTeam(team2)}`
    );
  },
};
