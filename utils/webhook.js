const { WebhookClient } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./hidden/config.json', 'utf-8'));

const webhookClient = new WebhookClient({ url: config.webhookUrl });
const processWebhookClient = new WebhookClient({ url: config.processwebhookUrl });

module.exports = { webhookClient, processWebhookClient };
