import AdminController from './controller/admin';
// import { UserController } from './controller/user';
import SocksBotApi from './socks-bot-api/model';


export class Router  {
    routs = {
        'admin': AdminController,
        // 'user': UserController
    };
    
    controller: any;
    controllerName: string;
    endPoint: string;
    params: string[];

    constructor(
        private rout: string,
        private chatId: number,
        private bot: SocksBotApi
    ) {
        const [controllerName, endPoint, ...params] = rout.split('/');
        this.controllerName = controllerName;
        this.endPoint = endPoint;
        this.params = params;
    }
    
    private initController() {
        this.controller = new this.routs[this.controllerName](this.chatId, this.bot);
    }

    private initEndPoint() {
        this.controller[this.endPoint]();
    }

    init() {
        this.initController();
        this.initEndPoint()
    }
}