import FabaWebApplication from "../runtimes/FabaWebApplication";
export default class FabaCommand {
    constructor() {
    }
    sendToEndpoint(event, endPoint) {
        FabaWebApplication.sendToEndpoint(event, endPoint);
    }
}
