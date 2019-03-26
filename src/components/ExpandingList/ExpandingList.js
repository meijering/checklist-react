import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { media } from '../../utils/media';

export const Handle = styled(ChevronLeft)`
  position: absolute;
  right: 12px;
  top: 0px;
  &.closed {
    transform: rotateZ(-90deg);
    transition: all 0.4s ease;
    width: 40px;
    height: 40px;
  }
  &.opened {
    transform: rotateZ(90deg);
    transition: all 0.4s ease;
    width: 40px;
    height: 40px;
  }
  ${media.phone`
    display: none !important;
  `}
`;
const GrowContainer = styled(AnimateHeight)`
  position: relative;
`;


class ExpandingList extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      itemsToggled: props.children.map(() => 0),
    };
  }

  toggleItems = (selectedItem) => {
    const { children } = this.props;
    const { itemsToggled } = this.state;
    const currentItemsToggled = itemsToggled[selectedItem] === 1
      ? children.map(() => 0)
      : children.map((item, idx) => (idx === selectedItem ? 1 : -1));
    this.setState({ itemsToggled: currentItemsToggled });
  }

  render() {
    const { children } = this.props;
    const { itemsToggled } = this.state;
    const processedChildren = React.Children.map(children, (child, idx) => (
      React.cloneElement(child, { showDetail: itemsToggled[idx] === 1 })
    ));

    return processedChildren.map((child, idx) => {
      const currentState = itemsToggled[idx] >= 0;
      const id = `item-${idx}`;
      return (
        <GrowContainer
          key={id}
          duration={300}
          animateOpacity
          height={currentState ? 'auto' : 0}
        >
            <Handle onClick={() => this.toggleItems(idx)} />
            {child}
        </GrowContainer>
      );
    });
  }
}

export default ExpandingList;
