import FabaMediator from "./FabaMediator";
import FabaEvent, {FabaEventResultType} from "./FabaEvent";

export interface IFabaMediatorList {
    cls: any,
    mediator: FabaMediator
}

export default class FabaCore {
    static mediators: Array<IFabaMediatorList> = [];
    static events: any = {};
    static vos: any = {};

    private static store: any;

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
        for (var a: number = 0; a < this.mediators.length; a++) {
            var routeItem: Array<any> = this.mediators[a].mediator.cmdList;

            for (var b: number = 0; b < routeItem.length; b++) {
                if (routeItem[b] && routeItem[b].event && routeItem[b].id) {
                    if (routeItem[b].id === event.name) {
                        switch (resu) {
                            case FabaEventResultType.EXECUTE:
                                new routeItem[b].cmd(this.store).execute(event);
                                break;
                            case FabaEventResultType.RESULT:
                                new routeItem[b].cmd(this.store).result(event);
                                break;
                            case FabaEventResultType.ERROR:
                                new routeItem[b].cmd(this.store).error(event);
                                break;
                            case FabaEventResultType.TIMEOUT:
                                new routeItem[b].cmd(this.store).timeout(event);
                                break;
                            default:
                                new routeItem[b].cmd(this.store).execute(event);

                        }
                    }
                }
            }
        }
    }
}

export declare var CLIENT;
export declare var SERVER;