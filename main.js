
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Ready! On Fire ${client.user.tag}`);
});

client.on('message',  message => {
	//Reciving the message
	console.log(message);
  });

// Login to Discord with your client's token
client.login(token);






// const commands = [
//   {
//     name: 'ping',
//     description: 'Replies with Pong!',
//   },
// ];

// const rest = new REST({ version: '10' }).setToken('token');

// (async () => {
//   try {
//     console.log('Started refreshing application (/) commands.');

//     await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

//     console.log('Successfully reloaded application (/) commands.');
//   } catch (error) {
//     console.error(error);
//   }
// })();