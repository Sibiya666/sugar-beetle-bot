import { PunctureController } from './puncture.controller';
import { SocksBotApi } from '../../socks-bot-api';
import { Message } from 'node-telegram-bot-api';
import { RedisServices } from '../../services/redis.services';
import { OffsetMsg } from './models';

export class Puncture {
    private redisServices = RedisServices.getInstance();
    private controller = new PunctureController(this.bot, this.messageFromBot);
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
        const initialPunctureMsgId = await this.redisServices.getItem('initialPunctureMsgId');
        switch (+initialPunctureMsgId) {
            case ((this.msgId - OffsetMsg.ADD_SUGAR) || (this.msgId - 1)):
                this.controller.addSugar();
                break;
            case (this.msgId - OffsetMsg.ADD_INSULIN):
                this.controller.addInsulin();
                break;
            default:
                this.controller.initNote();
        }
    }

}