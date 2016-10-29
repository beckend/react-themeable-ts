"use strict";
const React = require('react');
const constants_1 = require('./constants');
class ThemeProvider extends React.PureComponent {
    getChildContext() {
        return {
            [constants_1.THEME_PROVIDER_CONTEXT_KEY]: this.props[constants_1.THEME_PROVIDER_CONTEXT_KEY],
        };
    }
    render() {
        return React.Children.only(this.props.children);
    }
}
ThemeProvider.defaultProps = {
    [constants_1.THEME_PROVIDER_CONTEXT_KEY]: {},
};
ThemeProvider.childContextTypes = {
    [constants_1.THEME_PROVIDER_CONTEXT_KEY]: React.PropTypes.object.isRequired,
};
exports.ThemeProvider = ThemeProvider;

//# sourceMappingURL=theme-provider.js.map
