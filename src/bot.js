require('dotenv').config();

const { Client, Channel } = require('discord.js');
const can = require('canvas');
const Discord = require('discord.js');
const fs = require('fs');
const Flashcards = require('./commands/FlashcardGame');

const client = new Client();

const PREFIX = "$";

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}



/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
var roundRect = function(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
  }


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // const pic = can.createCanvas(600,375);
    // const ctx = pic.getContext('2d');
    // ctx.fillStyle = 'white';
    // roundRect(ctx,0,0,600,375,20, true);
    // ctx.font="50px Meiryo";
    // ctx.textAlign="center"; 
    // ctx.textBaseline = "middle";
    // ctx.fillStyle = "#000000";
    // ctx.fillText("よろしくおねがいします",300,375/2);

    // const attachment = new Discord.MessageAttachment(pic.toBuffer(), 'welcome-image.png');
    // const chan = client.channels.cache.get('754920490933420045');
    // const embed = new Discord.MessageEmbed()
    //     .attachFiles(attachment)
    //     .setImage('attachment://welcome-image.png');
    // chan.send(embed);

  });

  


client.on('message', (message) => {
    console.log(`${message.author.tag} sent ${message.content}`);
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        
        

        console.log("Command: " + CMD_NAME);

        let userID = message.author.id;

        if (CMD_NAME === 'slap'){
            var slappee = args[0];
            if(args.length > 2){
                for (let index = 1; index < args.length - 1; index++) slappee += ', ' + args[index];
                slappee += ', and ' + args[args.length-1];
            } else if(args.length == 2){
                slappee += ' and ' + args[1];
                console.log("ACTIVATED")
            }
            
            message.channel.send(`${message.author} slapped ${slappee}! :0`);
        }
        else if (CMD_NAME === 'flashcard' || CMD_NAME === 'fc') {
            client.commands.get('flashcards').execute(message,args);
        } 
        
        else if (CMD_NAME === 'change') {
            if(user.has(userID)){
                let Game = user.get(userID);
                let sec = '';
                if (args[0].length != 0){
                    args.forEach(arg => {
                        sec += arg + " ";
                    });
                    sec.length -= 1;

                    Game.cng(sec);
                    message.channel.send(`${message.author}'s special text has been created!\nYour :sparkles:special text:sparkles: is now \`${Game.show()}\`!`)
                } 
                else {
                    message.channel.send(`To change your text place some text after $change`);
                }
            } 
            
            
            else {
                message.channel.send(`${message.author} you dont have a game running have a game running!`)
            }
            
        }
        
        
        
        else {
            console.log(eval(CMD_NAME));
        }
            
    }
});


client.login(process.env.BOT_TOKEN);