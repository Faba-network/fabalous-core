import FabaEvent from "./FabaEvent";
export default class FabaCommand {
    constructor();
    protected sendToEndpoint(event: FabaEvent, endPoint?: string): void;
}
