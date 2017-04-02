import FabaImmutableStore from "./FabaImmutableStore";
import FabaStore from "./FabaStore";

/**
 * FabaCoreCommand used in every Runtime
 * Set the store
 */

export default class FabaCoreCommand<TStore> {
    /**
     * Store can be Immutable or not
     */
    store:FabaImmutableStore<TStore> | FabaStore<TStore>;


    /**
     * Set the store
     * @param store
     */
    constructor(store : FabaImmutableStore<TStore> | FabaStore<TStore>) {
        this.store = store;
    }

    /**
     * Get access to the store Data
     * @returns {TStore}
     */
    get data() : TStore  {
        return this.store.data;
    }
}
