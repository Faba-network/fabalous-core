import FabaEvent from "./FabaEvent";
import FabaCoreRuntime from "./FabaCoreRuntime";

export default class FabaCommand {
    store: any;

    constructor(store?: any) {
        this.store = store;
    }

    protected sendToEndpoint(event:FabaEvent, endPoint?:string):void {
        FabaCoreRuntime.sendToEndpoint(event, endPoint);
    }
}
