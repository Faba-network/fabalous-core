import FabaEvent from "../FabaEvent";

/**
 * Event that fires if the store (single source of trough)
 */
export default class FabaStoreUpdateEvent extends FabaEvent {
    data: any;

    /**
     * TODO: Is this class used?
     * @param e
     */
    constructor(e: any) {
        super("FabaStoreUpdateEvent");

        this.data = e;
    }
}