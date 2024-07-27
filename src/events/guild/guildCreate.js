const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const guildSchema = require('~/models/guild.js');
const config = require('~/utils/config.js');

module.exports = {
    name: Events.GuildCreate,
    execute: async (guild) => {
        const owner = await guild.fetchOwner();
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel('Support Server').setStyle(ButtonStyle.Link).setURL(config.linkDiscord),
        );
        const embed = new EmbedBuilder()
            .setColor(config.color.main)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ extension: 'jpeg' }) })
            .setDescription(
                `🎉 Thank you, <@${owner.user.id}>, for using **AnonConfess Bot** on the **${guild.name}** server. Use the command \`/setup create\` to create a confession channel for your server. We hope you have a great experience on your server with our confession bot!`,
            )
            .setThumbnail(guild.iconURL({ extension: 'jpeg' }))
            .setTimestamp();
        const guildId = await guildSchema.findOne({ idGuild: guild.id });
        if (!guildId) {
            const newGuild = new guildSchema({
                idGuild: guild.id,
                idOwner: owner.user.id,
                nameGuild: guild.name,
            });
            await newGuild.save();
        } else {
            await guildSchema.findByIdAndUpdate(guildId._id, { idOwner: owner.user.id });
        }
        const dmOwner = await guild.members.cache.get(owner.user.id);
        return await dmOwner.send({ embeds: [embed], components: [row] });
    },
};
