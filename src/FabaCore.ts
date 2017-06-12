import FabaMediator, {INameToValueMap} from "./FabaCoreMediator";
import FabaEvent, {FabaEventResultType} from "./FabaEvent";
import FabaStore from "./store/FabaStore";
import {IMediatorCmdList} from "./FabaCoreMediator";

/**
 * Fabalous Core Class
 *
 * Stores Mediators, Events and Vo's
 *
 * Handel's also the EventDispatching.
 */

export interface IFabaMediatorList {
    cls: any,
    mediator: FabaMediator
}
 
/**
 * Dismissed module comment.
 * This is the longer comment but will be dismissed in favor of the preferred comment.
 */
export default class FabaCore {
    /*
    List of Mediators
     */
    static mediators: Array<IFabaMediatorList> = [];

    /*
     * @param events List of Events (Obsulete?)
     */
    static events: any = {};

    /*
     * List of Vo's (Obsulete?)
     */
    static vos: any = {};


    /*
    The source of truth
     */
    static store: FabaStore<any>;

    /**
     * Core class
     * @param store accepts one single Store "The source of true". If the store is already set the new one would not be used.
     */
    constructor(store:FabaStore<any>){
        if (!FabaCore.store) FabaCore.store = store;
        else console.log("Store already set");
    }

    static setTestStore(store: FabaStore<any>) {
        //if (TEST) {
            FabaCore.store = store;
       // } else {
         //   throw "Use this method only for Tests";
       // }
    }


    /**
     * Reset mediators / Events and Vo's dictornary (usefull for HMR)
     */
    static reset() {
        FabaCore.mediators = [];
        FabaCore.events = [];
        FabaCore.vos = [];
    }


    /**
     * Add Mediator if the Mediator not already exist in the Dictornary
     * @param cls MediatorClass
     */
    static addMediator(cls: typeof FabaMediator): boolean {
        for (let i = 0; i < FabaCore.mediators.length; i++) {
            const obj = FabaCore.mediators[i].cls;

            if (obj == cls) {
                return false;
            }
        }

        const mediator:FabaMediator = new cls;

        for (let item in mediator.cmdList) {
            if (FabaCore.events[item]){
                FabaCore.events[item].commands = FabaCore.events[item].commands.concat(mediator.cmdList[item].commands);
            } else {
                FabaCore.events[item] = {event:mediator.cmdList[item].event, commands:mediator.cmdList[item].commands};
            }
        }

        FabaCore.mediators.push({cls: cls, mediator: mediator});
        
        return true;
    }

     /**
     * Go through the routes and create the command and execute
     * @param event FabaEvents
     * @param resu FabaEventResultType
     */

    static dispatchEvent(event: FabaEvent, resu?: FabaEventResultType) {
        for (let a: number = 0; a < this.mediators.length; a++) {
            const routeItem: INameToValueMap = this.mediators[a].mediator.cmdList;
            if (routeItem && routeItem[event.identifyer]){
                for (let obj of routeItem[event.identifyer].commands) {

                    if (process.env.FABA_DEBUG == 2){
                        console.log(event);
                        console.log(FabaCore.store);
                    }

                    const store = this.mediators[a].mediator.store || FabaCore.store;

                    switch (resu) {
                        case FabaEventResultType.EXECUTE:
                            new obj.cmd(store).execute(event);
                            break;
                        case FabaEventResultType.RESULT:
                            new obj.cmd(store).result(event);
                            break;
                        case FabaEventResultType.ERROR:
                            new obj.cmd(store).error(event);
                            break;
                        case FabaEventResultType.TIMEOUT:
                            new obj.cmd(store).timeout(event);
                            break;
                        default:
                            new obj.cmd(store).execute(event);
                    }
                }
            }
        }
    }
}