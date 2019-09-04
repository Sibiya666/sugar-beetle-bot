import SocksBotApi from '../../socks-bot-api/model';

export class AdminController  {
    constructor(
        private bot: SocksBotApi,
        private chatId: number) { 
        console.log('initAdmin')
        }
}