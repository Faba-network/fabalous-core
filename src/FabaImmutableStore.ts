import FabaStoreUpdateEvent from "./FabaStoreUpdateEvent";
import FabaStore from "./FabaStore";

declare var require;
//const Baobab = require("baobab");
const Freezer = require('freezer-js');


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
/*
        this.bTree = new Freezer(jsonObject);
        this.cursor = this.tree.select();
        this.bData = this.cursor.get();
*/
        this.bTree = new Freezer(jsonObject);
        this.bData = this.bTree.get();
        //this.bData = bTree.;

        this.bTree.on('update', function( currentState, prevState ){
            this.bData = currentState;
            new FabaStoreUpdateEvent(currentState).dispatch();
        });
/*
        this.cursor.on("update", (e) => {
            this.bData = e.data.currentData;
            new FabaStoreUpdateEvent(e).dispatch();
        });
        */
    }

    set(path: string, value: any, update: boolean = true) {
        let arrPath = path.split(".");
        this.bData.set(arrPath, value);
    }
}

