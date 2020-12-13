const Github=require('../api/github');

/**
 * 
 * -miku gituser userName
 * -miku gitrepo repoName
 * 
 */



module.exports = {
	name: 'gituser',
//	cooldown: 5,
	description: 'Information about the arguments provided.',
	execute(message, args) {

		//var res = args.split(" ");

		if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
/*
		if (args[0]==='gituser') {

				console.log('gituser');
	
			} else if(args[0]==='gitrepo'){

			console.log('gitrepo');

		}

*/
		console.log(args[0]);


		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};