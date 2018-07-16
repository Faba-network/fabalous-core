export interface IFabaStore<TProp>{
    data:TProp;
    update:(obj:TProp, immediately?:boolean) => void;
    duplicate:(path: string, deepClone:boolean) => TProp
}