import React, { FC, ReactNode, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const duration = 300;
export const HandleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  cursor: pointer;
  align-items: center;
`;

interface MyProps {
  toggled: boolean;
}

export const Toggle = styled.div<MyProps>`
  transition: all 0.4s ease;
  transform: rotateZ(${({ toggled }) => (toggled ? '-' : '')}90deg);
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GrowContainer = styled(AnimateHeight)`
  position: relative;
`;

interface IExpandingList {
  children?: ReactNode;
}

const ExpandingList: FC<IExpandingList> = ({ children }: IExpandingList) => {
  const myChildren = React.Children.toArray(children);
  const [itemsToggled, setItemsToggled] = useState(myChildren.map(() => -1));

  const toggleItems = (id) => () => {
    const currentItemsToggled = itemsToggled[id] === 1
      ? myChildren.map(() => -1)
      : myChildren.map((item, idx) => (idx === id ? 1 : -1));
    setItemsToggled(currentItemsToggled);
  };

  return <>
    {myChildren.map((child, idx) => {
      const toggled = itemsToggled[idx] >= 0;
      const currentState = toggled ? 'auto' : 0;

      const id = `item-${idx}`;
      const childProps = (child as React.ReactElement<any>).props;
      return childProps.display !== false ? (
        <React.Fragment key={id}>
          <HandleBar onClick={toggleItems(idx)}>
            <Name>{childProps['data-name']}</Name>
            <Toggle toggled={toggled}>
              <ChevronLeft style={{ width: '40px', height: '40px' }} />
            </Toggle>
          </HandleBar>
          <GrowContainer
            duration={duration}
            animateOpacity
            height={currentState}
          >
            {child}
          </GrowContainer>
        </React.Fragment>
      ) : null;
    })
    }
  </>;
};

export default ExpandingList;
