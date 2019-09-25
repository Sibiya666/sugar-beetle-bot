
import { RedisClient } from 'redis';


// const Service = () : GenericClassDecorator<any> => {
//     return (target: any) => {
//       // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
//     };
//   };

// export type GenericClassDecorator<T> = (target: T) => void;

// @Service()
export class RedisServices {
    private static instance: RedisServices;
    private redisOptions = {
        host: 'localhost'
    }
    private client = new RedisClient(this.redisOptions);

    id = 1;
    constructor() { }

    static getInstance() {
        if (!RedisServices.instance) {
            RedisServices.instance = new RedisServices()
        }

        return RedisServices.instance
    }

    getItem(key: string): Promise<any> {

        return new Promise((resolve, reject) => {
            this.client.get(key, (error, result) => resolve(result))
        })

    }

    setItem(key: string, value: any) {
        this.client.set(key, value);
    }
}