import FabaEvent from "./FabaEvent";
/**
 * Created by creativecode on 12.01.16.
 */

export interface IFabaCommand {
    execute(event:FabaEvent);
    result(event:FabaEvent);
    timeout(event:FabaEvent);
    error(event:FabaEvent);
    offline(event:FabaEvent);
}