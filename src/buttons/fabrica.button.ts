import { IButton } from "../models/button";
const keyboardWrapper = require('node-telegram-keyboard-wrapper');

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

const createTableButton = (button: IButton) => {
    return { text: button.text, callback_data: button.id }
};

export const createTableButtons = (items: IButton[]) => {
    const buttons = new keyboardWrapper.InlineKeyboard();
    const numbersOfCells  =  items.length;

    for (let i = 0; i < numbersOfCells; i = i + 2) {
        
        if (i + 1 < numbersOfCells) {
            buttons.addRow(
                createTableButton(items[i]),
                createTableButton(items[i+1])
            )
        } else {
            buttons.addRow(createTableButton(items[i]))
        }
    }

    return buttons.build()
}