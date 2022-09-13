
    client.on("messageCreate", async (message) => {
		if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    client.on("messageCreate", async (message) => {

		if (message.content === "!deploy" && message.author.id === client.application?.owner?.id) {
        await message.guild.commands.set([
            {
                name: "play",
                description: "Plays a song from youtube",
                options: [
                    {
                        name: "query",
                        type: "STRING",
                        description: "The song you want to play",
                        required: true
                    }
                ]
            },
            {
                name: "skip",
                description: "Skip to the current song"
            },
            {
                name: "queue",
                description: "See the queue"
            },
            {
                name: "stop",
                description: "Stop the player 🛑"
            },
        ]);

        await message.reply("Deployed!");
    }
});
    });
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand() || !interaction.guildId) return;

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        }
    });

    //MuicPlayer Commands
    client.on("interactionCreate", async (interaction) => {
    
            if (interaction.commandName === "!play") {
                // TODO: Implement play command
                await interaction.deferReply();

                const query = interaction.options.get("query");
                const searchResult = await player.search(query,{
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                .catch(()=>{});
                if (!searchResult || !searchResult.tracks.length) 
                return void interaction.followUp({ content: "No results were found !"});
            }
            if (interaction.commandName === "!play"){
                const queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel                    
                });

                try {
                    if (!queue.connection) await queue.connect(interaction.member.voice.channel);
                } catch {
                    void player.deleteQueue(interaction.guildId);
                    return void interaction.followUp({content:"Could not join to your voice channel!😵"})
                }
                await interaction.followUp({content:`⏳|Loading your ${searchResult.playlist ? "playlist" : "track"}...⏳` });
                searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
                if (!queue.playing) await queue.play();
            }
    });