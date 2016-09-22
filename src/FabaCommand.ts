import FabaEvent from "./FabaEvent";
import FabaCoreRuntime from "./FabaCoreRuntime";

export default class FabaCommand {
    constructor() {
    }

    protected sendToEndpoint(event:FabaEvent, endPoint?:string):void {
        FabaCoreRuntime.sendToEndpoint(event, endPoint);
    }
}
