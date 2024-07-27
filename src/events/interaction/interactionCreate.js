const { Collection, Events, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const guildSchema = require('~/models/guild.js');
const context = require('~/structures/context.js');
const config = require('~/utils/config.js');

module.exports = {
    name: Events.InteractionCreate,
    execute: async (interaction, client) => {
        if (interaction.isCommand()) {
            const ctx = new context(interaction);
            if (interaction.user.bot) return;
            const { commandName } = interaction;
            const command = client.slashCommands.get(interaction.commandName);
            if (command.ownerOnly) {
                const owner = await interaction.guild.fetchOwner();
                const data = await guildSchema.findOne({ idGuild: interaction.guild.id });
                if (!data) {
                    const newGuild = new guildSchema({
                        idGuild: interaction.guild.id,
                        idOwner: owner.user.id,
                        nameGuild: interaction.guild.name,
                    });
                    await newGuild.save();
                } else {
                    const findOwner = data.idOwner == interaction.user.id;
                    if (!findOwner)
                        return await interaction.reply({
                            content: '> Only **`Admin`** can use this command.',
                            ephemeral: true,
                        });
                }
                if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrator))
                    return await interaction.reply({
                        content:
                            "❌ **I don't have **`Administrator`** permission**.\n\n> Please add **`Administrator`** permission for me so I can use it.\n> *I only manage channels.*",
                        ephemeral: true,
                    });
            }
            const checkConmunity = interaction.guild.features.includes('COMMUNITY');
            if (!checkConmunity) {
                return await ctx.sendMessage({
                    content: `> I'm sorry for the confusion, but my bot only supports confession for community servers. If you'd like to use confession, you can enable community server features.`,
                    ephemeral: true,
                });
            }
            if (!client.cooldown.has(commandName)) {
                client.cooldown.set(commandName, new Collection());
            }
            const now = Date.now();
            const timestamps = client.cooldown.get(commandName);
            const cooldownAmount = Math.floor(command.cooldown || 5) * 1000;
            if (!timestamps.has(interaction.user.id)) {
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            } else {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                const timeLeft = (expirationTime - now) / 1000;
                if (now < expirationTime && timeLeft > 0.9) {
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(
                                    `**Please wait \`${timeLeft.toFixed(1)}\` more second before reusing the \`/${commandName}\` command.**`,
                                )
                                .setColor(config.color.info),
                        ],
                        ephemeral: true,
                    });
                }
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            }
            command.run(client, ctx);
        }
    },
};
