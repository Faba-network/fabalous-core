import FabaEvent from "./FabaEvent";
import FabaCore from "./FabaCore";
import FabaTransportBase from "./transport/FabaCoreTransportBase";

export interface IServerEndpoint {
    name: string;
    connection: FabaTransportBase;
}

export default class FabaCoreRuntime extends FabaCore {
    static servers: Array<IServerEndpoint> = [];

    public addServerEndPoint(conn: FabaTransportBase, name: string): void {
        FabaCoreRuntime.servers.push({name: name, connection: conn});
    }

    static sendToEndpoint(event: FabaEvent, endPointName?: string): void {
        if (endPointName) {
            for (var item of FabaCoreRuntime.servers) {
                if (item.name === endPointName) {
                    item.connection.send(event);
                }
            }
        } else {
            FabaCoreRuntime.servers[0].connection.send(event);
        }
    }
}
