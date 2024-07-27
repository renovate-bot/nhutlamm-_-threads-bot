const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('See bot latency.'),
    description: {
        examples: ['ping'],
        usage: 'ping',
    },
    cooldown: 5,
    premium: false,
    category: 'info',
    ownerOnly: false,
    run: async (client, ctx) => {
        await ctx.sendMessage({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: 'Pong', iconURL: client.user.displayAvatarURL() })
                    .setColor(config.color.main)
                    .addFields([
                        {
                            name: `Shard`,
                            value: `\`[ID #${ctx.guild.shardId}\`]`,
                            inline: true,
                        },
                        {
                            name: 'Shard Latency',
                            value: `\`[${Math.round(ctx.client.ws.ping).toFixed(0)}ms]\``,
                            inline: true,
                        },
                    ])
                    .setFooter({ text: ctx.author.tag, iconURL: ctx.author.displayAvatarURL() })
                    .setTimestamp(),
            ],
        });
    },
};
