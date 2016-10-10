/* tslint:disable: mocha-no-side-effect-code */
/**
 * Main lib tests
 */
import { themeable } from '../themeable';
import { expect } from 'chai';

describe('empty', () => {
  it('no arguments', () => {
    const classTheme = themeable();
    expect(classTheme('foo'))
      .to.deep.equal({});
  });

  it('null', () => {
    const classTheme = themeable(null);
    expect(classTheme('foo'))
      .to.deep.equal({});
  });

  it('undefined', () => {
    const classTheme = themeable(undefined);
    expect(classTheme('foo'))
      .to.deep.equal({});
  });
});

describe('className', () => {
  const classes = { foo: 'aaa', bar: 'bbb' };
  const classTheme = themeable(classes);

  it('should return a single class', () => {
    expect(classTheme('foo'))
      .to.deep.equal({
        className: classes.foo,
      });
  });

  it('should return multiple classes', () => {
    expect(classTheme('foo', 'bar'))
      .to.deep.equal({
        className: `${classes.foo} ${classes.bar}`,
      });
  });

  it('should ignore falsy values', () => {
    expect(classTheme(null, 'foo', undefined, false))
      .to.deep.equal({
        className: classes.foo,
      });
  });

  it('yield empty object if no arguments, or falsely values', () => {
    expect(classTheme())
      .to.deep.equal({});
    expect(classTheme(null, undefined, null, undefined))
      .to.deep.equal({});
  });
});

describe('styles with classname decorator (e.g. Aphrodite)', () => {
  const classes = { foo: { color: 'red' }, bar: { color: 'blue' } };
  const colorsToString = (...styles: any[]) => styles.map((x) => x.color).join(' ');
  const classTheme = themeable([classes, colorsToString]);

  it('should return a single class', () => {
    expect(classTheme('foo'))
      .to.deep.equal({
        className: 'red',
      });
  });

  it('should return multiple classes', () => {
    expect(classTheme('foo', 'bar'))
      .to.deep.equal({
        className: 'red blue',
      });
  });

  it('should ignore falsy values', () => {
    expect(classTheme(null, 'foo', undefined, false))
      .to.deep.equal({
        className: 'red',
      });
  });

  it('yield empty object if no arguments, or falsely values', () => {
    expect(classTheme())
      .to.deep.equal({});
    expect(classTheme(null, undefined, null, undefined))
      .to.deep.equal({});
  });
});

describe('style', () => {
  const styles = {
    foo: {
      color: 'red',
      fontSize: '16px',
    },
    bar: {
      color: 'blue',
      fontWeight: 'bold',
    },
  };
  const styleTheme = themeable(styles);

  it('should return a single style', () => {
    expect(styleTheme('foo'))
      .to.deep.equal({
        style: {
          color: 'red',
          fontSize: '16px',
        },
      });
  });

  it('should return multiple styles merged', () => {
    expect(styleTheme('foo', 'bar'))
      .to.deep.equal({
        style: {
          fontSize: '16px',
          color: 'blue',
          fontWeight: 'bold',
        },
      });
  });

  it('should ignore falsy values', () => {
    expect(styleTheme(false, undefined, 'foo', null))
      .to.deep.equal({
        style: {
          color: 'red',
          fontSize: '16px',
        },
      });
  });

  it('yield empty object if no arguments, or falsely values', () => {
    expect(styleTheme())
      .to.deep.equal({});
    expect(styleTheme(null, undefined, null, undefined))
      .to.deep.equal({});
  });
});

describe('style and classes mix', () => {
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
  };
  const mixTheme = themeable(styles);

  it('mix 1 in a particular order', () => {
    expect(mixTheme('root', 'base', 'baz', 'hover', 'foo', 'bar'))
      .to.deep.equal({
        className: 'rrr bbb fff',
        style: {
          fontWeight: 'bold',
          backgroundColor: 'blue',
          color: 'blue',
          display: 'block',
        },
      });
  });

  it('mix 2 in reverse order', () => {
    expect(mixTheme('bar', 'foo', 'hover', 'baz', 'base', 'root'))
      .to.deep.equal({
        className: 'fff bbb rrr',
        style: {
          color: 'red',
          fontWeight: 400,
          display: 'block',
          backgroundColor: 'blue',
        },
      });
  });
});

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
