import { Message } from 'node-telegram-bot-api';
import { SocksBotApi } from '../../socks-bot-api/socks-bot-api';
import { reportButtons } from '../../buttons/report.button';
import { ISugar } from '../../models/sugar';
import { ReportService } from './report.service';

export class ReportController {
    private currentWeeklyDay = new Date().getDay();
    private currentDay = new Date().getDate();
    private DAYS_A_WEEK = 7;
    private DAYS_A_MONTH = 30;
    private reportService = new ReportService();

    constructor(
        private bot: SocksBotApi,
        private messageFromBot: Message
    ) { }

    private createOffsetDate(offset: number):string {
        const comparableDay = new Date().getDate() + offset;
        const comparableDate = new Date().setDate(comparableDay);

        return new Date(comparableDate).toISOString()
    }

    private createDateForResponse(time: string): string {
        return new Date(time).toLocaleTimeString();
    }

    private addDateInHeader(currentDate: string, previusDate: string) {
        return new Date(currentDate).getDay() > new Date(previusDate).getDay()
            ? `\n--- 🗓 ${new Date(currentDate).toLocaleDateString('eu')}---`
            : ``
    }

    private getReportReponse(sugar: ISugar[]): string {
        return sugar
            .map((element, index) => `
            ${index > 0
                    ? this.addDateInHeader(element.time, sugar[index - 1].time)
                    : `--- 🗓 ${new Date(element.time).toLocaleDateString('eu')}---`
                }
            \n🕰 Время: ${this.createDateForResponse(element.time)}.    🍭 Сахар: ${element.sugar}.    💉 Инсулин: ${this.createInsulinForResponse(element.insulin)}.`)
            .join('');
    }

    private createInsulinForResponse(insulin: number): string {
        return insulin ? `${insulin}` : 'без подколки'
    }

    selectReport() {
        this.bot.sendMessage(this.messageFromBot.chat.id, 'Выберите временной промежуток отчета', reportButtons)
    }

    async dailyReport() {
        const sugar = await this.reportService.getReport(this.createOffsetDate(-1), this.createOffsetDate(1));
        this.bot.sendMessage(this.messageFromBot.chat.id, this.getReportReponse(sugar));
    }

    async weeklyReport() {
        const sugar = await this.reportService.getReport(
            this.createOffsetDate(-(this.currentWeeklyDay - 1)),
            this.createOffsetDate(-(this.DAYS_A_WEEK - this.currentWeeklyDay))
        );
        this.bot.sendMessage(this.messageFromBot.chat.id, this.getReportReponse(sugar));
    }

    async  monthlyReport() {
        const sugar = await this.reportService.getReport(
            this.createOffsetDate(-(this.currentDay - 1)),
            this.createOffsetDate(this.DAYS_A_MONTH)
        );
        this.bot.sendMessage(this.messageFromBot.chat.id, this.getReportReponse(sugar));
    }
}