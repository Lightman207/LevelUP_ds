const { Client } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Pong!',
    // deleted: Boolean,
    // devOnly: Boolean,
    // textOnly: Boolean,
    // options: Object[],
    
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
    }
};