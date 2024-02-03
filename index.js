require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const internal = require('node:stream');
const { log } = require('node:console');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('interactionCreate', async (interaction) => {
	try {
		if(!interaction.isButton()) return;

		await interaction.deferReply({ ephemeral: true });

		const role = interaction.guild.roles.cache.get(interaction.customId);
		if(!role) {
			interaction.editReply({
				content: `I could't find this button`,
			});

			return;
		}
		
		const hasRole = interaction.member.roles.cache.has(role.id);

		if(hasRole) {
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

client.login(process.env.TOKEN);