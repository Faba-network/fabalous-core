/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
export default class FabaEvent {
    identifyer: string;
    callBack: any;
    private cbs;
    constructor();
    name: string;
    getClassName(): string;
    dispatch(calb?: any, result?: boolean): void;
}
