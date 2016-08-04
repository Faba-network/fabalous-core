import { Db } from "mongodb";
export default class FabaMongoConnection {
    private dbUrl;
    dataBase: Db;
    constructor(dbUrl: string);
    connect(): void;
    private connectHandler(err, conDb);
}
