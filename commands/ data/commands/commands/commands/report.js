const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report match')
    .addStringOption(option =>
      option.setName('result').setDescription('Example: Team1 3-1').setRequired(true)
    ),

  async execute(interaction) {
    const result = interaction.options.getString('result');

    let matches = JSON.parse(fs.readFileSync('./data/matches.json'));
    matches.push(result);

    fs.writeFileSync('./data/matches.json', JSON.stringify(matches, null, 2));

    await interaction.reply(`Result saved: ${result}`);
  }
};
