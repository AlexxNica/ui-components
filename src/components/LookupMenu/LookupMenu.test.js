import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { withTheme } from '../../utils/theme';

import LookupMenu from './LookupMenu';

const items = [
  {
    value: 'first-thing',
    label: 'First Thing'
  },
  {
    value: 'second-thing',
    label: 'Second Thing'
  },
  {
    value: 'third-thing',
    label: 'Super long thing, this should get truncated'
  }
];

describe('<LookupMenu />', () => {
  it('renders a list of items', () => {
    const menu = mount(withTheme(<LookupMenu items={items} />));
    expect(menu.find('ul').children().length).toEqual(items.length);
  });
  it('filters a list of items', () => {
    const menu = mount(withTheme(<LookupMenu items={items} />));
    menu.find('input').simulate('change', { target: { value: 'second' } });
    expect(menu.find('ul').children().length).toEqual(1);
  });
});
