/* tslint:disable: variable-name */
import * as React from 'react';
import {
  ThemeProvider,
  IThemeProviderContext,
} from '../theme-provider';
import { THEME_PROVIDER_CONTEXT_KEY } from '../constants';
import {
  themeDecorator,
  IHOCDefaultNoThemeProps,
} from '../hoc';

const renderer = require('react-test-renderer');

describe('theme-provider context tests', () => {
  it('basic pass all props', () => {
    const ComponentWithContext1: React.SFC<{}> = (props: any, context: IThemeProviderContext & any) => {
      return (
        <div>
          {context[THEME_PROVIDER_CONTEXT_KEY].mystr}
        </div>
      );
    };

    ComponentWithContext1.contextTypes = {
      [THEME_PROVIDER_CONTEXT_KEY]: React.PropTypes.object.isRequired,
    };

    const component = renderer.create(
      <ThemeProvider
        reactThemeable={{
          mystr: 'context string',
        }}
      >
        <ComponentWithContext1 />
      </ThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('theme-provider context with HOC test', () => {
  it('should get the correct context key and render theme', () => {
    interface IComponentWithContext2NoHOCProps {}
    interface IComponentWithContext2Props extends IComponentWithContext2NoHOCProps, IHOCDefaultNoThemeProps {}
    const ComponentWithContext2: React.SFC<IComponentWithContext2Props> = (props: any, context: IThemeProviderContext) => {
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

    ComponentWithContext2.contextTypes = {
      [THEME_PROVIDER_CONTEXT_KEY]: React.PropTypes.object.isRequired,
    };

    const decoratorFn = themeDecorator({
      contextPath: [THEME_PROVIDER_CONTEXT_KEY, 'ComponentWithContext2'],
    });
    const MyDecoratedComponent: React.SFC<IComponentWithContext2NoHOCProps> = decoratorFn(ComponentWithContext2);
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
