export default class FabaModel {
    static setStore(name, storeClass) {
        if (!FabaModel.stores) {
            FabaModel.stores = new Array();
        }
        return FabaModel.stores[name] = new storeClass;
    }
    static getStore(name, storeClass) {
        if (!FabaModel.stores) {
            FabaModel.stores = new Array();
            FabaModel.stores[name] = new storeClass;
            return FabaModel.stores[name];
        }
        if (FabaModel.stores[name]) {
            return FabaModel.stores[name];
        }
        return FabaModel.stores[name] = new storeClass;
    }
}
