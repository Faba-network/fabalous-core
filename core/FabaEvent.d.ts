/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
export default class FabaEvent {
    identifyer: string;
    cbs: any;
    constructor(identifyer: string);
    callBack(): void;
    readonly name: string;
    getClassName(): string;
    dispatch(calb?: any, result?: boolean): void;
    hashCode(str: string): string;
}
