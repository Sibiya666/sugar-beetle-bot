import { MongoClient } from 'mongodb';
import { ISugar } from '../../models/sugar';


export class ReportService {
    private mongoClient = new MongoClient('mongodb://localhost', { useNewUrlParser: true });

    constructor() { }

    getReport(startDate: string, endDate: string): Promise<ISugar[]> {
        return new Promise((resolve, reject) => {
            this.mongoClient.connect(async (error, connect) => {
                const sugar: ISugar[] = await connect.db('sugar').collection('sugar').find({
                    time: {
                        $gt: startDate,
                        $lt: endDate
                    }
                }).toArray();
                connect.close();
                resolve(sugar);
            })
        })
    }
}