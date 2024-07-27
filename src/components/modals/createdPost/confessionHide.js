const {
    EmbedBuilder,
    PermissionsBitField,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const confessionSchema = require('~/models/confession.js');
const configSchema = require('~/models/config.js');
const config = require('~/utils/config.js');

module.exports = {
    id: 'CREATE_CFS_HIDE',
    run: async (client, interaction) => {
        const contents = interaction.fields.getTextInputValue('CONTENTS');

        await interaction.reply({
            content:
                '> Successfully created. This post is currently awaiting approval. Once it is approved, you will receive a message from the bot.',
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: '| Confession content',
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setColor(config.color.main)
                    .setDescription(contents),
            ],
            ephemeral: true,
        });
        const dataConfig = await configSchema.findOne({ channel: interaction.channelId });
        const reviewChannel = await interaction.guild.channels.cache.get(dataConfig.reviewChannel);
        const msg = await reviewChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: '| Confession Anonymous',
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setColor(config.color.main)
                    .setDescription(contents),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setLabel('Accept').setStyle(ButtonStyle.Success).setCustomId('ACCEPT'),
                    new ButtonBuilder().setLabel('Reject').setStyle(ButtonStyle.Danger).setCustomId('REJECTED'),
                ),
            ],
        });
        const newCfs = await confessionSchema({
            reviewMessageId: msg.id,
            idOwner: interaction.user.id,
            hideName: true,
            contents: contents,
        });
        await newCfs.save();
    },
};
