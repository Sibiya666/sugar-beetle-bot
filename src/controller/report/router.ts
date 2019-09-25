import { ReportController } from './report.controller';
import { SocksBotApi } from '../../socks-bot-api';
import { Message } from 'node-telegram-bot-api';
import { RedisServices } from '../../services/redis.services';

export class Report {
    private controller = new ReportController(this.bot, this.messageFromBot);

    constructor(
        private bot: SocksBotApi,
        private messageFromBot: Message,
        private endPoint: string,
        private params: any
    ) {
        this.router();
    }

    private async router() {

        switch (true) {
            case this.endPoint === 'day':
                this.controller.dailyReport();
                break;
            case this.endPoint === 'week':
                this.controller.weeklyReport();
                break;
            case this.endPoint === 'month':
                this.controller.monthlyReport();
                break;
            default:
                this.controller.selectReport()
        }
    }

}