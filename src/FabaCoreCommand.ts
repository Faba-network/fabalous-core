import FabaImmutableStore from "./FabaImmutableStore";
import FabaStore from "./FabaStore";
export default class FabaCoreCommand<TStore> {
    store:FabaImmutableStore<TStore> | FabaStore<TStore>;

    constructor(store : FabaImmutableStore<TStore> | FabaStore<TStore>) {
        this.store = store;
    }

    get data() : TStore  {
        return this.store.data;
    }
}
