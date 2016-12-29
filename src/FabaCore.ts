import FabaMediator from "./FabaMediator";
import FabaEvent, {FabaEventResultType} from "./FabaEvent";
import FabaStore from "./FabaStore";

export interface IFabaMediatorList {
    cls: any,
    mediator: FabaMediator
}

export default class FabaCore {
    static mediators: Array<IFabaMediatorList> = [];
    static events: any = {};
    static vos: any = {};

    private static store: FabaStore<any>;

    constructor(store:FabaStore<any>){
        FabaCore.store = store;
    }

    static setTestStore(store: FabaStore<any>) {
        //if (TEST) {
            FabaCore.store = store;
       // } else {
         //   throw "Use this method only for Tests";
       // }
    }

    static reset() {
        FabaCore.mediators = [];
        FabaCore.events = [];
        FabaCore.vos = [];
    }

    static addMediator(cls: any): boolean {
        for (var i = 0; i < FabaCore.mediators.length; i++) {
            var obj = FabaCore.mediators[i].cls;

            if (obj == cls) {
                return false;
            }
        }

        FabaCore.mediators.push({cls: cls, mediator: new cls});
        return true;
    }

    static dispatchEvent(event: FabaEvent, resu?: FabaEventResultType) {
        for (let a: number = 0; a < this.mediators.length; a++) {
            const routeItem: Array<any> = this.mediators[a].mediator.cmdList;
            for (let obj of routeItem[event.identifyer]) {
                switch (resu) {
                    case FabaEventResultType.EXECUTE:
                        new obj.cmd(FabaCore.store).execute(event);
                        break;
                    case FabaEventResultType.RESULT:
                        new obj.cmd(FabaCore.store).result(event);
                        break;
                    case FabaEventResultType.ERROR:
                        new obj.cmd(FabaCore.store).error(event);
                        break;
                    case FabaEventResultType.TIMEOUT:
                        new obj.cmd(FabaCore.store).timeout(event);
                        break;
                    default:
                        new obj.cmd(FabaCore.store).execute(event);

                }
            }
        }
    }
}