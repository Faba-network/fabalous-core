import FabaCore from "./FabaCore";

/**
 * FabaEvent which is used to communicate with the Commands
 */
export default class FabaEvent {
    sessionData:any;
    /**
     *
     * @param identifyer
     */
    constructor(public eventIdentifyer?: string) {
    }

    /**
     *
     * @param delay
     * @param calb
     * @param result
     */
   async delayDispatch(delay: number, calb?: any, result?: FabaEventResultType): Promise<any> {
       return await setTimeout(async ()=> {
            return await FabaCore.dispatchEvent(this, result);
        }, delay);
    }

    /**
     *
     * @param calb
     * @param result
     * @returns {Promise<any>}
     */
    async dispatch(e?: any, result: FabaEventResultType = FabaEventResultType.EXECUTE) : Promise<this>{
        if (result === FabaEventResultType.EXECUTE) {
            return await FabaCore.dispatchEvent(this, result);
        } else {
            FabaCore.dispatchEvent(this, result);
        }

        return null;
    }

    syncDispatch() : this{
        return FabaCore.syncDispatchEvent(this);
    }
}

/**
 *
 */
export enum FabaEventResultType{
    EXECUTE,
    RESULT,
    ERROR,
    TIMEOUT,
    OFFLINE,
    SYNC
}

export interface IFabaEvent {
}
