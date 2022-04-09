const { SlashCommandBuilder } = require("@discordjs/builders");
const database = require('../modules/database');
const logger = require('../modules/logger');
const anilist = require('anilist-node');
const config = require('../config.json');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'anilist',
    info: {
        "description": "Manage your Anilist account!",
        "Usage": "/anilist",
    },
    data: new SlashCommandBuilder()
        .setName("anilist")
        .setDescription("Manage your Anilist account!")
        .addStringOption(option =>
            option.setName("category")
                .setDescription("Category to manage.")
                .setRequired(true)
                .addChoice("Recently watched", "recentWatched")
                // .addChoice("Recently Read", "recentRead")
                .addChoice("Profile", "profile")
                .addChoice("Logout", "logout")),
    async execute(interaction, args, author) {
        var user = await database.fetchUserData(author.id);
        var guildSettings = await database.getGuild(interaction.member.guild.id);
        if(guildSettings.anilistEnabled != "true") return interaction.reply("Sorry, an administrator has disabled Anilist linking. Please ask an admin to re-enable this before trying again.")
        if(!user) return await interaction.reply({ "content": "Hey! You haven't logged in yet. Please authenticate yourself via Anilist.co here; https://api.thatalex.dev/v0/bookie/login?userId=" + author.id + "&guildId=" + interaction.member.guild.id + "\n**Interested in what BookieBot does with this data?** See here: https://bookie.thatalex.dev/privacy", ephemeral: true })

        const Anilist = new anilist(user.token);
        const currentUser = await Anilist.user.getAuthorized();

        if(args[0] == "recentWatched") {
            Anilist.user.getRecentActivity(currentUser.id)
            .then(function(response) {

                var arrayCount = 0;
                for(var key in response) {
                    if(response.hasOwnProperty(key)) {
                        arrayCount++;
                    }
                }

                if(arrayCount == 0) return interaction.reply(`You have not logged any animes that you've watched yet!`)

                const animeInfo = new MessageEmbed()
                .setAuthor({ name: `${currentUser.name}'s recent animes`, iconURL: currentUser.avatar.medium})
                .setDescription("These are some of your most recent animes that you logged on [Anilist.co](https://anilist.co)!")
                .setFooter({ text: "BookieBot by Alex" })
                .setTimestamp();

                Object.keys(response).forEach(function(key) {
                    animeInfo.addField(response[key].media.title.english, new Date(response[key].createdAt*1000).toLocaleString(), true)    
                })

                return interaction.reply({ embeds: [animeInfo] });

                
            })
            .catch(function(error) {

            })
        } else if (args[0] == "recentRead") {

        } else if (args[0] == "profile") {
            Anilist.user.profile(currentUser.id)
            .then(async function(response) {
                const profileEmbed = new MessageEmbed()
                .setTitle(`${response.name}'s Profile`)
                .setURL(response.siteUrl)
                .setDescription(response.about)
                .setThumbnail(response.avatar.medium)
                .setImage(response.bannerImage)

                return await interaction.reply({ embeds: [profileEmbed] });
            })
        } else if (args[0] == "logout") {
            database.destroyRow(author.id);
            return interaction.reply({ "content": "Your Anilist.co account has been disconnected.", ephemeral: true })
        }
    }
}