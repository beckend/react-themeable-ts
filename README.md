[![Build Status](https://travis-ci.org/beckend/react-themeable-ts.svg?branch=master)](https://travis-ci.org/beckend/react-themeable-ts)
[![Coverage Status](https://coveralls.io/repos/github/beckend/react-themeable-ts/badge.svg?branch=master)](https://coveralls.io/github/beckend/react-themeable-ts?branch=master)
[![npm](https://img.shields.io/npm/v/react-themeable-ts.svg??maxAge=2592000)](https://www.npmjs.com/package/react-themeable-ts)
[![Dependency Status](https://img.shields.io/david/beckend/react-themeable-ts.svg?maxAge=2592000)](https://david-dm.org/beckend/react-themeable-ts)
[![DevDependency Status](https://img.shields.io/david/dev/beckend/react-themeable-ts.svg?maxAge=2592000)](https://david-dm.org/beckend/react-themeable-ts?type=dev)

# react-themeable-ts

A CommonJS/es2015 module, inspired by [react-themeable](https://github.com/markdalgleish/react-themeable) and [react-themr](https://github.com/javivelasco/react-css-themr).


Features:
- Written in typescript and typings are auto generated.
- Unlike `react-themeable` does not handle `key` in returned payload at all. That means that radium users must manually supply `key` to their react elements. You are better off using [react-themeable](https://github.com/markdalgleish/react-themeable) instead.
- Main function theme parameter can be empty, in case you do conditional stuff and it ends up being falsely.
- You may mix classnames and style objects, they will be merged in the order you specify the arguments.
- Fully memoized if you use it in combination with the higher order component decorator. That means it's really fast on re-renders, as it only calculates if the `theme` prop changes.
- Allows you to do conditional classes if you wrap an object with an array, that is because an object will be used as a `style` prop payload. All other argument payload types will be passed to [classname](https://github.com/JedWatson/classnames) module.

# Usage

```js
<MyComponent theme={theme} />
```

## Install

`npm -S i react-themeable-ts`

## Usage

`react-themeable-ts` exports `themeable` and internal function typescript interfaces.

This function is designed to accept a `theme` prop inside of your `render` method. This then returns a small helper function that accepts a series of style names.

```js
const theme = themeable(this.props.theme);
...
<div {...theme(...styleNames)} />
```

This helper function detects whether a theme is class or style based, and creates the appropriate attributes for you.
These attributes are either a `style` object or `classname` string depending on the payload.

### For example:

```js
import React, { Component } from 'react';
import { themeable } from 'react-themeable-ts';

class MyComponent extends Component {
  render() {
    const theme = themeable(this.props.theme);

    return (
      <div {...theme('root')}>
        <div {...theme('foo', 'bar')}>Foo Bar</div>
        <div {...theme('baz')}>Baz</div>
      </div>
    );
  }
}
```

A theme can now be passed to your component like so:

### CSS Modules - maps to `className` prop to elements

`MyComponentTheme.css`
```css
.root { color: black; }
.foo { color: red; }
.foo:hover { color: green; }
.bar { color: blue; }
```

```js
import theme from './MyComponentTheme.css';
...
<MyComponent theme={theme} />
```

### Aphrodite

```js
import { StyleSheet, css } from 'aphrodite';

const theme = StyleSheet.create({
  root: {
    color: 'black'
  },
  foo: {
    color: 'red',
    ':hover': {
      color: 'green'
    }
  },
  bar: {
    color: 'blue'
  }
});
...
<MyComponent theme={[ theme, css ]} />
```

### React Style

```js
import StyleSheet from 'react-style';

const theme = StyleSheet.create({
  root: {
    color: 'black'
  },
  foo: {
    color: 'red'
  },
  bar: {
    color: 'blue'
  }
});
...
<MyComponent theme={theme} />
```

### JSS

```js
Import jss from 'jss';

const sheet = jss.createStyleSheet ({
  root: {
    color: 'black'
  },
  foo: {
    color: 'red'
  },
  bar: {
    color: 'blue'
  }
}).attach();
...
<MyComponent theme={sheet.classes} />
```

### Global CSS

```css
.MyComponent__root { color: black; }
.MyComponent__foo { color: red; }
.MyComponent__foo:hover { color: green; }
.MyComponent__bar { color: blue; }
```

```js
const theme = {
  root: 'MyComponent__root',
  foo: 'MyComponent__foo',
  bar: 'MyComponent__bar'
};
...
<MyComponent theme={theme} />
```

### Inline styles

```js
const theme = {
  root: {
    color: 'black'
  },
  foo: {
    color: 'red'
  },
  bar: {
    color: 'blue'
  }
};
...
<MyComponent theme={theme} />
```

## HOC - Higher order component
When decorating a stateless function/Class the defaults are:
- `theme` prop will accept the classes/styles
- `t` prop will become the resulting function invoked with `themeable(props.theme)` from above.
- The themable function will be memoized and will return a new function if only the main `theme` object changes. The returning themeable function is in turn also memoized and will not compute unless argument changed which was not already memoized.

### Examples:

Defaults
```js
import { PureComponent } from 'react';
import { themeDecorator } from 'react-themeable-ts';

@themeDecorator()
class MyComponent extends PureComponent {

  render() {
    const theme = props.t;
    return (
      <div {...theme('root')}>
        <span {...theme('span1')}>
          My test SFC component
        </span>
        <p {...theme('p1')}>
          My test SFC component
        </p>
      </div>
    );
  }

};

// Component used
const MyJSXElement = (
  <MyComponent
    theme={{
      root: 'class-root',
      span1: 'class-span1',
      p1: 'class-p1',
    }}
  >
);
```

With custom options
```js
import { PureComponent } from 'react';
import { themeDecorator } from 'react-themeable-ts';

@themeDecorator({
  // Rename default from 'theme' to something else
  themeKey: 'customThemeProp',
  // Rename default `t` to something else
  themeProp: 'myThemeableFn',
})
class MyComponent extends PureComponent {

  render() {
    const theme = props.myThemeableFn;
    return (
      <div {...theme('root')}>
        <span {...theme('span1')}>
          My test SFC component
        </span>
        <p {...theme('p1')}>
          My test SFC component
        </p>
      </div>
    );
  }

};

// Component used
const MyJSXElement = (
  <MyComponent
    customThemeProp={{
      root: 'class-root',
      span1: 'class-span1',
      p1: 'class-p1',
    }}
  >
);
```


## ThemeProvider - Wrapper component
Optional HOC you can use if you feel like globally handling themes via React context.
It accepts one single prop `reactThemeable` as an object which you can freely nest however you please.

### Examples:
```js
import { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'react-themable-ts';

class App extends PureComponent {

  render() {
    return (
      <ThemeProvider
        reactThemeable={{
          ComponentWithContext2: {
            root: 'class-root',
            span1: 'class-span1',
            p1: 'class-p1',
          },
        }}
      >
        {props.children}
      </ThemeProvider>
    );
  }

}

// Any component can then access the context for example:
import { themeable } from 'react-themeable-ts';

const MyStatelessComponent = (props, context) => {
  const theme = themeable(context.reactThemeable.ComponentWithContext2);
  return (
    <div {...theme('root')}>
      My content
    </div>

  );
};
MyStatelessComponent.contextTypes = {
  reactThemeable: PropTypes.object.isRequired,
};
```

Usage with HOC:
```js
import { themeDecorator } from 'react-themeable-ts';
import { PureComponent, PropTypes } from 'react';

// First decorate a component with HOC
const decoratorFn = themeDecorator({
  contextPath: ['reactThemeable', 'ComponentWithContext2'],
  // or string with dots, see object-path get method https://github.com/mariocasciaro/object-path
  // contextPath: 'reactThemeable.ComponentWithContext2',
});

const MyStatelessComponent = (props, context) => {
  const { t } = props;
  return (
    <div {...t('root')}>
      <span {...t('span1')}>
        My test SFC component
      </span>
      <p {...t('p1')}>
        My test SFC component
      </p>
    </div>
  );
};
MyStatelessComponent.contextTypes = {
  reactThemeable: PropTypes.object.isRequired,
};

const MyDecoratedComponent = decoratorFn(MyStatelessComponent);

// Then use in theme provider
// This works because the HOC comes with contextTypes enabled for prop reactThemeable.
class App extends React.PureComponent {

  render() {
    return (
      <ThemeProvider
        reactThemeable={{
          ComponentWithContext2: {
            root: 'class-root',
            span1: 'class-span1',
            p1: 'class-p1',
          },
        }}
      >
        <MyDecoratedComponent />
      </ThemeProvider>
    );
  }

}
```

# API
`themeable` - Main function
```js
import { themeable } from 'react-themeable-ts';
// Or without react as dependency
// import { themeable } from 'react-themeable-ts/themeable';
```
Accepts any number of comma-separated values.
Also accepts nothing, in case you do conditional stuff and it ends up being falsely.
The falsely values will be omitted and string values will be mapped to either `className` string or `style` object and then merged in order you specify the arguments.

### Examples:

`className`
```js
const theme = {
  root: 'root-class'
  elephant: ''
};

const t = themeable(theme);

t('root');
// {
//  className: 'root-class'
// }

t('root', 'does-not-exist', null, undefined, 'another one', 'elephant');
// {
//  className: 'root-class'
// }
```

`style`
```js
const theme = {
  root: {
    color: 'red',
    display: 'none'
  }
};

const t = themeable(theme);

t('root');
// {
//  style: {
//    color: 'red',
//    display: 'none'
//  }
// }

t('root', 'does-not-exist', null, undefined, 'another one');
// {
//  style: {
//    color: 'red',
//    display: 'none'
//  }
// }
```


Advanced `className` and `style` and conditional mix, the real power of the library.
```js
describe('advanced classnames with classnames module', () => {
  const styles = {
    root: 'rrr',
    common: 'common-class',
    foo: 'fff',
    bar: {
      color: 'blue',
      fontWeight: 'bold',
    },
    baz: 'bbb',
    hover: {
      color: 'red',
      display: 'block',
    },
    base: {
      fontWeight: 400,
      backgroundColor: 'blue',
    },
    con1: ['con1', 'con11'],
    con2: [{
      con2: true,
      con22: 'truthy string',
    }],
    con3: [
      {
        con3: false,
      },
      'con33',
    ],
  };
  const advClassnames = themeable(styles);

  it('it passes all but objects to classname module', () => {
    expect(advClassnames(
      0,
      null,
      undefined,
      'root',
      'common',
      'foo',
      'bar',
      'baz',
      'hover',
      'does not exist',
      '',
      'base',
      'con1',
      'con2',
      'con3'
    ))
      .to.deep.equal({
        style: {
          color: 'red',
          fontWeight: 400,
          display: 'block',
          backgroundColor: 'blue',
        },
        className: 'rrr common-class fff bbb con1 con11 con2 con22 con33',
      });
  });
});
```

---

`themeDecorator` - HOC
```js
import { themeDecorator } from 'react-themeable-ts';
```
Accepts single argument and is an object with props:

| Parameter | Default | Type | Description
|:---|:---|:---|:---
| themeKey(optional) | `theme` | `string` | The prop the HOC will use as argument for themeable. |
| themeProp(optional) | `t` | `string` | The prop name passed prop to DecoratedComponent as the returned themeable function. |
| memoizeeOpts(optional) | `{ length: 1, max: 10 }` | Object | options passed to [memoizee](https://github.com/medikoo/memoizee) function. |
| contextPath(optional) | undefined | `string`/`string[]` | If truthy will be used as a path variable to navigate in context and will override `themeKey`. It accepts [object-path get method argument](https://github.com/mariocasciaro/object-path) to navigate in `context` prop. |




## Contributing

### Requires
- `npm@4.x` because of `package.json` - `prepare` script. (only required to run hook when publish)
- `npm -g i gulp-cli jest-cli`.

### Usage
- `gulp --tasks` to get going.

### Developing
- `jest --watchAll` to watch recompiled files and rerun tests.

### Testing
Supports:
- `jest`, needs `jest-cli` installed. it will execute the transpiled files from typescript.

### Dist
- `gulp` will run default task which consist of running tasks:
- `lint`, `clean`, `build`, `minify` then `jest` and collect coverage.
