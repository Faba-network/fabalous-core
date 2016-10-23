import FabaCore from "./FabaCore";

export default class FabaEvent {

    identifyer: string;
    cbs: any;

    constructor(identifyer: string) {
        this.identifyer = identifyer;
    }

    callBack() {
        if(this.cbs){
            this.cbs(this);
        }
    }

    get name(): string {
        return this.identifyer;
    }

    delayDispatch(delay: number, calb?: any, result?: FabaEventResultType): void {
        setTimeout(()=> {
            if (calb) {
                this.cbs = calb;
            }

            FabaCore.dispatchEvent(this, result);
        }, delay);
    }

    async dispatch(calb?: any, result?: FabaEventResultType): Promise<any> | null{
        switch (result){
            case FabaEventResultType.RESULT, FabaEventResultType.ERROR, FabaEventResultType.OFFLINE, FabaEventResultType.TIMEOUT:
                console.log("result");
                FabaCore.dispatchEvent(this, result);
                break;

            default:
                console.log("prmoise");
                return new Promise((resolve, reject)=> {
                    this.cbs = resolve;
                    FabaCore.dispatchEvent(this, result);
                });
        }

    }
}

export enum FabaEventResultType{
    EXECUTE,
    RESULT,
    ERROR,
    TIMEOUT,
    OFFLINE
}