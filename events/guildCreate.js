const database = require('../modules/database');
const logger = require('../modules/logger');
const { debug } = require('../config.json');
module.exports = {
    name: 'guildCreate',
    on: true,
    async execute(guild) {
        database.insertGuild(guild.id)
        if(debug) logger.debug(`${guild.id} has been inserted`)
    }
}