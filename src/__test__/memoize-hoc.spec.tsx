/* tslint:disable: variable-name */
import * as React from 'react';
import {
  themeDecorator,
  IHOCDefaultNoThemeProps,
} from '../hoc';

const memProfile = require('memoizee/profile');
const renderer = require('react-test-renderer');

interface IMemoizeHOCTestProps {
  theme?: {
    root?: any;
  };
}
interface IMemoizeHOCTestAllProps extends IMemoizeHOCTestProps, IHOCDefaultNoThemeProps {}
interface IMemoizeHOCTestState {
  hovered: string;
}
class MemoizeHOCTest extends React.PureComponent<IMemoizeHOCTestAllProps, IMemoizeHOCTestState> {

  public state = {
    hovered: 'false',
  };

  public _onMouseEnter = () => {
    this.setState({
      hovered: 'true',
    });
  };

  public _onMouseLeave = () => {
    this.setState({
      hovered: 'false',
    });
  }

  public render() {
    const { t } = this.props;
    return (
      <div
        {...t('root') }
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      / >
    );
  }

}

describe('hoc - memoize works', () => {
  it('should memoize as expected', () => {
    const decoratorFn = themeDecorator();
    const MyDecoratedComponent: React.SFC<IMemoizeHOCTestProps> = decoratorFn(MemoizeHOCTest);
    const component = renderer.create(
      <MyDecoratedComponent
        theme={{
          root: 'class-root',
        }}
      />
    );
    // cache miss at render
    const tree = component.toJSON();
    expect(memProfile.log().indexOf('0.00') !== -1)
      .toBeTruthy();
    // trigger re-render cache hit
    tree.props.onMouseEnter();
    expect(memProfile.log().indexOf('33.33') !== -1)
      .toBeTruthy();
    // trigger re-render cache hit
    tree.props.onMouseLeave();
    expect(memProfile.log().indexOf('50.00') !== -1)
      .toBeTruthy();
  });
});
