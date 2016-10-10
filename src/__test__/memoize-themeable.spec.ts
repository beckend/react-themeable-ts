import { themeable } from '../themeable';

const memProfile = require('memoizee/profile');

describe('themeable - memoize works', () => {
  const classes = { foo: 'aaa', bar: 'bbb' };
  const classTheme = themeable(classes);

  // Kind of crude but it works
  it('should memoize as expected', () => {
    // miss
    classTheme('foo');
    expect(memProfile.log().indexOf('0.00') !== -1)
      .toBeTruthy();
    // hit
    classTheme('foo');
    expect(memProfile.log().indexOf('50.00') !== -1)
      .toBeTruthy();
    // miss
    classTheme('bar');
    expect(memProfile.log().indexOf('33.33') !== -1)
      .toBeTruthy();
    // hit
    classTheme('bar');
    expect(memProfile.log().indexOf('50.00') !== -1)
      .toBeTruthy();
  });
});
