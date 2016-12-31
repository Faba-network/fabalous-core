import FabaStore from "./FabaStore";

export default class FabaCoreCommand<TStore> {
    private store: FabaStore<TStore>;
    data: TStore;

    constructor(store) {
        this.store = store;
        this.data = store.data;
    }
}
