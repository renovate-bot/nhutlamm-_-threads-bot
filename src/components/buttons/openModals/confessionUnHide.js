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
    id: 'CONFESSION_UNHIDE',
    run: async (client, interaction) => {
        const modal = new ModalBuilder().setCustomId('CREATE_CFS_UNHIDE').setTitle('Confession: Display Name');
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
