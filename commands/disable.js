const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const { debug } = require('../config.json');
const database = require('../modules/database');

module.exports = {
    name: 'disable',
    info: {
        "description": "Disable guild modules. Administrator role is required for this.",
        "usage": "/disable [module]"
    },
    data: new SlashCommandBuilder()
        .setName("disable")
        .setDescription("Disable guild modules. Administrator role is required for this.")
        .addStringOption(option => 
            option.setName("module")
                .setDescription("The module you'd like to disable")
                .setRequired(true)
                // .addChoice("Plex", "plex")
                .addChoice("Anilist", "anilist")),
    async execute(interaction, args, author) {
        const bookieModule = args[0];

        if(bookieModule == "plex") {
            if(database.disableModule("plex", interaction.member.guild.id)) {
                return await interaction.reply({ "content": "Successfully disabled the `Plex` module. You can reenable this at any time via **/enable**.", ephemeral: true})
            } else {
                return await interaction.reply({ "content": "This module is already disabled.", ephemeral: true })
            }
        } else if (bookieModule == "anilist") {
            if(database.disableModule("anilist", interaction.member.guild.id)) {
                return await interaction.reply({ "content": "Successfully disabled the `Anilist` module. You can reenable this at any time via **/enable**.", ephemeral: true})
            } else {
                return await interaction.reply({ "content": "This module is already disabled.", ephemeral: true })
            }
        } 

    }
}