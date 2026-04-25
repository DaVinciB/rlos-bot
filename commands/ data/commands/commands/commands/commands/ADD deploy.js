const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  require('./commands/signup').data.toJSON(),
  require('./commands/players').data.toJSON(),
  require('./commands/teams').data.toJSON(),
  require('./commands/report').data.toJSON(),
  require('./commands/leaderboard').data.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );
  console.log('Commands deployed');
})();
