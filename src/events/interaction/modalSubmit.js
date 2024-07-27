const { Events } = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    name: Events.InteractionCreate,
    execute: async (interaction, client) => {
        if (interaction.isModalSubmit()) {
            const modal = client.modalComponents.get(interaction.customId);
            if (!modal) return;
            modal.run(client, interaction);
        }
    },
};
