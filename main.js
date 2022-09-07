
// Require the necessary discord.js classes
const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

// Create a new client-BOT instance
const client = new Client({ 
	intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.MessageContent,
] });

// Login to Discord with your client's token
client.login(token).then(() => {
    client.user.setPresence({ activities: [{ name: 'sing of crows', type: 'LISTENING' }], status: 'online' });
    client.user.setStatus('dnd');
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Welcome! You're now ${client.user.tag} On Fire 🔥!`);
});

client.on('guildMemberAdd', (member) => {
    const channelId = 'CHANNEL_ID'; // The Channel ID you just copied
    const welcomeMessage = `Hey <@${member.id}>! Welcome to my server!`;
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
})

client.on('guildMemberAdd', (member) => {
    const channelId = 'CHANNEL_ID';
    const welcomeMessage = `Hey <@${member.id}>! Welcome to my server! \cmds See commands list by typing: $listCommands`;
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});

client.on('messageCreate', (message) => {
	// if (message.author.client) {
	// 	return;
	// }
	if(message.content.toLowerCase().includes('!saludos') || message.content.toLowerCase().includes('puerta negra')){
		const cheersMessage = `El lobo aulla🐺!🌀Saludos viajerx de las Sombras🌀 ${message.author}`; 
        message.channel.send(cheersMessage);
    }
    else if(message.content.toLowerCase().includes('cancer') || message.content.toLowerCase().includes('pudding')){
        message.channel.send('Such language is prohibited!');
    }
	else if(message.content.toLowerCase().includes('$socials') || message.content.toLowerCase().includes('pudding')){
        const socialsGit = 'https://github.com/Aodel';
		const socialsLinkedin = 'https://www.linkedin.com/in/abel-oliveras-delso-554208139/';
		const socialsTwitter = 'https://twitter.com/el_Sombraxs';
		message.channel.send(socialsGit);
		message.channel.send(socialsLinkedin);
		message.channel.send(socialsTwitter);
    }

	// Func gets random number using Math.floor/random
	function getRandomNumber(min, max){
		return Math.floor(Math.random() * (max-min) + min);
	}

	if (message.content == '$listCommands') {
        const exampleEmbed = new MessageEmbed()
            .setColor('#ffd046')
            .setTitle('Server Commands')
            .setDescription('Here you can see the list of the commands used on the server: ')
            .addFields(
                { name: "`$like`", value: 'Likes the current message' },
                { name: "`$dislike`", value: 'Dislikes the current message'},
                { name: "`$random`", value: 'Returns a random number'},
            )
        message.channel.send({embeds: [exampleEmbed]})
    }
	
    else if (message.content == '$like') {
        message.react('👍');
    }

    else if (message.content == '$dislike') {
        message.react('👎');
    }

	//React emoji & Call "Dados Game" Function
    else if(message.content == '$dados'){
        message.react('✅');
        let randomNumber = getRandomNumber(0, 100);
        message.reply(`Your random number is ${randomNumber}.`)
    }
});