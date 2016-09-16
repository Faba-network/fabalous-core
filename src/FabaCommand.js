"use strict";
var FabaCoreRuntime_1 = require("./FabaCoreRuntime");
var FabaCommand = (function () {
    function FabaCommand() {
    }
    FabaCommand.prototype.sendToEndpoint = function (event, endPoint) {
        FabaCoreRuntime_1["default"].sendToEndpoint(event, endPoint);
    };
    return FabaCommand;
}());
exports.__esModule = true;
exports["default"] = FabaCommand;
