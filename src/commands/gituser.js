const Discord = require('discord.js');

const axios = require('axios');
require('dotenv').config({ path: '../.env' });
module.exports = {
    name: 'gituser',
   // cooldown: 5,
    description: 'Get Information about github profiles.',
    execute(message, args) {

        //var res = args.split(" ");
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        getUser(message, args);

      //  message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    }
};


const generateColor = () =>{
    
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;

}

const getUser = async (message, args) => {

    try {
        const response = await axios.get(process.env.GITHUB_API+'users/'+args[0]);
       // console.log(response);
            if (response.status==200) {
            
                return message.channel.send(createEmbed(response));
                
            }

    } catch (error) {
        return message.channel.send(`User not found.try another username ${message.author}`);
    }


}

const createEmbed = (response) =>{
    const data=response.data;
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor(generateColor())
	.setTitle(data.login)
	.setURL(data.html_url)
    .setDescription(data.bio)
	.setImage(data.avatar_url)
	.addFields(
	//	{ name: '\u200B', value: '\u200B' },
		{ name: 'public_repos', value: data.public_repos, inline: true },
        { name: 'followers', value: data.followers, inline: true },
        {name:'following',value:data.following,inline:true}
	)
	.setTimestamp()

//exampleEmbed
            return exampleEmbed;

}
