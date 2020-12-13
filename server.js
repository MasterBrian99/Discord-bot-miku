const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config({path:'./src/.env'});
client.login(process.env.BOT_TOKEN);
const fs = require('fs');
client.commands = new Discord.Collection();
const {prefix,token} =require('./config.json')
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();


for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);


	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	cooldownCount(command,message);

	try {
		command.execute(message, args);	
		
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	// do the same for the rest of the commands...
});


const cooldownCount =(command,message)=>{
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}