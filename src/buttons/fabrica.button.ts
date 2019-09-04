import { IButton } from "./model.button";

export const createButton = (text: string, id: string) => {
    return {
        reply_markup: {
            inline_keyboard: [
                [{
                    text,
                    callback_data: id
                }]
            ],
            resize_keyboard: true
        }
    }
};

export const createButtons = (list: IButton[]) => {
    return {
        reply_markup: {
            inline_keyboard: [
                list.map(item => ({
                    text: item.text,
                    callback_data: `${item.id}`
                }))
            ],
            resize_keyboard: true
        }
    }
};