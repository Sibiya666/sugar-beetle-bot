import { RedisServices } from "./services/redis.services";
import { Router } from './router';
import { SocksBotApi } from './socks-bot-api/socks-bot-api';
import { Message } from 'node-telegram-bot-api';

const redisServices = RedisServices.getInstance();
redisServices.setItem('initialPunctureMsgId', false);
redisServices.setItem('initialControllMsgId', false);

export class UserInputRouter {
    constructor(private msg: Message, private bot: SocksBotApi) { }
    
    async init() {
        const initialMsgsId = await Promise.all([
            redisServices.getItem('initialControllMsgId'),
            redisServices.getItem('initialPunctureMsgId')
        ]);
        
        const [controllMsgId, punctureMsgId] = initialMsgsId.map(id => JSON.parse(id));
        
        switch (true) {
            case !!controllMsgId:
                new Router('controll', this.msg, this.bot).init();
                break;
            case !!punctureMsgId:
                new Router('puncture', this.msg, this.bot).init();
                break;
        }
    }
}