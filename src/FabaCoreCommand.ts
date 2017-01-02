import FabaStore from "./FabaStore";

export default class FabaCoreCommand<TStore> {
    private store: FabaStore<TStore>;

    constructor(store) {
        this.store = store;
    }

    get data() {
        return this.store.data;
    }
}
