import FabaStoreUpdateEvent from "../event/FabaStoreUpdateEvent";
import {IFabaStore} from "./IFabaStore";
const deepFreeze = require('deep-freeze');

export interface IFabaImStoreOptions{
    updateInterval:number;
    freeze:boolean;
}

export default class FabaImmutableStore<TProp> implements IFabaStore<TProp>{
    private _reactData:TProp;
    private _workData:TProp;
    private patchData:Array<any>;

    duplicate():any{
        return JSON.parse(JSON.stringify(this.data));
    }

    options:IFabaImStoreOptions = {
        freeze:true,
        updateInterval:16
    };

    get data(){
        return this._workData;
    }

    constructor(jsonObject: TProp, options?:IFabaImStoreOptions){
        this.patchData = [];
        this._workData = jsonObject;
        if (options && options.freeze){
            this._reactData = deepFreeze(jsonObject);
        } else {
            this._reactData = jsonObject;
        }

        if (options) this.options = options;
        setInterval(() => this.updatePatchData(), this.options.updateInterval);
    }

    update(obj:TProp){
        this._workData = obj;
    }

    commit(){
        new FabaStoreUpdateEvent(this._reactData).dispatch();
    }

    private updatePatchData(){
        if (this._workData !== this._reactData){
            if (this.options && this.options.freeze){
                this._reactData = deepFreeze(this._workData);
            } else {
                this._reactData = this._workData;
            }

            this.commit();
        }
    }
}