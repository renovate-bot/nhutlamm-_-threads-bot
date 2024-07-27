const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('~/utils/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('See list of commands.')
        .addStringOption((option) =>
            option.setName('command').setDescription('See more command details.').setAutocomplete(true),
        ),
    description: {
        examples: ['help', 'help info', 'help name'],
        usage: 'help',
    },
    cooldown: 5,
    category: 'info',
    ownerOnly: false,
    run: async (client, ctx) => {
        const commandOptions = ctx.options.getString('command');
        const slashCommands = client.slashCommands.filter((cmd) => cmd.category);
        const categories = slashCommands
            .map((cmd) => cmd.category)
            .filter((value, index, self) => self.indexOf(value) === index);
        if (!commandOptions) {
            const fildes = [];
            categories.forEach((category) => {
                fildes.push({
                    name: client.utils.capitalizeFirstLetter(category),
                    value: slashCommands
                        .filter((cmd) => cmd.category === category)
                        .map((cmd) => `\`${cmd.data.name}\``)
                        .join(', '),
                    inline: false,
                });
            });
            const helpEmbed = new EmbedBuilder()
                .setColor(config.color.main)
                .setAuthor({
                    name: 'Help Commands',
                    iconURL: client.user.displayAvatarURL(),
                })
                .setFooter({
                    text: `Use the /help <command> command to view more command information.`,
                });
            fildes.forEach((field) => helpEmbed.addFields(field));
            ctx.sendMessage({ embeds: [helpEmbed] });
        } else {
            const slashCommands = client.slashCommands.get(commandOptions.toLowerCase());
            if (!slashCommands)
                return await ctx.sendMessage({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(config.color.info)
                            .setDescription(`Command \`${commandOptions}\` not found.`),
                    ],
                    ephemeral: true,
                });
            const helpEmbed = new EmbedBuilder().setColor(config.color.main).setAuthor({
                name: `Help Menu - ${slashCommands.data.name}`,
                iconURL: client.user.displayAvatarURL(),
            }).setDescription(`**Description:** ${slashCommands.data.description}
**Usage:** \`/${slashCommands.description.usage}\`
**Examples:** ${slashCommands.description.examples.map((example) => `\`/${example}\``).join(', ')}
**Category:** ${slashCommands.category}
**Cooldown:** ${slashCommands.cooldown} seconds`);
            ctx.sendMessage({ embeds: [helpEmbed], ephemeral: true });
        }
    },
    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const cmd = client.slashCommands.filter((cmd) => cmd.data.name.includes(focusedValue));
        const choices = cmd.map((cmd) => ({
            name: client.utils.capitalizeFirstLetter(cmd.data.name),
            value: cmd.data.name,
        }));
        await interaction.respond(choices.slice(0, 25));
    },
};
