import SocksBotApi from "../socks-bot-api/socks-bot-api";

export interface IController {
    new(
        bot: SocksBotApi,
        chatId: number,
        endPoint: string,
        params: any
    )
}
