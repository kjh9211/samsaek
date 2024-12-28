// index.js
const { Client, GatewayIntentBits, Events } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./hidden/config.json', 'utf-8'));
const errorHandler = require('./utils/errorHandler');
const { registerCommands } = require('./depoly-commands');
const { processWebhookClient } = require('./utils/webhook.js');

// 클라이언트 초기화
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

// 명령어 로드
client.commands = new Map();
const commands = [
    require('./commands/devcommand.js'),
    require('./commands/ping.js'),
    require('./commands/chat.js'),
    require('./commands/learn.js'),
    require('./commands/purple.js'),
    require('./commands/dohwa.js'),
];


// 이벤트 로드
const interactionCreate = require('./events/interactionCreate');

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// 명령어 등록
registerCommands(config.token, config.botid, commands);
commands.forEach(cmd => client.commands.set(cmd.data.name, cmd));

// 이벤트 핸들러 설정
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    try {
         await processWebhookClient.send(`\`${message.guild.name}\` 서버의 \`${message.channel.name}\` 채널에서 \`${message.content}\`를 보냈습니다. 처리를 시작합니다..`);
        
         // 봇 호출 확인
         if (message.content.startsWith(`<@${client.user.id}>`)) {
             const startTime = client.readyTimestamp;
             const currentTime = Date.now();
             const elapsedMilliseconds = currentTime - startTime;
             const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
             const elapsedMinutes = Math.floor(elapsedSeconds / 60);
             const elapsedHours = Math.floor(elapsedMinutes / 60);
 
             await message.reply(`봇이 시작된 시간: <t:${Math.floor(startTime / 1000)}:F>\n경과 시간: ${elapsedHours}시간 ${elapsedMinutes % 60}분 ${elapsedSeconds % 60}초`);
             console.log("1 if passed");
             return; // 첫 번째 조건이 만족되면 여기서 종료
         } else {
             console.log("1 if not passed"); // 첫 번째 조건이 만족되지 않았을 때
         }
 
         // 질문 처리
         if (message.content.trim().startsWith("삼색아")) {
             const question = message.content.slice(4).trim();
             if (!question){
                message.reply(`왜부르냥?`)
                return;
             }
             if (question === "안녕?" || question === "안녕"){
                message.reply(`${message.author.displayName} 반갑다냥!`)
                return; 
             }
             const testData = testData(question);
             if (testData) {
                 const reply = testData.reply;
                 const userid = testData.userid;
                 await message.reply(`${reply}\n-# 📕<@${userid}> 님이 가르쳐 주셨다냥!`);
             } else {
                 await message.reply('그건 모르겠다냥!');
             }
             console.log("2 if passed");
         } else {
             console.log("2 if not passed"); // 두 번째 조건이 만족되지 않았을 때
         }
         console.log(message.content)
     } catch (error) {
         await errorHandler.sendErrorToWebhook('Message Handling Error', error.code || 'Unknown', error.message, message);
         console.error("메시지 처리 중 오류 발생:", error); // 콘솔에 에러 로그 추가
     }} );
client.on(Events.InteractionCreate, (interaction) => interactionCreate(client, interaction, processWebhookClient));

client.login(config.token);
