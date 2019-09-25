import * as BotApi from 'node-telegram-bot-api';
import * as request from 'request';
import * as http from 'http';

interface ISocksConstructorOptions extends BotApi.ConstructorOptions {
    polling: boolean,
    request: ISocksRequest
}

interface ISocksRequest extends request.OptionsWithUrl {
    agentClass: any,
    agentOptions: IAgentOptions
}

interface IAgentOptions extends http.AgentOptions {
    socksHost: string,
    socksPort: string
}

export class SocksBotApi extends BotApi {
    constructor(private token: string, private options?: ISocksConstructorOptions) {
        super(token, options)
    }
}
