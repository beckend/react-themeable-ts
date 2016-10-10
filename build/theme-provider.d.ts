/// <reference types="react" />
import * as React from 'react';
export interface IThemeProviderProps {
    children?: any;
    reactThemeable: any;
}
export interface IThemeProviderContext {
    reactThemeable: any;
}
export declare class ThemeProvider extends React.PureComponent<IThemeProviderProps, {}> {
    static defaultProps: {
        [x: string]: {};
    };
    static childContextTypes: {
        [x: string]: React.Validator<any>;
    };
    getChildContext(): {
        [x: string]: any;
    };
    render(): React.ReactElement<any>;
}
