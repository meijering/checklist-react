import React, { useState } from 'react';
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


const ExpandingList = ({ children }) => {
  const [itemsToggled, setItemsToggled] = useState(children.map(() => 0));

  const toggleItems = (selectedItem) => {
    const currentItemsToggled = itemsToggled[selectedItem] === 1
      ? children.map(() => 0)
      : children.map((item, idx) => (idx === selectedItem ? 1 : -1));
    setItemsToggled(currentItemsToggled);
  };

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
          <Handle onClick={() => toggleItems(idx)} />
          {child}
      </GrowContainer>
    );
  });
};

ExpandingList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ExpandingList;
