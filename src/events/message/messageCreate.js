const { ChannelType, Collection, Events, EmbedBuilder } = require('discord.js');

const config = require('~/utils/config.js');

module.exports = {
    name: Events.MessageCreate,
    execute: async (message, client) => {
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;
        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setDescription(
                            `Hey ${message.author}, I'm **${client.user.username}**.\nMy command for this server is \`/\``,
                        )
                        .setColor(config.color.main),
                ],
            });
        }
    },
};
