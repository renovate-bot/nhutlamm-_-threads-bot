const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const confessionSchema = require('~/models/confession.js');
const replieSchema = require('~/models/replie.js');
const configSchema = require('~/models/config.js');

const IndexIncrement = require('~/helpers/indexIncrement.js');
const config = require('~/utils/config.js');

module.exports = {
    id: 'ACCEPT_REPLY',
    run: async (client, interaction) => {
        const replyData = await replieSchema.findOne({ reviewReplyId: interaction.message.id });
        const dataConfig = await configSchema.findOne({ replyChannel: interaction.channelId });
        const cfsData = await confessionSchema.findOne({ threadId: replyData.channel });

        await IndexIncrement.Reply(cfsData, replyData);
        const nameReply = cfsData.idOwner == replyData.idUser ? 'Creator' : 'Anonymous';
        const postReply = interaction.guild.channels.cache.get(replyData.channel);
        const sendMessage = await postReply.send({
            content: `**#${replyData.index}**\n> ${replyData.contents}`,
            embeds: [
                new EmbedBuilder()
                    .setColor(config.color.main)
                    .setAuthor({ name: nameReply, iconURL: interaction.guild.iconURL() }),
            ],
        });
        const replyUrl = sendMessage.url;
        const userUrl = `${config.urlDiscord}/users/${interaction.user.id}`;
        const message = await interaction.channel.messages.fetch(interaction.message.id);
        await message.edit({
            content: `Approved by **[@${interaction.user.displayName}](${userUrl})**\nGo to the [reply section.](${replyUrl})`,
            components: [],
        });
        const dmUser = await interaction.guild.members.cache.get(replyData.idUser);
        await dmUser.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(config.color.success)
                    .setAuthor({ name: `Reply approved`, iconURL: interaction.guild.iconURL() })
                    .setDescription(`Your reply has been approved.\n[Click here](${replyUrl}) to go to your reply.`)
                    .setFooter({ text: `Your Reply #${replyData.index}` })
                    .setTimestamp(),
            ],
        });
    },
};
