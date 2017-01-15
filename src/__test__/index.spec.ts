import {
  themeable,
  themeDecorator,
  ThemeProvider,
} from '../index';

describe('index', () => {
  it('exports all components', () => {
    expect(themeable)
      .toBeTruthy();
    expect(themeDecorator)
      .toBeTruthy();
    expect(ThemeProvider)
      .toBeTruthy();
  });
});
