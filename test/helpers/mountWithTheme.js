import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import themeZiggo from '@vfz/vfz-core-eshop-components/build/themes/themeZiggo';

const mountWithTheme = (tree) => {
  const context = shallow(<ThemeProvider theme={themeZiggo} />)
    .instance()
    .getChildContext();

  return mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes,
    // Needed so child components receive the theme prop
  });
};

export const shallowWithTheme = (tree) => {
  const context = shallow(<ThemeProvider theme={themeZiggo} />)
    .instance()
    .getChildContext();

  return shallow(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes,
    // Needed so child components receive the theme prop
  });
};
export default mountWithTheme;
