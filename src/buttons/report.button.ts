import  { createTableButtons } from './fabrica.button';

export const reportButtons = createTableButtons([
    {
        text: 'Выгрузка за день', id: 'report/day'
    },
    {
        text: 'Выгрузка за неделю', id: 'report/week'
    },
    {
        text: 'Выгрузка за месяц', id: 'report/month'
    }
]);