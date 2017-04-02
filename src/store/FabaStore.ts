
export default class FabaStore<TProp>{
    private _data:TProp;

    constructor(data?:TProp){
        this._data = data;
    }

    get data(): TProp {
        return this._data;
    }
}