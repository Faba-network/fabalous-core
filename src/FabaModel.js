"use strict";
var FabaModel = (function () {
    function FabaModel() {
    }
    FabaModel.setStore = function (name, storeClass) {
        if (!FabaModel.stores) {
            FabaModel.stores = [];
        }
        return FabaModel.stores[name] = new storeClass;
    };
    FabaModel.getStore = function (name, storeClass) {
        if (!FabaModel.stores) {
            FabaModel.stores = [];
            FabaModel.stores[name] = new storeClass;
            return FabaModel.stores[name];
        }
        if (FabaModel.stores[name]) {
            return FabaModel.stores[name];
        }
        return FabaModel.stores[name] = new storeClass;
    };
    return FabaModel;
}());
exports.__esModule = true;
exports["default"] = FabaModel;
