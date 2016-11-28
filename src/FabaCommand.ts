import FabaEvent from "./FabaEvent";
import FabaCoreRuntime from "./FabaCoreRuntime";

export default class FabaCommand<TStore> {
    store: TStore;

    constructor(store: TStore) {
        this.store = store;
    }

    protected sendToEndpoint(event:FabaEvent, endPoint?:string):void {
        FabaCoreRuntime.sendToEndpoint(event, endPoint);
    }
}
