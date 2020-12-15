const axios = require('axios');
require('dotenv').config({
    path: '../.env',
});
const Handlers = require('../handlers/handle');


module.exports = {
    name: 'covid',
    cooldown: 5,
    description: 'Get Information about github profiles.',
    execute(message, args) {
        //var res = args.split(' ');
        if (!args.length) {
            return message.channel.send(
                `You didn't provide any arguments, ${message.author}!`
            );
        }
        //  console.log(Object.values(args));
        //    console.log(args.toString().replace(/,/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));

        const country = args.toString().replace(/,/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        getInfo(message, country);



        //charAt(0).toUpperCase() + string.slice(1).toLowerCase()


        //getUser(message, args);

        //  message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};


const getInfo = async (message, country) => {

    try {
        const response = await axios.get(process.env.COVID_API + country)
        //    console.log(response.data);

        if (response.status !== 200 || response.data.All == null) {

            return message.channel.send('Sorry');

            //       console.log('Sorry');
        }
        //return message.channel.send('good');

        // console.log('good');
        return message.channel.send(covidResponse(response.data));

    } catch (error) {
        console.log(error);
    }

};


const covidResponse = (data) => {

    const exampleEmbed = {
        color: Handlers.generateColor(),
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

/**
 * My icons collection
 */