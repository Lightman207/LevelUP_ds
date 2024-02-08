require('dotenv').config();
const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

const roles = [
    {
        id: '1204994435050504202',
        lable: '📰 Game News 📰'
    },
];

client.once(Events.ClientReady,  async readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    try {
        console.log('yes');
        const channel = await client.channels.cache.get('1203188296075976755');
        if(!channel) return;

        const row = new ActionRowBuilder(); 
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.lable)
                    .setStyle(ButtonStyle.Success),
            )
        }); 
        console.log(row);
        console.log('yes2');
        await channel.send({
            content: 'Claim or remove a role below',
            components: [row]
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
});


client.login(process.env.TOKEN);