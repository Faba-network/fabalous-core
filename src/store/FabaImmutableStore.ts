import FabaStoreUpdateEvent from "../event/FabaStoreUpdateEvent";
import {IFabaStore} from "./IFabaStore";
const deepFreeze = require('deep-freeze');
const diff = require("deep-object-diff").diff;

export interface IFabaImStoreOptions{
    updateInterval:number;
    freeze:boolean;
}

export default class FabaImmutableStore<TProp> implements IFabaStore<TProp>{
    data:TProp;
    private workData:TProp;
    private patchData:Array<any>;

    duplicate():any{
        return JSON.parse(JSON.stringify(this.data));
    }

    options:IFabaImStoreOptions = {
        freeze:false,
        updateInterval:16
    };

    constructor(jsonObject: TProp, options?:IFabaImStoreOptions){
        this.patchData = []; 
        this.workData = jsonObject;
        this.data = deepFreeze(jsonObject);

        if (options) this.options = options;
        setInterval(() => this.updatePatchData(), this.options.updateInterval);
    }

    update(obj:TProp, immediately?:boolean){
        if (immediately){
            let t = Object.assign({}, this.workData, obj);
            let check = diff(t, this.data);

            if (Object.keys(check).length > 0){    
                this.workData = t;
                if (this.options.freeze) this.data = deepFreeze(t);
                this.commit();
            }

            return;
        }

        this.patchData.push(obj);
    }

    commit(){
        new FabaStoreUpdateEvent(this.data).dispatch();
    }

    private updatePatchData(){
        if (this.patchData.length == 0) return;
        let equal = true;

        this.patchData.forEach((element) => {
            let t = Object.assign({}, this.workData, element);
            this.workData = t;
            let check = diff(t, this.data);

            if (Object.keys(check).length > 0){
                this.data = t;
                equal = false;
            }
       });

        this.patchData = [];
        if(equal) return;

        if (this.options.freeze) this.data = deepFreeze(this.data);
        this.commit();
    }
}