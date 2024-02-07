require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const eventHandlers = require('./handlers/eventHandlers');
const mongoose = require('mongoose');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        if (mongoose.connect) {
            console.log('I have connected to the database!');
        } else {
            console.log('I cannot connect to the database right now...');
        }

        eventHandlers(client);
    } catch (error) {
        console.log(error);
    }
})();
// node --trace-warnings ...

client.login(process.env.TOKEN);