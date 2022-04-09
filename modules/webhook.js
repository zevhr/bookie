const { WebhookClient } = require('discord.js');
const config = require('../config.json');
const logger = require('./logger');
module.exports = async (object) => {
    if(!object.embeds || !object.username) {
        if(config.debug) logger.debug("Webhook value not supplied. Embeds object: " + object.embeds + " Event: " + object.usernmae);
        return false;
    }

    var client = new WebhookClient({ id: config.client.dev.webhook.id, token: config.client.dev.webhook.token });
    await client.send({
        username: object.username,
        embeds: [object.embeds]
    }).catch(function(err) {
        console.log(err)
    })

    if (config.debug) logger.debug(object.username + " event fired to Discord Webhook")

    return true;
}