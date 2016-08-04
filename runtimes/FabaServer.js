import FabaCore from "./../core/FabaCore";
export default class FabaServer extends FabaCore {
    constructor() {
        super();
        this.express = require('express');
        this.koa = require('koa');
        this.assign = require('object.assign').getPolyfill();
        this.app = this.express();
        this.startServer();
    }
    addDatabaseConnection(db) {
        FabaServer.db = db;
        FabaServer.db.connect();
    }
    parseObject(obj) {
        for (var key in obj) {
            if (obj[key] != null && obj[key].className != null) {
                let vo = obj[key];
                try {
                    let neVoInst = new FabaCore.vos[vo.className];
                    obj[key] = this.assign(neVoInst, vo);
                    obj[key] = this.parseObject(obj[key]);
                }
                catch (e) {
                    throw e;
                }
            }
        }
        return obj;
    }
    startServer() {
        this.app.use(function (req, res, next) {
            var data = "";
            req.on('data', function (chunk) { data += chunk; });
            req.on('end', function () {
                req.rawBody = data;
                next();
            });
        });
        this.app.all('/', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        this.app.get('/', function (req, res) {
            res.send("Hallo welt");
        });
        this.app.post('/', (req, res) => {
            let body = JSON.parse(req.rawBody);
            let currentEvent = new FabaCore.events[body.identifyer]();
            var h = this.assign(currentEvent, JSON.parse(req.rawBody));
            h = this.parseObject(h);
            h.dispatch((event) => {
                console.log(event);
                res.send(JSON.stringify(event));
            });
        });
        var port = 3120;
        this.app.listen(port);
    }
    rawBody(req, res, next) {
        req.setEncoding('utf8');
        req.rawBody = '';
        req.on('data', function (chunk) {
            req.rawBody += chunk;
        });
        req.on('end', function () {
            next();
        });
    }
    rawData(req, res, next) {
        req.setEncoding('utf8');
        req.rawBody = '';
        req.on('data', function (chunk) {
            req.rawBody += chunk;
        });
        req.on('end', function () {
            next();
        });
    }
}
