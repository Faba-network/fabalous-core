import FabaStore from "./FabaStore";

export default class FabaCoreCommand<TStore> {
    store: any;

    constructor(store) {
        this.store = store;
    }

    get data() {
        return this.store.data;
    }
}
