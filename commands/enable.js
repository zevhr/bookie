const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = require('../modules/logger');
const { debug } = require('../config.json');
const database = require('../modules/database');

module.exports = {
    name: 'enable',
    info: {
        "description": "Enables guild modules. Administrator role is required for this.",
        "usage": "/enable [module]"
    },
    data: new SlashCommandBuilder()
        .setName("enable")
        .setDescription("Enables guild modules. Administrator role is required for this.")
        .addStringOption(option => 
            option.setName("module")
                .setDescription("The module you'd like to enable")
                .setRequired(true)
                // .addChoice("Plex", "plex")
                .addChoice("Anilist", "anilist")),
    async execute(interaction, args, author) {
        const bookieModule = args[0];

        if(bookieModule == "plex") {
            if(database.enableModule("plex", interaction.member.guild.id)) {
                return await interaction.reply({ "content": "Successfully enabled the `Plex` module. You can disable this at any time via **/disable**.", ephemeral: true})
            }
        } else if (bookieModule == "anilist") {
            if(database.enableModule("anilist", interaction.member.guild.id)) {
                return await interaction.reply({ "content": "Successfully enabled the `Anilist` module. You can disable this at any time via **/disable**.", ephemeral: true})
            }
        } 

    }
}