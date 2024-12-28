module.exports = {
    data: {
        name: '핑',
        description: '봇의 핑을 측정합니다',
    },
    async execute(interaction) {
        const restPing = Math.round(interaction.client.ws.ping);
        const gatewayPing = Math.round(Date.now() - interaction.createdTimestamp);
        await interaction.reply(`퐁!\nREST API Ping: ${restPing}ms\nGateway Ping: ${gatewayPing}ms`);
    }
};
