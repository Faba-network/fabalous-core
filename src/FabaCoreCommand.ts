import FabaImmutableStore from "./store/FabaImmutableStore";
import FabaStore from "./store/FabaStore";

/**
 * FabaCoreCommand used in every Runtime
 * Set the store
 */

export default class FabaCoreCommand<TStore> implements IFabaCoreCommand<TStore> {
    /**
     * Store can be Immutable or not
     */
    store: FabaImmutableStore<TStore> | FabaStore<TStore>;


    /**
     * Set the store
     * @param store
     */
    constructor(store: FabaImmutableStore<TStore> | FabaStore<TStore>) {
        this.store = store;
    }

    /**
     * Get access to the store Data
     * @returns {TStore}
     */
    get data(): TStore {
        return this.store.data;
    }
}

export interface IFabaCoreCommand<TStore> {
    store: FabaImmutableStore<TStore> | FabaStore<TStore> | FabaImmutableStore<TStore>;
}