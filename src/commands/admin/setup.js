const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const guildSchema = require('~/models/guild.js');
const configSchema = require('~/models/config.js');
const CreateChannel = require('~/helpers/createChannel.js');
const config = require('~/utils/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Create a new channel as a confession channel.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('create')
                .setDescription('Create a new channel as a confession channel.')
                .addStringOption((option) => option.setName('channel').setDescription('Name the confession.'))
                .addStringOption((option) =>
                    option.setName('category').setDescription('Name the category confession.'),
                ),
        ),
    description: {
        examples: ['setup create'],
        usage: 'setup',
    },
    cooldown: 5,
    category: 'admin',
    ownerOnly: true,
    run: async (client, ctx) => {
        const subCommand = ctx.options.getSubcommand();
        const channel = ctx.options.getString('channel');
        const category = ctx.options.getString('category');
        const channelName = channel || null;
        const categoryName = category || null;
        switch (subCommand) {
            case 'create':
                {
                    const newCategory = await CreateChannel.SetupCreateCategory(ctx, categoryName);
                    const newChannel = await CreateChannel.SetupCreateChannel(ctx, channelName, newCategory);
                    const newReviewChannel = await CreateChannel.SetupCreateReviewChannel(ctx, newCategory);
                    const newReplyChannel = await CreateChannel.SetupCreateReplyChannel(ctx, newCategory);
                    await ctx.sendMessage({
                        content: 'Creating channel...',
                        ephemeral: true,
                    });
                    await ctx.editMessage({
                        content: '',
                        embeds: [
                            new EmbedBuilder()
                                .setColor(config.color.success)
                                .setDescription(
                                    `**Creation successful. ${newChannel} will be the confession post channel.**`,
                                ),
                        ],
                        ephemeral: true,
                    });
                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('Confession: Anonymous')
                            .setStyle(ButtonStyle.Success)
                            .setCustomId('CFS_ANONYMOUS'),
                        new ButtonBuilder()
                            .setLabel('Confession: Display Name')
                            .setStyle(ButtonStyle.Success)
                            .setCustomId('CONFESSION_UNHIDE'),
                    );
                    await newChannel.threads
                        .create({
                            name: 'Create Post Confession',
                            message: {
                                content:
                                    'Please select one of the two buttons below to submit your confession. The bot will send you a private message to notify you when your confession has been approved.',
                                components: [row],
                            },
                        })
                        .then(async (threadChannel) => {
                            const data = await guildSchema.findOne({ idGuild: ctx.guild.id });
                            const newConfig = await configSchema({
                                guildId: ctx.guild.id,
                                category: newCategory.id,
                                channel: threadChannel.id,
                                createCfs: newChannel.id,
                                reviewChannel: newReviewChannel.id,
                                replyChannel: newReplyChannel.id,
                            });
                            await newConfig.save().then(async () => {
                                data.configs.addToSet(newConfig._id);
                                await data.save();
                            });
                            await threadChannel.pin();
                            await threadChannel.send({
                                content: `comment`,
                            });
                        })
                        .catch(console.error);
                }
                break;
        }
    },
};
