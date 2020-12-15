const axios = require('axios');
require('dotenv').config({
    path: '../.env',
});
const Utils = require('../util/util');


module.exports = {
    name: 'covid',
    cooldown: 5,
    description: 'Get Information about Covid situation.',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(
                `You didn't provide any country, ${message.author}!`
            );
        }


        const country = args.toString().replace(/,/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        getInfo(message, country);



    },
};


const getInfo = async (message, country) => {

    try {
        const response = await axios.get(process.env.COVID_API + country)

        if (response.status !== 200 || response.data.All == null) {

            return message.channel.send('Sorry');

        }

        return message.channel.send(covidResponse(response.data));

    } catch (error) {
        return message.channel.send(
            `Something wrong.please try again. ${message.author}`
        );
    }

};


const covidResponse = (data) => {

    const exampleEmbed = {
        color: Utils.generateColor(),
        title: data.All.country,
        author: {
            name: 'COVID-19 Situation Report',
            icon_url: 'https://i.imgur.com/7XqMOIx.png',
            url: 'https://www.who.int/',
        },
        description: 'Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.',
        thumbnail: {
            url: 'https://i.imgur.com/7XqMOIx.png',
        },
        fields: [

            {
                name: 'Total Confirmed Cases',
                value: data.All.confirmed,
                inline: true,
            },
            {
                name: 'Recovered & Discharged',
                value: data.All.recovered,
                inline: true,
            },
            {
                name: 'Deaths',
                value: data.All.deaths,
                inline: true,
            },
        ],

        timestamp: new Date()
    };

    return ({
        embed: exampleEmbed
    });
};