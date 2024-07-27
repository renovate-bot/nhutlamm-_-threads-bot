const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    data: new SlashCommandBuilder().setName('invite').setDescription('Invite bot to your server.'),
    description: {
        examples: ['invite'],
        usage: 'invite',
    },
    cooldown: 5,
    category: 'info',
    ownerOnly: false,
    run: async (client, ctx) => {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Invite').setStyle(ButtonStyle.Link).setURL(config.linkInvite),
            new ButtonBuilder().setLabel('Support Server').setStyle(ButtonStyle.Link).setURL(config.linkDiscord),
        );
        return await ctx.sendMessage({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: 'Invite Me Today!',
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setColor(config.color.main)
                    .setDescription(
                        `You can invite me by clicking the button below. Any bugs or outages? Join the support server!`,
                    ),
            ],
            components: [row],
        });
    },
};
