/**
 * The main function that is being returned, if theme arg is not empty
 */
export interface IStaticFnReturn {
    (...payload: any[]): IStaticFnOptionalReturn;
    (payload?: any): {};
}
export interface IStaticFnOptionalReturn {
    className?: string;
    style?: {
        [name: string]: any;
    };
}
export interface IClassNameDecoratorFn {
    (...payload: any[]): any[];
}
/**
 * The main function
 */
export interface IStaticFn {
    (payload: [any, IClassNameDecoratorFn]): IStaticFnReturn;
    (payload: any): IStaticFnReturn;
    (): IStaticFnReturn;
}
export declare const themeable: IStaticFn;
