const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View standings'),

  async execute(interaction) {
    let leaderboard = JSON.parse(fs.readFileSync('./data/leaderboard.json'));

    if (!Object.keys(leaderboard).length)
      return interaction.reply('No standings yet');

    const sorted = Object.entries(leaderboard)
      .sort((a, b) => b[1] - a[1])
      .map(([name, score]) => `${name}: ${score}`)
      .join('\n');

    await interaction.reply(sorted);
  }
};
