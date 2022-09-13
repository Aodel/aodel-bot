// Func gets random number using Math.floor/random

export function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
} 

 //Ping Pong GAME now Working

 export function getPingWinner(){

        if( uscore < botscore ){

            message.reply( "So............." +
            `\n ${message.author}🅾️ you LOSE  😱  this time ❌!`);
        }
    
        else if (uscore > botscore){
            
            message.reply("So............." +
            `\n ${message.author}✅ you WIN  🌟  this time 🎉!`);
        }
    }
