const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('teams')
    .setDescription('Balanced teams'),

  async execute(interaction) {
    let players = Object.values(JSON.parse(fs.readFileSync('./data/players.json')));

    players.sort((a, b) => b.mmr - a.mmr);

    let team1 = [], team2 = [];

    players.forEach((p, i) => {
      i % 2 === 0 ? team1.push(p) : team2.push(p);
    });

    const format = t => t.map(p => `${p.name} (${p.mmr})`).join('\n');

    await interaction.reply(
      `🏆 Team 1:\n${format(team1)}\n\n🔥 Team 2:\n${format(team2)}`
    );
  }
};
