const fs = require('fs');
let knowledgeBase = {};

if (fs.existsSync('./Datas/knowledge.json')) {
    const data = fs.readFileSync('./Datas/knowledge.json', 'utf-8');
    knowledgeBase = JSON.parse(data);
}

function getTestData(question) {
    if (knowledgeBase[question] && knowledgeBase[question].length > 0) {
        const firstEntry = knowledgeBase[question][0];
        return {
            reply: firstEntry.reply,
            userid: firstEntry.userid,
        };
    }
    return null;
}

module.exports = { getTestData, knowledgeBase };
