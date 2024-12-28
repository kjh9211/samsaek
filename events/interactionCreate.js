const errorHandler = require('../utils/errorHandler');
const fs = require("fs")
const { knowledgeBase } = require('../utils/knowledge');
const { webhookClient } = require('../utils/webhook');
const config = JSON.parse(fs.readFileSync('./hidden/config.json', 'utf-8'));
const { processWebhookClient } = require('../utils/webhook');

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if (command) {
        try {
            processWebhookClient.send(`\`${interaction.toString()}\`를 보냈습니다. 처리를 시작합니다..`)
            await command.execute(interaction, knowledgeBase, fs, webhookClient, config.ownerId);
        } catch (error) {
            await errorHandler.sendErrorToWebhook('Interaction Handling Error', error.code || 'Unknown', error.message, interaction);
            await interaction.reply(`오류가 발생했습니다. 관리자가 확인하고 있습니다.`);
        }
    }
};
