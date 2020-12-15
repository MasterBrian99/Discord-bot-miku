//https://official-joke-api.appspot.com/jokes/random


const oneLinerJoke = require('one-liner-joke');
const Utils = require('../util/util');


module.exports = {
    name: 'joke',
    cooldown: 5,
    description: 'Get random joke',
    execute(message) {

        try {

            const getRandomJoke = oneLinerJoke.getRandomJoke();
            console.log(getRandomJoke)
            return message.channel.send(getJoke(getRandomJoke));



        } catch (error) {
            console.log(error);


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