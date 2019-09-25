import  { createTableButtons } from './fabrica.button';

export const userHelpButtons = createTableButtons([
    {
        text: 'Добавить подколку', id: 'puncture'
    },
    {
        text: 'Добавить замер', id: 'controll'
    },
    {
        text: 'Получить отчет', id: 'report'
    },
]);