"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var constants_1 = require('./constants');
var ThemeProvider = (function (_super) {
    __extends(ThemeProvider, _super);
    function ThemeProvider() {
        _super.apply(this, arguments);
    }
    ThemeProvider.prototype.getChildContext = function () {
        return (_a = {},
            _a[constants_1.THEME_PROVIDER_CONTEXT_KEY] = this.props[constants_1.THEME_PROVIDER_CONTEXT_KEY],
            _a
        );
        var _a;
    };
    ThemeProvider.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    ThemeProvider.defaultProps = (_a = {},
        _a[constants_1.THEME_PROVIDER_CONTEXT_KEY] = {},
        _a
    );
    ThemeProvider.childContextTypes = (_b = {},
        _b[constants_1.THEME_PROVIDER_CONTEXT_KEY] = React.PropTypes.object.isRequired,
        _b
    );
    return ThemeProvider;
    var _a, _b;
}(React.PureComponent));
exports.ThemeProvider = ThemeProvider;

//# sourceMappingURL=theme-provider.js.map
