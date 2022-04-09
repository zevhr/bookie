const { MessageEmbed } = require('discord.js');
const wh = require('../modules/webhook');
const { debug } = require('../config.json');
const logger = require('../modules/logger');

module.exports = {
    name: 'interactionCreate',
    on: true,
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        try {
            var args = [];
            await Object.keys(interaction.options._hoistedOptions).forEach(function(key) {
                args.push(interaction.options._hoistedOptions[key].value);
            });

            if(debug) logger.debug(`Args loaded for command ${interaction.commandName}; ${args}`);

            command.execute(interaction, args, interaction.user);
        } catch (err) {
            logger.error(err.stack)

            await interaction.reply({ content: "Sorry, this interaction failed! Please join the support Discord server here.", ephemeral: true})

            const errorEmbed = new MessageEmbed()
            .setColor(`#2c1178`)
            .setTitle(`BookieBot Error!`)
            .addFields(
                { name: 'Guild', value: `${interaction.member.guild.name}`, inline: true },
                { name: 'User', value: `${interaction.user.tag}`, inline: true },
                { name: 'Command', value: `${interaction.commandName}`, inline: true }
            )
            .setDescription(`BookieBot encountered an error at <t:${Math.round(Date.now() / 1000)}:f>.\n\n**Error Type: ${err.name}**\n**Full Error: ${err.message}**`)

            return wh({
                username: 'BookieBot - Errors',
                embeds: errorEmbed
            });
        }
    }
}