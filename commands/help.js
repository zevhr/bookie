const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { debug } = require('../config.json');
const logger = require('../modules/logger');

module.exports = {
    name: 'help',
    info: {
        "description": "Need help? You've come to the right place!",
        "usage": "/help [category]",
    },
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Need help? You've come to the right place!")
        .addStringOption(option => 
            option.setName('category')
                .setDescription("What category do you need help with?")
                .setRequired(true)
                .addChoice("Ping", "ping")
            ),
        async execute(interaction, args, author) {
            try {
                const cmd = require(`./${args[0]}.js`);

                const helpEmbed = new MessageEmbed()
                .setAuthor({ name: "BookieBot" })
                .setTitle(cmd.name)
                .setDescription(cmd.info.description)
                .addFields(
                    { name: "Usage", value: cmd.info.usage }
                )

                return await interaction.reply({ embeds: [helpEmbed] });

            } catch (err) {
                if (debug) logger.debug("Bot tried to fetch " + args[0] + ".js from the server, but failed.")
                return await interaction.reply({ content: "Sorry, this interaction failed! Please join the support Discord server here.", ephemeral: true})
            }
        }
}