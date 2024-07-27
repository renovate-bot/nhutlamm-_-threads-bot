const {
    EmbedBuilder,
    PermissionsBitField,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    id: 'REPLY',
    run: async (client, interaction) => {
        const modal = new ModalBuilder().setCustomId('CREATE_REPLY').setTitle('Reply Confession');
        const row = new ActionRowBuilder().addComponents([
            new TextInputBuilder()
                .setStyle(TextInputStyle.Paragraph)
                .setLabel('Write reply confession')
                .setMaxLength(1500)
                .setCustomId('REPLY_CONTENTS')
                .setRequired(true),
        ]);
        modal.addComponents(row);
        interaction.showModal(modal);
    },
};
