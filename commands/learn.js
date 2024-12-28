const { ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');

let knowledgeBase = {};

if (fs.existsSync('./Datas/knowledge.json')) {
    const data = fs.readFileSync('./Datas/knowledge.json', 'utf-8');
    knowledgeBase = JSON.parse(data);
}

module.exports = {
    data: {
        name: 'learn',
        description: '여러분이 봇을 더 똑똑하게 만듭니다.',
        options: [
            {
                name: 'question',
                type: ApplicationCommandOptionType.String,
                description: '질문',
                required: true,
            },
            {
                name: 'answer',
                type: ApplicationCommandOptionType.String,
                description: '답변',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer = interaction.options.getString('answer');

        if (knowledgeBase[question]) {
            await interaction.reply("그건 이미 알고 있다냥!");
            return;
        }

        knowledgeBase[question] = [{ reply: answer, userid: interaction.user.id }];
        fs.writeFileSync('./Datas/knowledge.json', JSON.stringify(knowledgeBase, null, 2));
        await interaction.reply(`옼케! "${question}" 이라고 하시면 "${answer}"이라고 대답할게요!`);
    }
};
