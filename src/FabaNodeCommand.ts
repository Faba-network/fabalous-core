import FabaCommand from "./FabaCommand";
import FabaEvent from "./FabaEvent";

export default class FabaNodeCommand<TStore> extends FabaCommand<TStore> {
    constructor(store) {
        super(store);
    }

    emitToClient(ev:FabaEvent) {
        ev.callBack();
    }

    emitToGroup(ev:FabaEvent) {
        ev.callBack();
    }

    emitToAll(ev:FabaEvent) {
        ev.callBack();
    }
}
