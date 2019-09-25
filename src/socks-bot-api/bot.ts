import { SocksBotApi } from "./socks-bot-api";

const AGENT = require('socks5-https-client/lib/Agent');
const TOKEN = '853423670:AAE-4tOmBqDwqFxWYx7e3cxIFK8AsdzSD4o';

export const bot = new SocksBotApi(TOKEN, {
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