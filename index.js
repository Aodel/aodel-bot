const Discord = require('discord.js');
const { Client, GatewayIntentBits, MessageEmbed, DiscordAPIError } = require('discord.js');
const { token } = require('./config/config.json');

const client = new Client({
	intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
    ],
 });
client.login(token).then(() => {
    client.user.setPresence({ activities: [{ name: 'sing of crows', type: 'LISTENING' }], status: 'online' });
    client.user.setStatus('dnd');
});
try { 
client.once('ready', () => {
    console.log(`Welcome! You're now ${client.user.tag} On Fire 🔥!`);
    });
    } catch{
    console.log("Bot Disconected")
    }
