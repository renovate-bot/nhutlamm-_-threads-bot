const { readdirSync } = require('node:fs');
const logger = require('~/utils/logger.js');

module.exports = async (client) => {
    for (const folder of readdirSync('./src/components/modals')) {
        for (const file of readdirSync(`./src/components/modals/${folder}`)) {
            const modals = await require(`~/components/modals/${folder}/${file}`);
            if (!modals) return;
            client.modalComponents.set(modals.id, modals);
            logger.log(`Loaded Modals: ${modals.id.toLowerCase()}.js`, 'modals');
        }
    }
};
