const { readdirSync } = require('node:fs');
const { REST, Routes } = require('discord.js');
const config = require('~/utils/config.js');
const logger = require('~/utils/logger.js');

module.exports = async (client) => {
    const slashcommands = [];
    for (const folder of readdirSync('./src/commands/')) {
        for (const file of readdirSync(`./src/commands/${folder}`)) {
            const command = await require(`~/commands/${folder}/${file}`);
            if (command.data.name) {
                logger.log(`${file} Loaded!`, 'slash');
            }
            client.slashDatas.push(command.data.toJSON());
            client.slashCommands.set(command.data.name, command);
        }
    }
    const rest = new REST({ version: '10' }).setToken(config.token);
    await rest
        .put(Routes.applicationCommands(config.clientId), {
            body: client.slashDatas,
        })
        .then(() => logger.log('Successfully reloaded application (/) commands.', 'client'));
};
