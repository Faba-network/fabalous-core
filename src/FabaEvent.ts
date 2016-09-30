import FabaCore from "./FabaCore";

export default class FabaEvent {

    identifyer: string;
    cbs: any;

    constructor(identifyer: string) {
        this.identifyer = identifyer;
    }

    callBack() {
        this.cbs(this);
    }

    get name(): string {
        return this.identifyer;
    }

    async dispatch(calb?: any, result?: boolean): Promise<any> {
        if (result === true) {
            FabaCore.dispatchEvent(this, result);
        } else {
            return new Promise((resolve, reject)=> {
                this.cbs = resolve;
                FabaCore.dispatchEvent(this, result);
            });
        }
    }

    delayDispatch(delay: number, calb?: any, result?: boolean): void {
        setTimeout(()=> {
            if (calb) {
                this.cbs = calb;
            }

            FabaCore.dispatchEvent(this, result);
        }, delay);
    }
}