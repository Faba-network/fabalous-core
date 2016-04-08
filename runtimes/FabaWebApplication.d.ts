import FabaCore from "./../core/FabaCore";
import FabaTransportBase from "./../transport/FabaTransportBase";
/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
export default class FabaWebApplication extends FabaCore {
    static servers: Array<any>;
    test: string;
    constructor();
    static addServerEndPoint(conn: FabaTransportBase, name: string): void;
    static sendToEndpoint(event: any, identifyer: string): void;
}
