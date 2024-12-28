const { ApplicationCommandOptionType } = require('discord.js');
const { webhookClient } = require('../utils/webhook');
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./hidden/config.json', 'utf-8'));

module.exports = {
    data: {
        name: 'devcommand',
        description: '관리자 관련 명령어',
        options: [
            {
                name: 'eval',
                description: '오류 코드를 표시합니다.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'evalcommand',
                        description: '오류 코드를 입력하세요.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: "deleteword",
                description: "단어삭제",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "question",
                        description: "삭제할 단어",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            }
        ],
    },
    async execute(interaction, knowledgeBase, fs, ownerId) {
        const { commandName, options } = interaction;
        const subCommand = options.getSubcommand();

        if (interaction.user.id != config.ownerId) {
            await interaction.reply('권한이 없다냥!');
            return;
        }

        if (subCommand === 'deleteword') {
            const question = options.getString('question');
            if (knowledgeBase[question]) {
                delete knowledgeBase[question];
                await interaction.reply(`"${question}" 질문을 지웠다냥!`);
                fs.writeFileSync('knowledge.json', JSON.stringify(knowledgeBase, null, 2));
            } else {
                await interaction.reply('그런건 배운적이 없다냥!');
            }
        } else if (subCommand === 'eval') {
            const evalcommand = options.getString('evalcommand');
            try {
                const result = eval(evalcommand);
                await interaction.reply(`결과: ${result}`);
            } catch (error) {
                await errorHandler.sendErrorToWebhook('Eval Error', '500', error.message, interaction);
            }
        }
    }
};
