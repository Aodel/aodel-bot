import Discord from 'discord.js';

export default async (client, message) => {
    if(message.content.toLowerCase().includes('$ping') || message.content.toLowerCase().includes('$ping pong')){

        function getRandomNumber(min, max){
            return Math.floor(Math.random() * (max-min) + min);
        } 

        let uscore = getRandomNumber(0, 100);
        let botscore = getRandomNumber(0, 100);
    
        async function getPingWinner(){
            try {
                if( uscore < botscore ){
    
                    await message.reply( "So............." +
                     `\n ${message.author}πΎοΈ you LOSE  π±  this time β!`);
                 }
             
                 else if (uscore > botscore){
                     
                     await message.reply("So............." +
                     `\n ${message.author}β you WIN  π  this time π!`);
                 }
            }
            catch(error){

                console.log(error);
            }
        }
    
        message.reply(`  ${message.author} your score is ${uscore}  π₯`);
    
        const pongMessage = `Pong!`;
        message.channel.send(pongMessage);
        message.reply(`${client.user}'s score is ${botscore} π₯`);
    
    }
}
