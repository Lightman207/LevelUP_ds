const { Client } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: Boolean,
    // textOnly: Boolean,
    // options: Object[],
    
    callback: (client, interaction) => {
        interaction.reply(`Pong ${client.ws.ping}ms`)
    }
};