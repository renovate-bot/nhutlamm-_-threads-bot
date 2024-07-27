const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const confessionSchema = require('~/models/confession.js');
const replieSchema = require('~/models/replie.js');
const configSchema = require('~/models/config.js');

const IndexIncrement = require('~/helpers/indexIncrement.js');
const config = require('~/utils/config.js');

module.exports = {
    id: 'ACCEPT',
    run: async (client, interaction) => {
        const cfsData = await confessionSchema.findOne({ reviewMessageId: interaction.message.id });
        const dataConfig = await configSchema.findOne({ reviewChannel: interaction.channelId });
        const { hideName } = cfsData;

        await IndexIncrement.Confession(dataConfig, cfsData);

        const postCfs = await interaction.guild.channels.cache.get(dataConfig.createCfs);
        const nameOwner = await interaction.guild.members.cache.get(cfsData.idOwner);

        const nickName = hideName ? 'Anonymous' : `by ${nameOwner.displayName}`;
        const iconOwner = hideName ? interaction.guild.iconURL() : nameOwner.user.displayAvatarURL();
        const urlOwner = hideName ? null : `${config.urlDiscord}/users/${cfsData.idOwner}`;

        await postCfs.threads
            .create({
                name: `Confession #${cfsData.index}`,
                message: {
                    content: `${cfsData.contents}`,
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: ` ${nickName}`,
                                iconURL: iconOwner,
                                url: urlOwner,
                            })
                            .setColor(config.color.main),
                    ],
                },
            })
            .then(async (threadChannel) => {
                cfsData.threadId = threadChannel.id;
                await cfsData.save();

                const cfsUrl = threadChannel.url;
                const userUrl = `${config.urlDiscord}/users/${interaction.user.id}`;
                const message = await interaction.channel.messages.fetch(interaction.message.id);
                await message.edit({
                    content: `Approved by **[@${interaction.user.displayName}](${userUrl})**\nGo to the [confession section.](${cfsUrl})`,
                    components: [],
                });
                const dmUser = await interaction.guild.members.cache.get(cfsData.idOwner);
                await dmUser.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(config.color.success)
                            .setAuthor({ name: `Confession approved`, iconURL: interaction.guild.iconURL() })
                            .setDescription(
                                `Your confession has been approved.\n[Click here](${cfsUrl}) to go to your confession.`,
                            )
                            .setFooter({ text: `Your confession #${cfsData.index}` })
                            .setTimestamp(),
                    ],
                });

                await threadChannel.send({
                    content: 'cmt',
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setLabel('Reply Confession')
                                .setStyle(ButtonStyle.Secondary)
                                .setCustomId('REPLY'),
                        ),
                    ],
                });
            });
    },
};
