/// <reference types="react" />
/**
 * HOC react component
 */
import * as React from 'react';
import { IStaticFnReturn } from './themeable';
export declare type TDecComponent<P> = React.SFC<P> | React.ComponentClass<P>;
export interface IThemeDecoratorArgs {
    themeKey?: string;
    themeProp?: string;
    memoizeeOpts?: any;
    context?: boolean;
    contextPath?: string | string[];
}
export interface IHOCDefaultNoThemeProps {
    t: IStaticFnReturn;
}
export interface IHOCDefaultProps extends IHOCDefaultNoThemeProps {
    theme?: any;
}
/**
 * Main decorator
 */
export declare function themeDecorator<P extends IThemeDecoratorArgs>({themeKey, themeProp, memoizeeOpts, context, contextPath}?: IThemeDecoratorArgs): (WrappedComponent: TDecComponent<P>) => any;
