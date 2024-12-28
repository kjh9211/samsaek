이 폴더는 봇 삼색이의 소스코드입니다.
따라서 이 코드를 복제, 복사등은 저작권법을 위반할 수 있으므로 참고해주시기 바랍니다.
아래는 모듈이이 각각 어떤역할을 하는지 나타냅니다.

command 폴더:
    chat.js: /chat 명령어를 처리하는 모듈입니다
    devcommand.js: /devcommand {하위명령어} 명령어를 처리하는 모듈입니다
    learn.js: /learn 명령어를 처리하는 모듈입니다
    ping.js: /ping 명령어를 처리하는 모듈입니다
    purple.js: /퍼플 명령어를 처리하는 모듈입니다

events 폴더:
    interactionCreate.js: / 명령어등 각종 상호작용을 처리하는 모듈입니다
    messageCreate.js: 삼색아 로 시작하는 메세지를 처리하는 모듈입니다

utils 폴더:
    errorHandler.js: 에러가 발생했을때 웹훅으로 개발자에게 전하는 모듈입니다
    knowledge.js: 지식관련 데이터를 취급하는 모듈입니다
    webhook.js: 모든 웹훅을 관리하는 모듈입니다

depoly-commands.js: 명령어를 등록하는데 사용하는 코드입니다
index.js: 봇의 매인코드로 봇을 실행하는데 사용합니다
readme.md: 이 문서 입니다