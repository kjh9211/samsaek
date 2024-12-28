const { EmbedBuilder, WebhookClient } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./hidden/config.json', 'utf-8'));

const webhookClient = new WebhookClient({ url: config.webhookUrl });

async function sendErrorToWebhook(errorReason, errorCode, errorDetails, interaction) {
    const embed = new EmbedBuilder()
        .setTitle(errorReason)
        .setDescription(`오류 코드: ${errorCode}`)
        .addFields(
            { name: '상세 내용', value: errorDetails },
        )
        .setFooter({ text: `오류 발생 일시: ${new Date().toISOString()}` })
        .setColor(15548997);

    await webhookClient.send({ embeds: [embed] });
}

module.exports = { sendErrorToWebhook };
