/**
 * FabaStore used as alternative to FabaImmutableStore
 */
export default class FabaStore<TProp>{
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

    /**
     *
     */
    duplicate(path: string, deppClone:boolean = false):any{
        return this._data;
    }
}