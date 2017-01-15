"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/* tslint:disable: variable-name */
/**
 * HOC react component
 */
const object_path_1 = require("object-path");
const React = require("react");
const constants_1 = require("./constants");
const themeable_1 = require("./themeable");
/**
 * Memoizee
 */
const memoize = require('memoizee');
// Memoizeable themeable function
const getThemeableFn = (theme) => themeable_1.themeable(theme);
const getThemeableFnDefaultMemoizeeOpts = {
    length: 1,
    max: 10,
};
/**
 * Defaults for the HOC
 */
const hocDefaults = {
    themeKey: 'theme',
    themeProp: 't',
};
/**
 * Main decorator
 */
function themeDecorator({ themeKey, themeProp, memoizeeOpts, contextPath, } = {}) {
    const getThemeableFnMemoized = memoize(getThemeableFn, memoizeeOpts || getThemeableFnDefaultMemoizeeOpts);
    const passedThemePropToChild = themeProp || hocDefaults.themeProp;
    // tslint:disable-next-line
    return (WrappedComponent) => {
        // tslint:disable-next-line
        const HOCThemeable = ((props, contextArg) => {
            const passedThemeableFn = getThemeableFnMemoized(contextPath
                ?
                    object_path_1.get(contextArg, contextPath)
                :
                    props[themeKey || hocDefaults.themeKey]);
            const passedHOCProps = {
                [passedThemePropToChild]: passedThemeableFn,
            };
            return (React.createElement(WrappedComponent, __assign({}, passedHOCProps, props)));
        });
        HOCThemeable.contextTypes = {
            [constants_1.THEME_PROVIDER_CONTEXT_KEY]: React.PropTypes.object,
        };
        // Seems like it's no possible to return this as a SFC
        // without complaint when decorating a class
        return HOCThemeable;
    };
}
exports.themeDecorator = themeDecorator;
//# sourceMappingURL=hoc.js.map