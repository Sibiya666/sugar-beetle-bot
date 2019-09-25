import { SocksBotApi } from './socks-bot-api/socks-bot-api';
import { routs } from './routs';
import { Message} from 'node-telegram-bot-api';

export class Router {
    private routs = routs;
    private rout: string;
    private endPoint: string;
    private params: string[];
    constructor(
        private path: string,
        private messageFromBot: Message,
        private bot: SocksBotApi,
    ) {
        const [rout, endPoint, ...params] = path.split('/');
        this.rout = rout;
        this.endPoint = endPoint;
        this.params = params;
    }

    init() {
        new this.routs[this.rout](this.bot, this.messageFromBot, this.endPoint, this.params);
    }
}