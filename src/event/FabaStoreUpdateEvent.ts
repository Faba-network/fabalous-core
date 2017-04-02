import FabaEvent from "../FabaEvent";

export default class FabaStoreUpdateEvent extends FabaEvent {
    data: any;

    constructor(e: any) {
        super("FabaStoreUpdateEvent");

        this.data = e;
    }
}