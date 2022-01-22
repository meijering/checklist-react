import { RouteComponentProps } from '@reach/router';
import React, { FC, useState, useEffect } from 'react';
import { useOvermind } from '../overmind';
import { Group } from '../overmind/state';
import AdminGroupItem from './GroupItem';
import ExpandingList from '../components/ExpandingList/ExpandingList';

const AdminGroups: FC<RouteComponentProps> = () => {
  const { state } = useOvermind();

  const [currentGroups, setCurrentGroups] = useState<any>(state.themedGroups);
  // const [activeItem, setActiveItem] = useState<any>();

  useEffect(() => {
    setCurrentGroups(state.themedGroups);
  }, [state.themedGroups]);

  // const toggleGroups = (item: number, value: boolean) => {
  //   setActiveItem(value ? undefined : item);
  // };

  return (
    <ExpandingList>
      {currentGroups.map((group: Group) => (
        <AdminGroupItem
          key={group.groepId}
          data-name={group.naam}
          group={group}
        />
      ))}
    </ExpandingList>
  );
};

export default AdminGroups;
