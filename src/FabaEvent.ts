import FabaCore from "./FabaCore";

/**
 * FabaEvent which is used to communicate with the Commands
 */
export default class FabaEvent {

    identifyer: string;
    cbs: any;
    sessionData:any;
    /**
     *
     * @param identifyer
     */
    constructor(identifyer?: string) {
        this.identifyer = identifyer;
    }

    /**
     *
     */
    callBack() {
        if(this.cbs){
            this.cbs(this);
        }
    }

    /**
     *
     * @returns {string}
     */
    get name(): string {
        return this.identifyer;
    }

    /**
     *
     * @param delay
     * @param calb
     * @param result
     */
   async delayDispatch(delay: number, calb?: any, result?: FabaEventResultType): Promise<any> {
        setTimeout(()=> {
            if (calb) {
                this.cbs = calb;
            }

            return FabaCore.dispatchEvent(this, result);
        }, delay);
    }

    /**
     *
     * @param calb
     * @param result
     * @returns {Promise<any>}
     */
    async dispatch(calb?: any, result: FabaEventResultType = FabaEventResultType.EXECUTE) : Promise<any>{
        if (result === FabaEventResultType.EXECUTE) {
            return new Promise((resolve, reject)=> {
                this.cbs = resolve;
                FabaCore.dispatchEvent(this, result);
            });
        } else {
            FabaCore.dispatchEvent(this, result);
        }

        return null;
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
    OFFLINE
}

export interface IFabaEvent {
}
