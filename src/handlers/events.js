const { readdirSync } = require('node:fs');
const logger = require('~/utils/logger.js');

module.exports = async (client) => {
    for (const folder of readdirSync('./src/events/')) {
        for (const file of readdirSync(`./src/events/${folder}`)) {
            const event = await require(`~/events/${folder}/${file}`);
            if (event.name) {
                logger.log(`${file} Loaded!`, 'events');
            }
            if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
};
