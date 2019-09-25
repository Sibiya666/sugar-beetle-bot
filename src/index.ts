import { userHelpButtons } from './buttons/user.button';
import { Router } from './router';
import { bot } from './socks-bot-api';
import {UserInputRouter} from './userInputRouter';

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Список команд`, userHelpButtons);
})

bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Список команд`, userHelpButtons);
})

bot.on('text', msg => new UserInputRouter(msg, bot).init());


bot.on('callback_query', (event) => {
    new Router(event.data, event.message, bot).init()
})




