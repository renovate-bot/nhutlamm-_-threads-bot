const { readdirSync } = require('node:fs');
const logger = require('~/utils/logger.js');

module.exports = async (client) => {
    for (const folder of readdirSync('./src/components/buttons')) {
        for (const file of readdirSync(`./src/components/buttons/${folder}`)) {
            const buttons = await require(`~/components/buttons/${folder}/${file}`);
            if (!buttons) return;
            client.buttonsComponents.set(buttons.id, buttons);
            logger.log(`Loaded Button: ${buttons.id.toLowerCase()}.js`, 'buttons');
        }
    }
};
