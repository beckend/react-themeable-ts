"use strict";
const cn = require("classnames");
const assign = require('lodash.assign');
const isObject = require('lodash.isobject');
const isFunction = require('lodash.isfunction');
const size = require('lodash.size');
/**
 * Memoizee
 */
const memoize = require('memoizee');
const themeableDefaultMemoizeeOpts = {
    length: false,
};
const truthy = (x) => x;
exports.themeable = (input) => {
    const [theme, classNameDecorator] = Array.isArray(input) && input.length === 2 ?
        input :
        [input, null];
    // Empty object if no theme
    if (!isObject(theme)) {
        return () => ({});
    }
    // Class decorator version (Aphrodite etc.)
    if (isFunction(classNameDecorator)) {
        const classNameDecoratorFn = (...names) => {
            if (names.length < 1) {
                return {};
            }
            const styles = names
                .map((name) => theme[name])
                .filter(truthy);
            if (!styles[0]) {
                return {};
            }
            return {
                className: classNameDecorator(...styles),
            };
        };
        return memoize(classNameDecoratorFn, themeableDefaultMemoizeeOpts);
    }
    // Mix of className and style version
    const regularFn = (...names) => {
        if (names.length < 1) {
            return {};
        }
        // Will be merged if object is found
        // tslint:disable-next-line
        let styleObj = {};
        // Will be invoked through classnames
        const classNamesArgsArr = [];
        names.forEach((value) => {
            // Get from theme object
            const themeValue = theme[value];
            // Array check first because it's also an object
            if (Array.isArray(themeValue)) {
                classNamesArgsArr.push(themeValue);
            }
            else if (isObject(themeValue)) {
                // Will be treated as style
                // Mutates object
                assign(styleObj, themeValue);
            }
            else {
                classNamesArgsArr.push(themeValue);
            }
        });
        const returned = {};
        if (size(styleObj) > 0) {
            returned.style = styleObj;
        }
        const finalClassname = cn(classNamesArgsArr);
        if (finalClassname.length > 0) {
            returned.className = finalClassname;
        }
        return returned;
    };
    return memoize(regularFn, themeableDefaultMemoizeeOpts);
};
//# sourceMappingURL=themeable.js.map