const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const logger = require('./modules/logger');
const config = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	commands.push(command.data.toJSON());
}

if (config.env == "prod") {
    var token = config.tokens.prod;
	var clientId = config.client.prod.clientId;

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
    
            // console.log(chalk.greenBright.bold('Successfully registered global application commands.'));
            logger.info("Successfully registered application commands to Global");
        } catch (error) {
            logger.error(error.name + " // " + error.message);
        }
    })();
} else if (config.env == "dev") {
    var token = config.tokens.dev;
    var clientId = config.client.dev.clientId;
    var guildId = config.client.dev.guildId;

    const rest = new REST({ version: '9' }).setToken(token);
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
    
            logger.info("Successfully registered application commands to Guild");
            process.exit(0);
        } catch (error) {
            logger.error(error.name + " // " + error.message);
        }
    })();
} else logger.error(config.env + " is not a valid environment.") && process.exit(0);