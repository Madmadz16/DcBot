// https://youtu.be/HWRwKqIvfWM?t=360

const Discord = require('discord.js');
const token = require('../token.json').token;
const prefix = require('../config.json').prefix;
const client = new Discord.Client();
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('../utils/validate');
const tableConfig = require('../utils/tableconfig')
const { createStream, table } = require('table');
const c = require('ansi-colors')
const commandStatus = [
  [`${c.bold.blue('Commands')}`, `${c.bold.blue('Status')}`, `${c.bold.blue('Aliases')}`]
]
client.commands = new Map();


client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
  console.log('The bot is running in ' + client.guilds.cache.size + ' servers!');

  let stream = createStream(tableConfig);
  let i = 0;
  let fn = setInterval(() => {
    if(i === commandStatus.length) {
      clearInterval(fn);
    } else {
      stream.write(commandStatus[i]);
      i++;
    }
  }, 250)
});

client.on('message', async function(message) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.substring(message.content.indexOf(prefix)+1).split(new RegExp(/\s+/));
  const commandName = args.shift().toLowerCase();

	if(client.commands.get(commandName)) {
		client.commands.get(commandName)(client, message, args);
	} else {
		console.log('command does not exist');
	}
});


(async function registerCommands(dir = 'commands') {

  const files = await fs.readdir(path.join(__dirname, dir));

  for(let file of files) {
    // console.log(file);
    // console.log(file);

    // if(file == 'utils') return;
    const stat = await fs.lstat(path.join(__dirname, dir, file));
    if(stat.isDirectory()) {
      registerCommands(path.join(dir, file));
      /*
      if(file == 'utils') {
        // console.log(file + ' not allowed');
      } else {

        // console.log(file + ' allowed');
      }
      */
    } else {
      if(file.endsWith('.js')) {
        const cmdName = file.substring(0, file.indexOf('.js'));
        try {
          const cmdModule = require(path.join(__dirname, dir, file));

          if(checkCommandModule(cmdName, cmdModule)) {
            if(checkProperties(cmdName, cmdModule)) {
              let { aliases } = cmdModule;
              client.commands.set(cmdName, cmdModule.run);
              if(aliases.length !== 0) {
                aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                commandStatus.push(
                  [`${cmdName}`, `${c.black.bgGreen('Success')}`, `${c.black.bgGreen(aliases)}`]
                );
              } else {
                commandStatus.push(
                  [`${cmdName}`, `${c.black.bgGreen('Success')}`, `${c.black.bgYellow('No aliases found')}`]
                );
              }
            }
          }
        } catch (err) {
            console.log(err);
            commandStatus.push(
              [`${cmdName}`, `${c.black.bgRedBright('Failed')}`, `${c.black.bgRedBright('Failed')}`]
            );
        }
      }
    }
  }
})()

client.login(token);
// client.login('NzgwNTA1ODM1NDk0MTc4ODE2.X7wEtA.fy9ssTMv4P7LJFZ26MXGFyNrSGs');

/*
regenerate your token and hide it in later questions in stack overflow
cd "D:\Users\Mads Fredrik Thaulow\Desktop\Coding\MyBots\discord.js\testing\src"

i have started using the table npm for d.js and it stops after 3 rows and no errors comes up. i tried changing columnCount in my table config but then i get a Error: Row cell count does not match the config.columnCount. error
**index.js:** https://srcb.in/1M59z2Kkxx
**tableconfig.js:** https://srcb.in/5w0WIYxbJS

https://srcb.in/C6jpChsPFC
**folder setup:** https://paste.pics/C9KOV
*/
