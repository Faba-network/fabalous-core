export default class FabaModel{
    static stores:Array<any>;

    static setStore(name:string, storeClass:any):any{
        if (!FabaModel.stores){
            FabaModel.stores = [];
        }

        return FabaModel.stores[name] = new storeClass;
    }

    static getStore(name:string, storeClass:any){
        if (!FabaModel.stores){
            FabaModel.stores = [];
            FabaModel.stores[name] = new storeClass;
            return FabaModel.stores[name];
        }

        if (FabaModel.stores[name]){
            return FabaModel.stores[name];
        }


        return FabaModel.stores[name] = new storeClass;
    }
}