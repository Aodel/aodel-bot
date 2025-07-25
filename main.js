// Require the necessary
const Discord = require("discord.js");
const {
  Client,
  GatewayIntentBits,
  MessageEmbed,
  DiscordAPIError,
} = require("discord.js");
const { Player, QueryType } = require("discord-player");
const { token } = require("./config/config.json");

// Create a new client-BOT instance
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

/*keepAlive();*/

// Login to Discord with your client's token
client.login(token).then(() => {
  client.user.setPresence({
    activities: [{ name: "sing of crows", type: "LISTENING" }],
    status: "online",
  });
  client.user.setStatus("dnd");
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log(`Welcome ${client.user.tag}! You're now  On Fire 🔥!`);
});

client.commands = new Discord.Collection();

client.on("guildMemberAdd", (member) => {
  const channelId = "CHANNEL_ID"; // The Channel ID you just copied
  const welcomeMessage = `Hey <@${member.id}>! Welcome to the Brotherhood!`;
  member.guild.channels.fetch(channelId).then((channel) => {
    channel.send(welcomeMessage);
  });
});

client.on("messageCreate", (message) => {
  // if (message.author.client) {
  // 	return;
  // }
  if (
    message.content.toLowerCase().includes("!saludos") ||
    message.content.toLowerCase().includes("puerta negra")
  ) {
    // const cheersMessage = `El lobo aulla🐺!🌀Saludos viajerx de las Sombras🌀 ${message.author}`;
    const cheersMessage = `El lobo aulla🐺!🌀Saludos viajerx de las Sombras🌀 ${message.author}`;
    message.channel.send(cheersMessage);
  } else if (
    message.content.toLowerCase().includes("cancer") ||
    message.content.toLowerCase().includes("pudding")
  ) {
    message.channel.send("Such language is prohibited!");
  } else if (
    message.content.toLowerCase().includes("$socials") ||
    message.content.toLowerCase().includes("pudding")
  ) {
    const socialsGit = "https://github.com/Aodel";
    const socialsLinkedin =
      "https://www.linkedin.com/in/abel-oliveras-delso-554208139/";
    const socialsTwitter = "https://twitter.com/el_Sombraxs";
    message.channel.send(socialsGit);
    message.channel.send(socialsLinkedin);
    message.channel.send(socialsTwitter);
  }
  // Func gets random number using Math.floor/random
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Func gets a Winner for the ping pong game
  function getPingWinner(uscore, botscore) {
    try {
      if (uscore < botscore) {
        return `${message.author}🅾️ don't give UP! ❌!`;
      } else if (uscore > botscore) {
        return `${message.author}✅ you shine like a 🌟  this time 🎉!`;
      } else {
        return "It's a tie!";
      }
    } catch (error) {
      console.log(error);
      return "An error occurred while determining the winner.";
    }
  }

  if (message.content == "$listCommands") {
    const exampleEmbed = new MessageEmbed()
      .setColor("#ffd046")
      .setTitle("Server Commands")
      .setDescription(
        "Here you can see the list of the commands used on the server: "
      )
      .addFields(
        { name: "`$like`", value: "Likes the current message" },
        { name: "`$dislike`", value: "Dislikes the current message" },
        { name: "`$dados`", value: "Returns a random number from 1 to 100" },
        {
          name: "`$ping`",
          value:
            "Starts a ping pong roll. Roll a random number for you and you oponent. Later compares both results and give a winner",
        }
      );
    message.channel.send({ embeds: [exampleEmbed] });
  } else if (message.content == "$like") {
    message.react("👍");
  } else if (message.content == "$dislike") {
    message.react("👎");
  }
  //React emoji & Call "Dados Game" Function
  else if (message.content == "$dados") {
    message.react("✅");
    const randomNumber = getRandomNumber(0, 100);
    message.reply(`Your random number is ${randomNumber}.`);
  }

  //Ping Pong GAME
  else if (message.content == "$ping" || message.content == "$ping pong") {
    message.reply(`Vamo a jugá, ehto er PinPon 🔥`);

    // Generate random scores for user and bot
    let uscore = getRandomNumber(0, 100);
    let botscore = getRandomNumber(0, 100);

    const pongMessage = `Pong!`;
    message.channel.send(pongMessage);
    let winnerPing = getPingWinner(uscore, botscore);
    message.reply(`Bot score is ${botscore}  🔥`);
    message.reply(`${message.author} your score is ${uscore}  🔥`);
    message.reply(`And the winner is... ${winnerPing} 🎉`);
  }
});
