const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('divisionteams')
    .setDescription('Generate balanced teams by division')

    .addStringOption(option =>
      option
        .setName('division')
        .setDescription('Choose division')
        .setRequired(true)

        .addChoices(
          { name: 'Elite', value: 'elite' },
          { name: 'Contender', value: 'contender' }
        )
    ),

  async execute(interaction) {

    const division =
      interaction.options.getString('division');

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

    let playerList = Object.values(players);

    // Filter division
    if (division === 'elite') {

      playerList = playerList.filter(
        player => player.mmr >= 1190
      );

    } else if (division === 'contender') {

      playerList = playerList.filter(
        player => player.mmr <= 1189
      );
    }

    if (playerList.length < 2) {
      return interaction.reply(
        `❌ Not enough players in ${division} division.`
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

    // Calculate totals
    const total1 =
      team1.reduce((sum, p) => sum + p.mmr, 0);

    const total2 =
      team2.reduce((sum, p) => sum + p.mmr, 0);

    // Format teams
    const formatTeam = team =>
      team
        .map(
          p =>
            `🎮 ${p.username} (${p.mmr})`
        )
        .join('\n');

    await interaction.reply(

`🏆 ${division.toUpperCase()} Division Teams

━━━━━━━━━━━━━━

🔥 Team 1 — ${total1} MMR

${formatTeam(team1)}

━━━━━━━━━━━━━━

⚡ Team 2 — ${total2} MMR

${formatTeam(team2)}`
    );
  },
};
