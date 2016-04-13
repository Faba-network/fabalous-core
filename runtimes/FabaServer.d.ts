/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import FabaCore from "./../core/FabaCore";
import FabaMongoConnection from "./../nodejs/mongodb/FabaMongoConnection";
import { Express } from "express";
export default class FabaServer extends FabaCore {
    static db: FabaMongoConnection;
    express: any;
    app: Express;
    koa: any;
    assign: any;
    constructor();
    addDatabaseConnection(db: FabaMongoConnection): void;
    parseObject(obj: any): any;
    private startServer();
    private rawBody(req, res, next);
    private rawData(req, res, next);
}
