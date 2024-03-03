'use strict'
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js'),
	mongoose = require('mongoose'),
	eventHandler = require('./handlers/eventHandler')


const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.MessageContent,
	],
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to DB.');

    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

client.on('interactionCreate', async (interaction) => {
	try {
		if (!interaction.isButton()) return;

		await interaction.deferReply({ ephemeral: true });

		const role = interaction.guild.roles.cache.get(interaction.customId);
		if (!role) {
			interaction.editReply({
				content: `I could't find this button`,
			});

			return;
		}

		const hasRole = interaction.member.roles.cache.has(role.id);

		if (hasRole) {
			await interaction.member.roles.remove(role);
			await interaction.editReply(`The role ${role} has been remove`);
			return;
		};

		await interaction.member.roles.add(role)
		await interaction.editReply(`The role ${role} has been added`);
	} catch (error) {
		console.log(error);
	}
});

// node --trace-warnings ...
