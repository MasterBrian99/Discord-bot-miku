const oneLinerJoke = require('one-liner-joke');
const Utils = require('../util/util');


module.exports = {
    name: 'joke',
    cooldown: 5,
    description: 'Get random joke',
    execute(message) {

        try {

            const getRandomJoke = oneLinerJoke.getRandomJoke();
            return message.channel.send(getJoke(getRandomJoke));



        } catch (error) {
            return message.channel.send(
                `Something wrong.please try again. ${message.author}`
            );

        }

    },
};

const getJoke = (joke) => {
    const embed = {
        color: Utils.generateColor(),
        description: joke.body,
        timestamp: new Date()
    };

    return ({
        embed: embed
    });



}