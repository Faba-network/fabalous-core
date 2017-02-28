import FabaStoreUpdateEvent from "./FabaStoreUpdateEvent";
import FabaStore from "./FabaStore";

declare var require;
const Baobab = require("baobab");

export default class FabaImmutableStore<TProp> extends FabaStore<TProp> {
    private bTree: any;
    private cursor: any;
    protected bData: any;

    get tree() {
        return this.bTree;
    }

    get data(): TProp {
        return this.bData;
    }

    constructor(jsonObject: any) {
        super();

        this.bTree = new Baobab(jsonObject);
        this.cursor = this.tree.select();
        this.bData = this.cursor.get();

        this.cursor.on("update", (e) => {
            this.bData = e.data.currentData;
            new FabaStoreUpdateEvent(e).dispatch();
        });
    }

    set(path: string, value: any, update: boolean = true) {
        let arrPath = path.split(".");
        this.cursor.set(arrPath, value);
    }
}

