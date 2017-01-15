"use strict";
var tslib_1 = require("tslib");
var React = require("react");
var constants_1 = require("./constants");
var ThemeProvider = (function (_super) {
    tslib_1.__extends(ThemeProvider, _super);
    function ThemeProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemeProvider.prototype.getChildContext = function () {
        return _a = {},
            _a[constants_1.THEME_PROVIDER_CONTEXT_KEY] = this.props[constants_1.THEME_PROVIDER_CONTEXT_KEY],
            _a;
        var _a;
    };
    ThemeProvider.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    return ThemeProvider;
}(React.PureComponent));
ThemeProvider.defaultProps = (_a = {},
    _a[constants_1.THEME_PROVIDER_CONTEXT_KEY] = {},
    _a);
ThemeProvider.childContextTypes = (_b = {},
    _b[constants_1.THEME_PROVIDER_CONTEXT_KEY] = React.PropTypes.object.isRequired,
    _b);
exports.ThemeProvider = ThemeProvider;
var _a, _b;
//# sourceMappingURL=theme-provider.js.map