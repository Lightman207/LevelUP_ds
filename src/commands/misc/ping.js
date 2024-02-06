const { Client } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: Boolean,
    // textOnly: Boolean,
    // options: Object[],
    
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const re