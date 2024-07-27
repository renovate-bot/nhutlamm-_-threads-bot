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
const replieSchema = require('~/models/replie.js');
const configSchema = require('~/models/config.js');
const config = require('~/utils/config.js');

module.exports = {
    id: 'CREATE_REPLY',
    run: async (client, interaction) => {
        const contents = interaction.fields.getTextInputValue('REPLY_CONTENTS');
        const cfsData = await confessionSchema.findOne({ threadId: interaction.channelId });
        await interaction.reply({
            content: '> This response will be pending approval and will be displayed here once approved.',
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: '| Reply Confession',
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setColor(config.color.main)
                    .setDescription(contents),
            ],
            ephemeral: true,
        });
        const cfsUrl = await interaction.guild.channels.cache.get(cfsData.threadId).url;
        const dataConfig = await configSchema.findOne({ createCfs: interaction.channel.parentId });
        const replyChannels = await interaction.guild.channels.cache.get(dataConfig.replyChannel);
        const msg = await replyChannels.send({
            content: `> The reply link for the confession **#${cfsData.index}** is [here.](${cfsUrl})`,
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: '| Reply Confession',
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setColor(config.color.main)
                    .setDescription(contents),
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setLabel('Accept').setStyle(ButtonStyle.Success).setCustomId('ACCEPT_REPLY'),
                    new ButtonBuilder().setLabel('Reject').setStyle(ButtonStyle.Danger).setCustomId('REJECTED_REPLY'),
                ),
            ],
        });
        const dmUser = await client.users.fetch(interaction.user.id);
        await dmUser.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(config.color.main)
                    .setAuthor({ name: '| Your Reply', iconURL: client.user.displayAvatarURL() })
                    .addFields({ name: 'Contents', value: contents })
                    .setDescription(
                        `This reply is for confession [#${cfsData.index}](${cfsUrl}) and is pending approval.`,
                    )
                    .setTimestamp(),
            ],
        });
        const newReplyCfs = await replieSchema({
            idUser: interaction.user.id,
            reviewReplyId: msg.id,
            contents: contents,
            channel: interaction.channelId,
        });
        await newReplyCfs.save();
    },
};
