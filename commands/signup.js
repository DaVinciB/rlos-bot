const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('signup')
    .setDescription('Sign up for RLOS')
    .addIntegerOption(option =>
      option
        .setName('mmr')
        .setDescription('Your MMR')
        .setRequired(true)
    ),

  async execute(interaction) {

    const mmr = interaction.options.getInteger('mmr');
    const user = interaction.user;

    let players = {};

    try {
      players = JSON.parse(
        fs.readFileSync('./data/players.json')
      );
    } catch (err) {
      console.error(err);
    }

    players[user.id] = {
      username: user.username,
      mmr: mmr,
    };

    fs.writeFileSync(
      './data/players.json',
      JSON.stringify(players, null, 2)
    );

    await interaction.reply(
      `✅ ${user.username} signed up with ${mmr} MMR`
    );
  },
};
