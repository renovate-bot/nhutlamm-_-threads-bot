const { ChannelType, SortOrderType, ForumLayoutType } = require('discord.js');

module.exports = class CreateChannel {
    static async SetupCreateCategory(channel, categoryName) {
        const name = categoryName ?? 'Confession Channel';
        return channel.guild.channels.create({
            name: name,
            type: ChannelType.GuildCategory,
        });
    }
    static async SetupCreateChannel(channel, channelsName, categoryChannel) {
        const name = channelsName ?? 'Confession';
        return channel.guild.channels.create({
            name: name,
            type: ChannelType.GuildForum,
            parent: categoryChannel,
            defaultSortOrder: SortOrderType.CreationDate,
            defaultForumLayout: ForumLayoutType.ListView,
            defaultReactionEmoji: {
                name: '❤️',
            },
        });
    }
    static async SetupCreateReviewChannel(channel, categoryChannel) {
        const name = 'Reviewing Confession';
        return channel.guild.channels.create({
            name: name,
            type: ChannelType.GuildText,
            parent: categoryChannel,
        });
    }
    static async SetupCreateReplyChannel(channel, categoryChannel) {
        const name = 'Reviewing Reply Confession';
        return channel.guild.channels.create({
            name: name,
            type: ChannelType.GuildText,
            parent: categoryChannel,
        });
    }
};
