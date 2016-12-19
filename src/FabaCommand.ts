import FabaEvent from "./FabaEvent";
import FabaCoreRuntime from "./FabaCoreRuntime";
import FabaStore from "./FabaStore";
export default class FabaCommand<TStore> {
    private store: FabaStore<TStore>;
    data: TStore;

    constructor(store) {
        this.store = store;
        this.data = store.data;
    }

    protected sendToEndpoint(event:FabaEvent, endPoint?:string):void {
        FabaCoreRuntime.sendToEndpoint(event, endPoint);
    }

    protected setStore(path: string, value: any, update: boolean = true) {
        this.store.set(path,value,update);
    }
}
