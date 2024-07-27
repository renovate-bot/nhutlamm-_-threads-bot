const { readdirSync } = require('node:fs');
const logger = require('~/utils/logger.js');

module.exports = async (client) => {
    readdirSync('./src/plugins').forEach(async (files) => {
        const plugin = await require(`~/plugins/${files}`);
        if (plugin.initialize) plugin.initialize(client);
        logger.log(`${files} Loaded!`, 'plugins');
    });
};
