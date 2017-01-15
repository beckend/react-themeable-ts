"use strict";
var tslib_1 = require("tslib");
var cn = require("classnames");
var isObject = require("lodash.isobject");
var size = require("lodash.size");
/**
 * Memoizee
 */
var memoize = require('memoizee');
var themeableDefaultMemoizeeOpts = {
    length: false,
};
var truthy = function (x) { return x; };
exports.themeable = function (input) {
    var _a = Array.isArray(input) && input.length === 2 ?
        input :
        [input, null], theme = _a[0], classNameDecorator = _a[1];
    // Empty object if no theme
    if (!isObject(theme)) {
        return function () { return ({}); };
    }
    // Class decorator version (Aphrodite etc.)
    if (typeof classNameDecorator === 'function') {
        var classNameDecoratorFn = function () {
            var names = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                names[_i] = arguments[_i];
            }
            if (names.length < 1) {
                return {};
            }
            var styles = names
                .map(function (name) { return theme[name]; })
                .filter(truthy);
            if (!styles[0]) {
                return {};
            }
            return {
                className: classNameDecorator.apply(void 0, styles),
            };
        };
        return memoize(classNameDecoratorFn, themeableDefaultMemoizeeOpts);
    }
    // Mix of className and style version
    var regularFn = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        if (names.length < 1) {
            return {};
        }
        // Will be merged if object is found
        // tslint:disable-next-line
        var styleObj = {};
        // Will be invoked through classnames
        var classNamesArgsArr = [];
        names.forEach(function (value) {
            // Get from theme object
            var themeValue = theme[value];
            // Array check first because it's also an object
            if (Array.isArray(themeValue)) {
                classNamesArgsArr.push(themeValue);
            }
            else if (isObject(themeValue)) {
                // Will be treated as style
                styleObj = tslib_1.__assign({}, styleObj, themeValue);
            }
            else {
                classNamesArgsArr.push(themeValue);
            }
        });
        var returned = {};
        if (size(styleObj) > 0) {
            returned.style = styleObj;
        }
        var finalClassname = cn(classNamesArgsArr);
        if (finalClassname.length > 0) {
            returned.className = finalClassname;
        }
        return returned;
    };
    return memoize(regularFn, themeableDefaultMemoizeeOpts);
};
//# sourceMappingURL=themeable.js.map