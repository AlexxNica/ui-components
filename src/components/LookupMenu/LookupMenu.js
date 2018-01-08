import React from 'react';
import styled from 'styled-components';
import { map, includes, lowerCase, filter } from 'lodash';

import Input from '../Input';

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li``;

const Styled = component => styled(component)``;

function filterItems(items, query) {
  if (!query) {
    return items;
  }

  const result = filter(items, i =>
    includes(lowerCase(i.label), lowerCase(query))
  );
  if (result.length === 0) {
    return [{ value: null, label: 'No items found' }];
  }
  return result;
}

/**
 * A searchable menu
 * ```javascript
 *  <LookupMenu items={items} value={this.state.selected} onChange={onChange}  />
 * ```
 */

class LookupMenu extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: []
    };

    this.filterItems = this.filterItems.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.filterItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.filterItems(nextProps);
  }

  filterItems({ items }, query) {
    this.setState({
      items: query ? filterItems(items, query) : items
    });
  }

  handleSearch(ev) {
    this.filterItems(this.props, ev.target.value);
  }

  render() {
    const { className } = this.props;
    const { items } = this.state;

    return (
      <div className={className}>
        <Input
          onChange={this.handleSearch}
          onClick={e => e.stopPropagation()}
          onKeyDown={this.handleKeyboardNavigation}
        />
        <List>{map(items, i => <Item key={i.value}>{i.label}</Item>)}</List>
      </div>
    );
  }
}

export default Styled(LookupMenu);
