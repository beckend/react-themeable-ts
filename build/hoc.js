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
var React = require('react');
var themeable_1 = require('./themeable');
var constants_1 = require('./constants');
var object_path_1 = require('object-path');
/**
 * Memoizee
 */
var memoize = require('memoizee');
// Memoizeable themeable function
var getThemeableFn = function (theme) { return themeable_1.themeable(theme); };
var getThemeableFnDefaultMemoizeeOpts = {
    length: 1,
    max: 10,
};
/**
 * Defaults for the HOC
 */
var hocDefaults = {
    themeKey: 'theme',
    themeProp: 't',
};
/**
 * Main decorator
 */
function themeDecorator(_a) {
    var _b = _a === void 0 ? {} : _a, themeKey = _b.themeKey, themeProp = _b.themeProp, memoizeeOpts = _b.memoizeeOpts, contextPath = _b.contextPath;
    var getThemeableFnMemoized = memoize(getThemeableFn, memoizeeOpts || getThemeableFnDefaultMemoizeeOpts);
    var passedThemePropToChild = themeProp || hocDefaults.themeProp;
    // tslint:disable-next-line
    return function (WrappedComponent) {
        // tslint:disable-next-line
        var HOCThemeable = (function (props, contextArg) {
            var passedThemeableFn = getThemeableFnMemoized(contextPath
                ?
                    object_path_1.get(contextArg, contextPath)
                :
                    props[themeKey || hocDefaults.themeKey]);
            var passedHOCProps = (_a = {},
                _a[passedThemePropToChild] = passedThemeableFn,
                _a
            );
            return (React.createElement(WrappedComponent, __assign({}, passedHOCProps, props)));
            var _a;
        });
        HOCThemeable.contextTypes = (_a = {},
            _a[constants_1.THEME_PROVIDER_CONTEXT_KEY] = React.PropTypes.object,
            _a
        );
        // Seems like it's no possible to return this as a SFC
        // without complaint when decorating a class
        return HOCThemeable;
        var _a;
    };
}
exports.themeDecorator = themeDecorator;

//# sourceMappingURL=hoc.js.map
