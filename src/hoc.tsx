/* tslint:disable: variable-name */
/**
 * HOC react component
 */
import lGet = require('lodash.get');
import * as React from 'react';
import { THEME_PROVIDER_CONTEXT_KEY } from './constants';
import {
  IStaticFnReturn,
  themeable,
} from './themeable';

/**
 * Memoizee
 */
const memoize = require('memoizee');
// Memoizeable themeable function
const getThemeableFn = (theme: any) => themeable(theme);
const getThemeableFnDefaultMemoizeeOpts = {
  length: 1,
  max: 10,
};

export type TDecComponent<P> = React.SFC<P> | React.ComponentClass<P>;
export interface IThemeDecoratorArgs {
  // The prop the HOC will use as argument for themeable
  themeKey?: string;
  // The prop name passed prop to DecoratedComponent as the returned themeable function
  themeProp?: string;
  // options passed to https://github.com/medikoo/memoizee
  memoizeeOpts?: any;
  // context if truthy will be used to navigate with "object-path" in context to find the theme object
  // If not using default context path
  contextPath?: string | string[];
}
/**
 * Defaults for the HOC
 */
const hocDefaults = {
  themeKey: 'theme',
  themeProp: 't',
};
export interface IHOCDefaultNoThemeProps {
  t: IStaticFnReturn;
}
export interface IHOCDefaultProps extends IHOCDefaultNoThemeProps {
  theme?: any;
}

/**
 * Main decorator
 */
export function themeDecorator<P extends IThemeDecoratorArgs>({
  themeKey,
  themeProp,
  memoizeeOpts,
  contextPath,
}: IThemeDecoratorArgs = {}) {
  const getThemeableFnMemoized = memoize(getThemeableFn, memoizeeOpts || getThemeableFnDefaultMemoizeeOpts);

  const passedThemePropToChild = themeProp || hocDefaults.themeProp;

  // tslint:disable-next-line
  return (WrappedComponent: TDecComponent<P>) => {
    // tslint:disable-next-line
    const HOCThemeable: React.SFC<any> = ((props: any, contextArg: any) => {
      const passedThemeableFn = getThemeableFnMemoized(
        contextPath
          ?
            lGet(contextArg, contextPath)
          :
            props[themeKey || hocDefaults.themeKey],
      );
      const passedHOCProps = {
        [passedThemePropToChild]: passedThemeableFn,
      };

      return (
        <WrappedComponent {...passedHOCProps} {...props} />
      );
    });

    HOCThemeable.contextTypes = {
      [THEME_PROVIDER_CONTEXT_KEY]: React.PropTypes.object,
    };

    // Seems like it's no possible to return this as a SFC
    // without complaint when decorating a class
    return HOCThemeable as React.SFC<P> | any;
  };
}
