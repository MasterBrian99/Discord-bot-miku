const axios = require('axios');
require('dotenv').config({
    path: '../.env',
});
const Utils = require('../util/util');


module.exports = {
    name: 'quote',
    cooldown: 5,
    description: 'Get random quote',
    execute(message) {

        getQuote(message);



    },
};





const getQuote = async (message) => {
    try {
        const response = await axios.get(process.env.QUOTE_API);
        if (response.status == 200) {

            return message.channel.send(createEmbed(response.data));
        };


    } catch (error) {
        return message.channel.send(
            `Something wrong.please try again. ${message.author}`
        );
    }

}


const createEmbed = (data) => {

    const embed = {
        color: Utils.generateColor(),
        author: {
            name: data[0].a
        },
        description: data[0].q,

        timestamp: new Date()
    };
    return ({
        embed: embed
    });


}