const { REST, Routes } = require('discord.js');

async function registerCommands(token, botId, commands) {
    const rest = new REST({ version: '9' }).setToken(token);

    try {
        console.log('시작: 슬래시 명령어 등록...');
        await rest.put(Routes.applicationCommands(botId), { body: commands.map(cmd => cmd.data) });
        console.log('슬래시 명령어 등록 완료!');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { registerCommands };
