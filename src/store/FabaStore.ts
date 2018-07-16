/**
 * FabaStore used as alternative to FabaImmutableStore
 */
import {IFabaStore} from "./IFabaStore";


export default class FabaStore<TProp> implements IFabaStore<TProp>{
    private _data:TProp;

    get tree() {
        return {};
    }

    constructor(data?:TProp){
        this._data = data;
    }

    get data(): TProp {
        return this._data;
    }

    update(){

    }

    /**
     *
     */
    duplicate():any{
        return JSON.parse(JSON.stringify(this._data));
    }
}