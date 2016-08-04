import FabaCore from "./../core/FabaCore";
/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
export default class FabaWebApplication extends FabaCore {
    constructor() {
        super();
        this.test = "asdasd";
        this.test = "super";
    }
    static addServerEndPoint(conn, name) {
        this.servers.push({ name: name, conn: conn });
    }
    static sendToEndpoint(event, identifyer) {
        if (this.servers.length == 0) {
            throw new Error("NO ENDPOINT DEFINED");
        }
        for (var i = 0; i < this.servers.length; i++) {
            this.servers[i].conn.send(event);
        }
    }
}
FabaWebApplication.servers = [];
