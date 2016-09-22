/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import FabaCore, {IFabaMediatorList} from "./FabaCore";
import FabaEvent from "./FabaEvent";
import FabaValueObject from "./FabaValueObject";
import {Application} from "~express/lib/application";

export default class FabaServer extends FabaCore {
    app: Application;

    express = require('express');
    assign = require('object.assign').getPolyfill();

    constructor() {
        super();
        console.log('\x1Bc');

        this.app = this.express();
        this.startServer();
    }

    parseObject(obj) {
        for (var key in obj) {
            if (obj[key] != null && obj[key].className != null) {
                let vo: FabaValueObject = obj[key];
                try {

                    let neVoInst: any = new FabaCore.vos[vo.className];
                    obj[key] = this.assign(neVoInst, vo);

                    obj[key] = this.parseObject(obj[key]);

                } catch (e) {
                    throw e;
                }
            }
        }


        return obj;
    }

    private startServer() {
        this.app.use(function (req: any, res, next) {
            var data = "";
            req.on('data', function (chunk) {
                data += chunk
            });
            req.on('end', function () {
                req.rawBody = data;
                next();
            })
        });

        this.app.all('/', function (req: any, res: any, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });

        this.app.get('/', function (req: any, res: any) {
            res.send("Hallo welt");
        });

        this.app.post('/', (req: any, res: any) => {
            let body = JSON.parse(req.rawBody);

            let targetEvent: FabaEvent;

            // TODO: Refactor to create a list with events on startup
            for (var i = 0; i < FabaCore.mediators.length; i++) {
                var mediator: IFabaMediatorList = FabaCore.mediators[i];

                for (var a = 0; a < mediator.mediator.cmdList.length; a++) {
                    let cmd = mediator.mediator.cmdList[a];

                    if (body.identifyer === cmd.id) {
                        targetEvent = new cmd.event.default();
                    }
                }
            }

            if (!targetEvent) {
                targetEvent = new FabaEvent(body.identifyer);
            }

            var h: any = this.assign(targetEvent, JSON.parse(req.rawBody));
            h = this.parseObject(h);

            h.dispatch((event) => {
                console.log(event);
                res.send(JSON.stringify(event));
            });
        });

        var port = 3120;

        this.app.listen(port);
    }

    private rawBody(req, res, next) {
        req.setEncoding('utf8');
        req.rawBody = '';
        req.on('data', function (chunk) {
            req.rawBody += chunk;
        });
        req.on('end', function () {
            next();
        });
    }

    private rawData(req, res, next) {
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