
import { SocksBotApi } from "../../socks-bot-api";
import { RedisServices } from "../../services/redis.services";
import { Message } from 'node-telegram-bot-api';
import { MongoClient } from 'mongodb';

export class ControllController {
    private redisServices = RedisServices.getInstance();
    private chatId: number;
    private msgId: number;
    private text: string;
    private mongoClient = new MongoClient('mongodb://localhost', { useNewUrlParser: true })
    constructor(
        private bot: SocksBotApi,
        private messageFromBot: Message
    ) {
        this.chatId = this.messageFromBot.chat.id;
        this.msgId = this.messageFromBot.message_id;
        this.text = this.messageFromBot.text;
    }

    initNote() {
        this.redisServices.setItem('initialControllMsgId', this.msgId);
        this.bot.sendMessage(this.chatId, '🍭 Какой сахар сейчас?');
    }

    addSugar() {
        this.mongoClient.connect((error, connect) => {
            const db = connect.db('sugar');
            const collection = db.collection('sugar');

            collection.insertOne({
                sugar: this.text,
                time: new Date().toISOString()
            }, (error, result) => {
                connect.close()
            });
        });

        this.redisServices.setItem('initialControllMsgId', false);
        this.bot.sendMessage(this.chatId, 'Замер успешно добавлен! 🌈');
    }
}