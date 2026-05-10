const { REST, Routes } = require('discord.js');
require('dotenv').config();

const signupCommand = require('./commands/signup');

const commands = [
  signupCommand.data.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Deploying commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Commands deployed successfully.');
  } catch (error) {
    console.error(error);
  }
})();
