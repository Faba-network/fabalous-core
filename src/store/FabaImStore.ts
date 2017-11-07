import FabaStoreUpdateEvent from "../event/FabaStoreUpdateEvent";
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
var deepFreeze = require('deep-freeze')

export interface IFabaImStoreOptions{
    updateInterval:number;
    freeze:boolean;
}

export default class FabaImStore<TProp>{
    data:TProp;
    workData:TProp;
    patchData:Array<any>;

    options:IFabaImStoreOptions = {
        freeze:false,
        updateInterval:20
    }



    constructor(jsonObject: TProp, options?:IFabaImStoreOptions){
        this.patchData = []; 
        this.workData = jsonObject;
        this.data = deepFreeze(jsonObject);

        if (options) this.options = options;
        setInterval(() => this.updatePatchData(), this.options.updateInterval);
    }

    update(obj:TProp){
        this.patchData.push(obj);
    }

    commit(){
        new FabaStoreUpdateEvent(this.data).dispatch();
    }

    private updatePatchData(){
        if (this.patchData.length == 0) return;
        let equal = true;

        this.patchData.forEach(function (element) {
            let t = Object.assign({}, this.workData, element);
            this.workData = t;
            let check = diff(t, this.data);

            if (Object.keys(check).length > 0){
                this.data = t;
                equal = false;
            }
       });

        this.patchData = [];
        this.data = deepFreeze(this.data)
        
        this.commit();
    }
}