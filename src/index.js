require('dotenv').config();
const { Client, GatewayIntentBits} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
    ],
});

client.on('ready', (c) => {
    console.log(`✅${c.user.tag} is online`)
}); 

client.on('messageCreate', (msg) => {
    console.log(`${msg.author.globalName} wrote ${msg.content}`);
});

client.login(process.env.TOKEN);
