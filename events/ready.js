const logger = require("../modules/logger");
const { MessageEmbed } = require('discord.js');
const { env } = require('../config.json');
const wh = require('../modules/webhook');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity("/help", { type: 'PLAYING' });

        logger.info("BookieBot has started as " + client.user.tag + " on environment " + env);

        const startEmbed = new MessageEmbed()
        .setColor(`#2c1178`)
        .setTitle(`BookieBot has started!`)
        .setDescription(`Logged in as **${client.user.tag}.**\nI'm currently in **${client.guilds.cache.size} guilds!**\nEnvironment: **${env}**`)

        await wh({
            username: "BookieBot - Power",
            embeds: startEmbed
        });
    }
}