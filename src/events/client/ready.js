const { ActivityType, Events } = require('discord.js');
const logger = require('~/utils/logger.js');

module.exports = {
    name: Events.ClientReady,
    execute: async (client) => {
        logger.log(`${client.user.tag} is now online!`, 'client');
        client.user.setPresence({
            activities: [
                {
                    name: 'Client Bot',
                    state: '/help | Bot',
                    type: ActivityType.Watching,
                },
            ],
            status: 'online',
        });
    },
};
