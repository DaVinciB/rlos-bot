const { SlashCommandBuilder } = require('discord.js');

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

    await interaction.reply(
      `${interaction.user.username} signed up with ${mmr} MMR`
    );
  },
};
