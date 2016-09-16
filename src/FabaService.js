"use strict";
var FabaSerivce = (function () {
    function FabaSerivce() {
    }
    FabaSerivce.prototype.sendToClient = function (ev) {
        ev.callBack();
    };
    return FabaSerivce;
}());
exports.__esModule = true;
exports["default"] = FabaSerivce;
