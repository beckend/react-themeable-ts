import * as cn from 'classnames';
import * as _ from 'lodash';
import isObject = require('lodash.isobject');
import size = require('lodash.size');

/**
 * Memoizee
 */
const memoize = require('memoizee');
const themeableDefaultMemoizeeOpts = {
  length: false,
};

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
// Aphrodite decorator
export interface IClassNameDecoratorFn {
  (...payload: any[]): any[];
}
/**
 * The main function
 */
export interface IStaticFn {
  // Aphrodite
  (payload: [any, IClassNameDecoratorFn]): IStaticFnReturn;
  // Normal
  (payload: any): IStaticFnReturn;
  // Empty
  (): IStaticFnReturn;
}

const truthy = (x: any) => x;
export const themeable: IStaticFn = (input?: any) => {
  const [theme, classNameDecorator] = Array.isArray(input) && input.length === 2 ?
    input :
    [input, null];

  // Empty object if no theme
  if (!isObject(theme)) {
    return () => ({});
  }

  // Class decorator version (Aphrodite etc.)
  if (typeof classNameDecorator === 'function') {
    const classNameDecoratorFn = (...names: any[]) => {
      if (names.length < 1) {
        return {};
      }
      const styles = names
        .map((name) => theme[name])
        .filter(truthy);

      if (!styles[0]) {
        return {} as any;
      }

      return {
        className: classNameDecorator(...styles),
      };
    };

    return memoize(
      classNameDecoratorFn,
      themeableDefaultMemoizeeOpts,
    ) as typeof classNameDecoratorFn;
  }

  // Mix of className and style version
  const regularFn = (...names: any[]) => {
    if (names.length < 1) {
      return {};
    }

    // Will be merged if object is found
    // tslint:disable-next-line
    let styleObj: React.CSSProperties = {};
    // Will be invoked through classnames
    const classNamesArgsArr: any[] = [];
    names.forEach((value) => {
      // Get from theme object
      const themeValue = theme[value];
      // Array check first because it's also an object
      if (Array.isArray(themeValue)) {
        classNamesArgsArr.push(themeValue);
      } else if (isObject(themeValue)) {
        // Will be treated as style
        styleObj = {
          ...styleObj,
          ...themeValue,
        };
      } else {
        classNamesArgsArr.push(themeValue);
      }
    });
    const returned: IStaticFnOptionalReturn = {};

    if (size(styleObj) > 0) {
      returned.style = styleObj;
    }
    const finalClassname = cn(classNamesArgsArr);
    if (finalClassname.length > 0) {
      returned.className = finalClassname;
    }
    return returned;
  };

  return memoize(
    regularFn,
    themeableDefaultMemoizeeOpts,
  ) as typeof regularFn;
};
