require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const eventHandlers = require('./handlers/eventHandlers');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

eventHandlers(client);


client.login(process.env.TOKEN);