const GameHandler = require('./GameHandler');
const Discord = require('discord.js');
const wanakana = require('wanakana');
module.exports = {

    name: 'flashcards',
    description: "Flashcards from quizlet!",

    /**
     * 
     * @param {Discord.Message} message 
     * @param {String} args 
     */
    execute(message, args){
        let userID = message.author.id;
        if (!GameHandler.has(userID)) {
            GameHandler.set(userID);
            message.channel.send(`New Game for ${message.author} has been created!`);
        }
        if(args.length == 0){
            var gameList = "";
            let mSet = GameHandler.get(userID).MasterSet
            for (let index = 1; index <= mSet.length; index++) {
                gameList += `${index}.) ${mSet[index-1].title}\n`;
            }
            message.channel.send(`Call some flashcards.\nHere are your options\n${gameList}`);
            
        } 
        else{       // Player is currently playing a game
            
            let currGame = GameHandler.get(userID);
            if (currGame.IsPlaying) {
                //game commands
                let userAns;
                if(args.length > 1) {
                    userAns = args.join(" ");
                } else {
                    userAns = args[0];
                }

                if(wanakana.isHiragana(currGame.correctAns)){
                    userAns = wanakana.toHiragana(userAns);
                }

                let isCorrect = currGame.isRight(userAns)

                if (isCorrect) {
                    message.channel.send('Hai! Good Job!');
                } else {
                    message.channel.send(`Iie! The correct answer is ${currGame.correctAns}\nWe'll... Come back to that one;;`);
                }

                message.channel.send(`Alright, here's youre next card! \nYour word is ${currGame.showCard()}`);

                
            } 
            else {    // Player is choosing a Set.
                let selMax = currGame.MasterSet.length;
                if(between(args[0],1,selMax)){
                    currGame.setDeck(args[0] - 1);

                    message.channel.send(`Hi ${message.author}, Thank you for expirimenting with me!\nYour word is \`${currGame.showCard()}\``);

                }
                else {
                    console.error(`Error: Out of bounds.\n   Arg: ${args[0]}\n   Min: 0\n   Max: ${selMax}`);
                }
            }
        }
    }
}

function between(x, min, max) {
    return x >= min && x <= max;
}