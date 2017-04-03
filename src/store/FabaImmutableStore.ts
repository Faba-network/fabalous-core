import FabaStoreUpdateEvent from "../event/FabaStoreUpdateEvent";
import FabaStore from "./FabaStore";

const Baobab = require("baobab");

interface IBaobabUpdate{
    data: {
        currentData:Object;
    };
}

export interface IFabaImmutableStoreOptions{
    immutable:boolean
}

/**
 * Immutable store used by every Command (Register the store in Core / Runtime)
 */
export default class FabaImmutableStore<TProp> extends FabaStore<TProp> {
    private bTree: any;
    private cursor: any;
    protected bData: any;

    /**
     *
     * @returns {any}
     */
    get tree() {
        return this.bTree;
    }

    /**
     *
     * @returns {any}
     */
    get data(): TProp {
        return this.bData;
    }

    /**
     *
     * @param jsonObject
     * @param options
     */
    constructor(jsonObject: any, options?:IFabaImmutableStoreOptions) {
        super();
        let opt = (options) ? options : {immutable:true};

        this.bTree = new Baobab(jsonObject, opt);
        this.cursor = this.tree.select();
        this.bData = this.cursor.get();

        this.bTree.on("update", (e:IBaobabUpdate) => {
            console.log("update");
            this.bData = e.data.currentData;
            new FabaStoreUpdateEvent(e).dispatch();
        });

        this.cursor.on("update", (e:IBaobabUpdate) => {
            console.log("update");
        });

    }

    /**
     *
     * @param path
     * @param value
     * @param update
     */
    set(path: string, value: any, update: boolean = true) {
        let arrPath = path.split(".");
        this.cursor.set(arrPath, value);
    }

    /**
     *
     */
    duplicate(path: string, deppClone:boolean = false):any{
        let arrPath = path.split(".");
        let curs = this.tree.select(arrPath);

        return (deppClone) ? curs.deepClone() : curs.clone();
    }

    /**
     * Serialize cursor (if empty serialize all)
     *
     * @returns {string}
     */
    serialize(path?:string):string{
        if (path){
            let arrPath = path.split(".");
            let curs = this.tree.select(arrPath);
            curs.serialize();
        }

        return this.cursor.serialize();
    }
}

