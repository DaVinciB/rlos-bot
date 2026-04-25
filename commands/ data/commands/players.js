const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('View players'),

  async execute(interaction) {
    let players = Object.values(JSON.parse(fs.readFileSync('./data/players.json')));

    if (!players.length) return interaction.reply('No players yet');

    const list = players.map(p => `${p.name} - ${p.mmr}`).join('\n');

    await interaction.reply(list);
  }
};
