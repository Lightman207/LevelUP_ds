const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addition')
		.setDescription('addition two numbers')
		.addNumberOption(option => 
			option
			.setName('first-num')
			.setDescription('fn')
			.setRequired(true))
		.addNumberOption(option => 
			option
			.setName('second-num')
			.setDescription('sn')
			.setRequired(true)),
	
	async execute(interaction) {
		const num1 = interaction.options.getNumber('first-num');
		const num2 = interaction.options.getNumber('second-num');

		await interaction.reply(`Sum: ${num1+num2}`);
	},
};