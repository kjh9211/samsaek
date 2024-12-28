const { ApplicationCommandOptionType } = require('discord.js');
const { getTestData } = require('../utils/knowledge');

module.exports = {
    data: {
        name: 'chat',
        description: '이 명령어는 삼색아 ~ 와 같은 역할을 합니다',
        options: [
            {
                name: 'question',
                type: ApplicationCommandOptionType.String,
                description: '질문',
                required: true,
            }
        ],
    },
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const testData = getTestData(question);
        if (testData) {
            const reply = testData.reply;
            const userid = testData.userid;
            await interaction.reply(`${reply}\n-# 📕<@${userid}> 님이 가르쳐 주셨다냥!`);
        } else {
            await interaction.reply('그건 모르겠다냥!');
        }
    }
};
