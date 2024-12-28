const { ApplicationCommandOptionType } = require('discord.js');
const math = require('mathjs');

function safeCalculate(expression) {
    try {
        // 팩토리얼 연산을 지원하기 위해 math.factorial 사용
        const result = math.evaluate(expression.replace(/(\d+)!/g, 'math.factorial($1)')); 
        return result;
    } catch (error) {
        console.error("계산 중 오류 발생:", error);
        return "계산 오류";
    }
}

module.exports = {
    data: {
        name: '간단한연산',
        description: '이 명령어는 간단한 연산기능을 지원 합니다',
        options: [
            {
                name: '식',
                type: ApplicationCommandOptionType.String,
                description: '식',
                required: true,
            }
        ],
    },
    async execute(interaction) {
        const question = interaction.options.getString('식');
        if (safeCalculate(question)==="계산 오류"){await interaction.reply("어라? 수가 아니거나 수가 너무 큰거 같아요!")}else{
        await interaction.reply(`계산결과는 ${safeCalculate(question)} 이에요!`)}
    }
};
