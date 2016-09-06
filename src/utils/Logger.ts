import {SERVER, CLIENT} from "../FabaCore";
var _logger:any;

if (SERVER) {
    _logger = System.import('tracer').colorConsole().log;
}

if (CLIENT){
    _logger = console.log.bind(console);
}

declare var System;
export var log:any  = _logger;