import { ControllController } from './controll.controller';
import { SocksBotApi } from '../../socks-bot-api';
import { Message } from 'node-telegram-bot-api';
import { RedisServices } from '../../services/redis.services';
import { OffsetMsg } from './models';

export class Controll {
    private controller = new ControllController(this.bot, this.messageFromBot);
    private redisServices = RedisServices.getInstance();
    private
    private msgId: number;

    constructor(
        private bot: SocksBotApi,
        private messageFromBot: Message,
        private endPoint: string,
        private params: any
    ) {
        this.msgId = this.messageFromBot.message_id;
        this.router();
    }

    private async router() {
        const initialControllMsgId = await this.redisServices.getItem('initialControllMsgId');
            
        switch (+initialControllMsgId) {
            case ((this.msgId - OffsetMsg.ADD_SUGAR) || (this.msgId - 1)):
                this.controller.addSugar();
                break;
            default:
                this.controller.initNote();
        }
    }

}