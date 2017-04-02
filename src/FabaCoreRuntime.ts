import FabaEvent from "./FabaEvent";
import FabaCore from "./FabaCore";
import FabaTransportBase from "./transport/FabaCoreTransportBase";

/**
 * Used for every Endpoint
 */
export interface IServerEndpoint {
    name: string;
    connection: FabaTransportBase;
}

/**
 * FabaCoreRuntime extends FabaCore and is used by every Runtime
 */
export default class FabaCoreRuntime extends FabaCore {
    static servers: Array<IServerEndpoint> = [];

    /**
     * Is used to register every FabaEndpoint
     *
     * @param conn
     * @param name
     */
    public addServerEndPoint(conn: FabaTransportBase, name: string): void {
        FabaCoreRuntime.servers.push({name: name, connection: conn});
    }


    // TODO: Is used?!
    /**
     * Send to Event to Endpoint
     *
     * @param event
     * @param endPointName
     */
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