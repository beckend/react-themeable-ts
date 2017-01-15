/* tslint:disable: variable-name */
/* tslint:disable: max-classes-per-file */
import * as React from 'react';
import {
  IHOCDefaultNoThemeProps,
  themeDecorator,
} from '../hoc';
import {
  IStaticFnReturn,
} from '../themeable';

const renderer = require('react-test-renderer');

/**
 * SFC to use with default decorator (no params to it)
 */
interface IIMySFCCompNoHOCProps {
  theme?: {
    root?: any;
    span1?: any;
    p1?: any;
  };
}
interface IMySFCCompProps extends IHOCDefaultNoThemeProps, IIMySFCCompNoHOCProps {}
const MySFCComp: React.SFC<IMySFCCompProps> = (props) => {
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

/**
 * SFC with decorator with custom options
 */
interface IMySFCCompNoHOCCustomParamsProps {
  customThemeProp?: {
    p1?: any;
    root?: any;
    span1?: any;
  };
}
interface IMySFCCompCustomParamsProps extends IMySFCCompNoHOCCustomParamsProps {
  myThemeableFn: IStaticFnReturn;
}
const MySFCCompCustomParams: React.SFC<IMySFCCompCustomParamsProps> = (props) => {
  const t = props.myThemeableFn;
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

describe('HOC basic functionality', () => {
  it('passed all props', () => {
    interface IMyPassedPropsCompProps {
      str1: string;
      bool1: boolean;
      number1: number;
    }
    const MyPassedPropsComp: React.SFC<IMyPassedPropsCompProps> = (props) => {
      return (
        <div>
          My str: {props.str1}
          My bool: {props.bool1 ? 'true' : 'false'}
          My number: {props.number1}
        </div>
      );
    };

    const decoratorFn = themeDecorator();
    const MyDecoratedComponent: React.SFC<IMyPassedPropsCompProps> = decoratorFn(MyPassedPropsComp);

    const component = renderer.create(
      <MyDecoratedComponent
        str1='ok'
        bool1
        number1={1338}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HOC as function', () => {
  it('no arguments', () => {
    const decoratorFn = themeDecorator();
    const MyDecoratedComponent: React.SFC<IIMySFCCompNoHOCProps> = decoratorFn(MySFCComp);
    const component = renderer.create(
      <MyDecoratedComponent
        theme={{
          p1: 'class-p1',
          root: 'class-root',
          span1: 'class-span1',
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with custom arguments', () => {
    const decoratorFn = themeDecorator({
      themeKey: 'customThemeProp',
      themeProp: 'myThemeableFn',
    });
    const MyDecoratedComponent: React.SFC<IMySFCCompNoHOCCustomParamsProps> = decoratorFn(MySFCCompCustomParams);
    const component = renderer.create(
      <MyDecoratedComponent
        customThemeProp={{
          p1: 'class-p1',
          root: 'class-root',
          span1: 'class-span1',
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HOC on class', () => {
  it('decorates class as a function', () => {
    const decoratorFn = themeDecorator();

    class HOCDecorateTest extends React.PureComponent<IMySFCCompProps, {}> {

      public render() {
        const { t } = this.props;
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
      }

    }

    const MyDecoratedComponent: React.SFC<IIMySFCCompNoHOCProps> = decoratorFn(HOCDecorateTest);
    const component = renderer.create(
      <MyDecoratedComponent
        theme={{
          p1: 'class-p1',
          root: 'class-root',
          span1: 'class-span1',
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('decorates class as a decorator', () => {
    @themeDecorator()
    class HOCDecorateTest extends React.Component<IMySFCCompProps, {}> {

      public render() {
        const { t } = this.props;
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
      }

    }

    const HOCDecorateTestNOHocProps: React.ComponentClass<IIMySFCCompNoHOCProps> = HOCDecorateTest;
    const component = renderer.create(
      <HOCDecorateTestNOHocProps
        theme={{
          p1: 'class-p1',
          root: 'class-root',
          span1: 'class-span1',
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
