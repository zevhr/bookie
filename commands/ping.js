const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: 'ping',
    info: {
        "description": "Check the bots active ping!",
        "usage": "/ping"
    },
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check the bots active ping!"),
    async execute(interaction, args, user) {
        return await interaction.reply('Bot ping: ' + '`' + `${Date.now() - interaction.createdTimestamp}` + 'ms`')
    }
}