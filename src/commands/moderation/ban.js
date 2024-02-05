const { ApplicationCommandOptionType, Client, ApplicationCommand, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'Bans a member!!!',
    // devOnly: Boolean,
    // textOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban',
            require: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for banning',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissionsRequired: [PermissionFlagsBits.Administrator],
    
    callback: (client, interaction) => {
        interaction.reply(`Ban...`)
    }
};