import { IRouts } from './models/routs';
import { Report } from './controller/report';
import { Puncture } from './controller/puncture';
import { Controll } from './controller/controll';

export const routs: IRouts = {
    controll: Controll,
    puncture: Puncture,
    report: Report
} 