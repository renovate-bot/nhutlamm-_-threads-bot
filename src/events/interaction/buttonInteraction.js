const { Events } = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    name: Events.InteractionCreate,
    execute: async (interaction, client) => {
        if (interaction.isButton()) {
            const button = client.buttonsComponents.get(interaction.customId);
            if (!button) return;
            button.run(client, interaction);
        }
    },
};
