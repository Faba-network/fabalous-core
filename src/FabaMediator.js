/*
  Fabalos bundled with nodejs (muss os sein weil nur mit nodejs lässt sich javascript ausführen)
  Mongodb Rthindb etc sind erweiterungen und in einem eigenen Packet

  Bei Kompellierung wird nur geschaut ob service oder command

   If Service
    registerservice

   IF !Service
    if Runtime_WEB


    if Runtime_Native

 */
"use strict";
var FabaCore_1 = require("./FabaCore");
var FabaMediator = (function () {
    function FabaMediator() {
        this.cmdList = [];
        if (FabaCore_1.CLIENT) {
            this.registerCommands();
        }
        if (FabaCore_1.SERVER) {
            this.registerServices();
        }
    }
    FabaMediator.prototype.addCommand = function (event, command) {
        var ev = event.default;
        var cmd = command.default;
        var h = new ev();
        this.cmdList.push({ event: ev, cmd: cmd, id: h.identifyer });
        //FabaWebApplication.events[h.identifyer] = ev;
    };
    FabaMediator.prototype.updateCommand = function (eventName, command) {
        this.cmdList = this.cmdList.map(function (md) {
            if (md) {
                if (md.event != eventName)
                    return md;
            }
        });
        this.cmdList.push({ event: eventName, cmd: command });
    };
    FabaMediator.prototype.addSerivce = function (event, service) {
        var ev = event.default;
        var serv = service.default;
        var h = new ev();
        this.cmdList.push({ event: event, cmd: serv, id: h.identifyer });
    };
    FabaMediator.prototype.registerCommands = function () {
    };
    FabaMediator.prototype.registerServices = function () {
    };
    return FabaMediator;
}());
exports.__esModule = true;
exports["default"] = FabaMediator;
