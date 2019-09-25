import { SocksBotApi } from "../../socks-bot-api";
import { RedisServices } from "../../services/redis.services";
import { Message } from 'node-telegram-bot-api';
import { MongoClient } from 'mongodb';

export class PunctureController {
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
        this.redisServices.setItem('initialPunctureMsgId', this.msgId);
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

        this.bot.sendMessage(this.chatId, 'Сколько вкололи  инсулина?');
    }

    addInsulin() {
        this.mongoClient.connect(async (error, connect) => {
            const db = connect.db('sugar');
            const collection = db.collection('sugar');
            const lastItem = await collection.find().sort({ $natural: -1 }).limit(1).toArray();

            collection.update({ _id: lastItem[0]._id }, {
                $set: {
                    insulin: this.text
                }
            });

        });

        this.bot.sendMessage(this.chatId, 'Подколка успешно добавлена! 🌈');
        this.redisServices.setItem('initialPunctureMsgId', false);
    }
}