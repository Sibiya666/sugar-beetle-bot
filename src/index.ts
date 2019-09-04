import SocksBotApi from './socks-bot-api/model';
import { ADMIN_USERS } from './models/admin';
import { adminHelpButtons } from './buttons/admin.button';
import { userHelpButtons } from './buttons/user.button';
import { Router } from './router';

const AGENT = require('socks5-https-client/lib/Agent');
const TOKEN = '853423670:AAE-4tOmBqDwqFxWYx7e3cxIFK8AsdzSD4o';

const bot = new SocksBotApi(TOKEN, {
    polling: true,
    request: {
        url: 'localhost',
        agentClass: AGENT,
        agentOptions: {
            socksHost: "127.0.0.1",
            socksPort: "9150",
        }
    }
});

bot.onText(/\/start/, (msg, match) => {
    console.log('start')
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Необходимо авторизоваться`, {
        reply_markup: {
          keyboard: [
            [{ text: 'Авторизация', request_contact: true }]
          ]
        }
      });
})

bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;
       
    if (ADMIN_USERS[msg.chat.username]) {
        bot.sendMessage(chatId, `Список команд`, adminHelpButtons);
        return 
    }

    bot.sendMessage(chatId, `Список команд`, userHelpButtons);
})


bot.on('callback_query', (event) => {
    new Router(event.data, event.message.chat.id, bot).init()
})




