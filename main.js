// Require the necessary discord.js classes
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
        { name: "`$dados`", value: "Returns a random number from 1 to 100" }
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

   /* // mPlayer 
  // mPlayer HandleErrors❌
  player.on("error", (queue, error) => {
    console.log(
      `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
    );
  });
  player.on("connectionError", (queue, error) => {
    console.log(
      `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
    );
  });

  // mPlayer/queue status

  player.on("songStart", (queue, track) => {
    queue.metadata.send(
      `🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`
    );
  });

  player.on("songAdd", (queue, track) => {
    queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
  });
  player.on("botDisconnect", (queue) => {
    queue.metadata.send(
      "❌ | I was manually disconnected from the voice channel, clearing queue!"
    );
  });
  player.on("channelEmpty", (queue) => {
    queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
  });
  player.on("queueEnd", (queue) => {
    queue.metadata.send("⚠️ | Queue finished!");
  });

  //Deploy music Player

  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    client.on("messageCreate", async (message) => {
      if (
        message.content === "!deploy" &&
        message.author.id === client.application?.owner?.id
      ) {
        await message.guild.commands.set([
          {
            name: "play",
            description: "Plays a song from youtube",
            options: [
              {
                name: "query",
                type: "STRING",
                description: "The song you want to play",
                required: true,
              },
            ],
          },
          {
            name: "skip",
            description: "Skip to the current song",
          },
          {
            name: "queue",
            description: "See the queue",
          },
          {
            name: "stop",
            description: "Stop the player 🛑",
          },
        ]);

        await message.reply("Deployed!");
      }
    });
  });
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;

    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      return void interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: "You are not in my voice channel!",
        ephemeral: true,
      });
    }
  });

  //MuicPlayer Commands
  client.on("interactionCreate", async (interaction) => {
    if (interaction.commandName === "!play") {
      // TODO: Implement play command
      await interaction.deferReply();

      const query = interaction.options.get("query");
      const searchResult = await player
        .search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});
      if (!searchResult || !searchResult.tracks.length)
        return void interaction.followUp({
          content: "No results were found !",
        });
    }
    if (interaction.commandName === "!play") {
      const queue = await player.createQueue(interaction.guild, {
        metadata: interaction.channel,
      });

      try {
        if (!queue.connection)
          await queue.connect(interaction.member.voice.channel);
      } catch {
        void player.deleteQueue(interaction.guildId);
        return void interaction.followUp({
          content: "Could not join to your voice channel!😵",
        });
      }
      await interaction.followUp({
        content: `⏳|Loading your ${
          searchResult.playlist ? "playlist" : "track"
        }...⏳`,
      });
      searchResult.playlist
        ? queue.addTracks(searchResult.tracks)
        : queue.addTrack(searchResult.tracks[0]);
      if (!queue.playing) await queue.play();
    }
  });*/
});
