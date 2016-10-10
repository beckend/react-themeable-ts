import * as React from 'react';
import { THEME_PROVIDER_CONTEXT_KEY } from './constants';

export interface IThemeProviderProps {
  children?: any;
  reactThemeable: any;
}
export interface IThemeProviderContext {
  reactThemeable: any;
}

export class ThemeProvider extends React.PureComponent<IThemeProviderProps, {}> {

  public static defaultProps = {
    [THEME_PROVIDER_CONTEXT_KEY]: {},
  };

  public static childContextTypes = {
    [THEME_PROVIDER_CONTEXT_KEY]: React.PropTypes.object.isRequired,
  };

  public getChildContext() {
    return {
      [THEME_PROVIDER_CONTEXT_KEY]: this.props[THEME_PROVIDER_CONTEXT_KEY],
    };
  }

  public render() {
    return React.Children.only(this.props.children);
  }

}
