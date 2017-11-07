import FabaStoreUpdateEvent from "../event/FabaStoreUpdateEvent";

export interface IFabaImStoreOptions{
    updateInterval:number;
    freeze:boolean;
}

export default class FabaImStore<TProp>{
    data:TProp;
    patchData:Array<any>;

    options:IFabaImStoreOptions = {
        freeze:false,
        updateInterval:20
    }

    constructor(jsonObject: TProp, options?:IFabaImStoreOptions){
        this.data = jsonObject;
        this.patchData = []; 

        if (options) this.options = options;
        setInterval(() => this.updatePatchData, this.options.updateInterval);
    }

    update(obj:TProp){
        this.patchData.push(obj);
    }

    commit(){
        new FabaStoreUpdateEvent(this.data).dispatch();
    }

    private updatePatchData(){
        if (this.patchData.length == 0) return;
        
        this.patchData.forEach(element => {
            this.data = Object.assign(this.data, element);
        });

        this.patchData = [];

        if (this.options.freeze) Object.freeze(this.data);

        this.commit();
    }
}