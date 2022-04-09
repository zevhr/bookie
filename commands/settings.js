const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('../modules/database');
const logger = require('../modules/logger');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'settings',
    info: {
        "description": "Shows guild settings!",
        "usage": "/settings",
    },
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription("Shows guild settings!"),
    async execute(interaction, args, author) {
        const guild = interaction.member.guild.id;
        const data = await db.getGuild(guild);
        
        const settingsEmbed = new MessageEmbed()
        .setTitle("Guild Settings")
        .setDescription("Want to know what this bot has enabled here? This is the menu to check!")

        if(data.anilistEnabled == 'true') settingsEmbed.addField("Anilist Access?", "Yes")
        else settingsEmbed.addField("Anilist Access?", "No")

        if(data.plexEnabled == 'true') settingsEmbed.addField("Plex Access?", "Yes")
        else settingsEmbed.addField("Plex Access?", "No")

        return await interaction.reply({ embeds: [settingsEmbed] });
    }
}