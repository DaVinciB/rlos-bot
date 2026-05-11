const { REST, Routes } = require('discord.js');
require('dotenv').config();

const signupCommand = require('./commands/signup');
const playersCommand = require('./commands/players');
const teamsCommand = require('./commands/teams');

const commands = [
  signupCommand.data.toJSON(),
  playersCommand.data.toJSON(),
  teamsCommand.data.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Deploying guild commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.SERVER_ID
      ),
      { body: commands },
    );

    console.log('Guild commands deployed successfully.');
  } catch (error) {
    console.error(error);
  }
})();
