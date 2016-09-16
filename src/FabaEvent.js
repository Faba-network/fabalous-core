"use strict";
var FabaCore_1 = require("./FabaCore");
var FabaEvent = (function () {
    function FabaEvent(identifyer) {
        this.identifyer = identifyer;
    }
    FabaEvent.prototype.callBack = function () {
        if (this.cbs) {
            this.cbs(this);
        }
    };
    Object.defineProperty(FabaEvent.prototype, "name", {
        get: function () {
            return this.identifyer;
        },
        enumerable: true,
        configurable: true
    });
    FabaEvent.prototype.dispatch = function (calb, result) {
        if (calb) {
            this.cbs = calb;
        }
        FabaCore_1["default"].dispatchEvent(this, result);
    };
    FabaEvent.prototype.delayDispatch = function (delay, calb, result) {
        var _this = this;
        setTimeout(function () {
            if (calb) {
                _this.cbs = calb;
            }
            FabaCore_1["default"].dispatchEvent(_this, result);
        }, delay);
    };
    return FabaEvent;
}());
exports.__esModule = true;
exports["default"] = FabaEvent;
