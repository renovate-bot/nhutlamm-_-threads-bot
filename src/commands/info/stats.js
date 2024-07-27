const os = require('node:os');
const { EmbedBuilder, SlashCommandBuilder, version } = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    data: new SlashCommandBuilder().setName('stats').setDescription('View bot stats.'),
    description: {
        examples: ['stats'],
        usage: 'stats',
    },
    cooldown: 5,
    category: 'info',
    ownerOnly: false,
    run: async (client, ctx) => {
        const platform = process.platform.replace(/win32/g, 'Windows');
        const cpuUsage = (process.cpuUsage().user / 1024 / 1024).toFixed(2);
        const botUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const cpuLoad = os.loadavg()[0].toFixed(2);
        const botUsage = ((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1);
        const osRelease = os.release();
        const osUptime = process.uptime();
        const cpuArch = os.arch();
        const cpuCores = os.cpus().length;
        const cpuModel = os.cpus()[0].model;
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const nodeVersion = process.versions.node;
        const discordJsVersion = version;
        const botGuilds = client.guilds.cache.size;
        const botChannels = client.channels.cache.size;
        const botUsers = client.users.cache.size;
        const botInfo = `Bot Stats:
- **Operating System**: ${platform} ${cpuArch} ${osRelease}
- **CPU Used:** ${cpuUsage} MB
- **CPU Load:** ${cpuLoad}%
- **CPU Architecture**: ${cpuCores} cores
- **CPU Model**: ${cpuModel}
- **Uptime**: ${client.utils.formatTime(osUptime)}
- **Overall RAM**: ${client.utils.formatBytes(usedMem)} / ${client.utils.formatBytes(totalMem)} (${Math.round(
            (usedMem / totalMem) * 100,
        )}%)
- **Bot RAM Used:** ${botUsed} MB
- **Bot RAM Usage:** ${botUsage}%
- **Node Version**: ${nodeVersion}
- **Discord Version**: ${discordJsVersion}
- **Bot Version**: ${require('../../../package.json').version}
- **Connected to**: ${botGuilds} guilds, ${botChannels} channels, and ${botUsers} users
- **Total Cluster**: ${client.cluster.count} Cluster \`[ID #${client.cluster.id}]\`
- **Total Shards**: ${client.cluster.info.TOTAL_SHARDS} Shards \`[ID #${ctx.guild.shardId}]\``;
        await ctx.sendMessage({
            embeds: [
                new EmbedBuilder()
                    .setColor(config.color.main)
                    .setAuthor({ name: 'Bot Stats', iconURL: client.user.displayAvatarURL() })
                    .setDescription(botInfo)
                    .setFooter({ text: ctx.author.tag, iconURL: ctx.author.displayAvatarURL() })
                    .setTimestamp(),
            ],
        });
    },
};
