const axios = require('axios');
require('dotenv').config({
    path: '../.env',
});
const Utils = require('../util/util');

module.exports = {
    name: 'gitrepo',
    cooldown: 5,
    description: 'Get Information about github repositories.',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);

        }
        getREpo(message, args)


    }
};

const getREpo = async (message, args) => {
    try {
        const response = await axios.get(process.env.GITHUB_API + 'repos/' + args[0]);
        if (response.status == 200) {

            return message.channel.send(createEmbed(response));
        };


    } catch (error) {
        return message.channel.send(
            `Repository not found.try another repository ${message.author}`
        );
    }

};



const createEmbed = (response) => {

    const data = response.data;

    const repoEmbed = {
        color: Utils.generateColor(),
        title: data.name,
        url: data.html_url,

        description: data.description ? data.description : ``,
        thumbnail: {
            url: data.owner.avatar_url,
        },
        fields: [{
                name: ' Repository Size',
                value: Utils.repoSize(data.size),
                inline: true,

            },
            {
                name: 'Language',
                value: data.language ? data.language : 'none',
                inline: true,
            },
            {
                name: 'Forks',
                value: data.forks,
                inline: true,
            },
            {
                name: 'Stars',
                value: data.stargazers_count,
                inline: true,
            },
            {
                name: 'Watching',
                value: data.subscribers_count,
                inline: true,
            },
            {
                name: 'Open issues Count',
                value: data.open_issues_count,
                inline: true,
            },
        ],
        timestamp: new Date()
    };

    return ({
        embed: repoEmbed
    });


};