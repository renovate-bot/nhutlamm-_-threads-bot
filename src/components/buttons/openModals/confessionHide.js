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
    id: 'CFS_ANONYMOUS',
    run: async (client, interaction) => {
        const modal = new ModalBuilder().setCustomId('CREATE_CFS_HIDE').setTitle('Confession: Anonymous');
        const row = new ActionRowBuilder().addComponents([
            new TextInputBuilder()
                .setStyle(TextInputStyle.Paragraph)
                .setLabel('Write confession')
                .setMaxLength(2000)
                .setCustomId('CONTENTS')
                .setRequired(true),
        ]);
        modal.addComponents(row);
        interaction.showModal(modal);
    },
};
