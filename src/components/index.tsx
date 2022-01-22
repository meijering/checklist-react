import React, { FC, ReactNode, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useOvermind } from '../overmind';

const titles = new Map()
  .set('a', { path: '/', title: 'alle vragen', icon: <AssignmentIcon /> })
  .set('b', { path: 'dit-gaat-goed', title: 'dit gaat goed', icon: <AssignmentTurnedInIcon /> })
  .set('c', { path: 'dit-kan-beter', title: 'dit kan beter', icon: <AssignmentLateIcon /> });

interface IPublicGroupItem extends RouteComponentProps{
  children: ReactNode;
}

const Public: FC<IPublicGroupItem> = ({ children }: IPublicGroupItem) => {
  const { actions }: any = useOvermind();
  const [navigateTo, setNavigateTo] = useState('a');

  const handleFootChange = (evt, val) => {
    const { title, path } = titles.get(val) || titles.get('a');
    actions.changePageTitle(title);
    setNavigateTo(val);
    navigate(path);
  };

  return (
    <>
      {children}
      <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation value={navigateTo} onChange={handleFootChange} showLabels>
          {Array.from(titles).map(([key, value]) => {
            const { title, icon } = value;
            return <BottomNavigationAction key={key} label={title} value={key} icon={icon} />;
          })}
        </BottomNavigation>
      </AppBar>
    </>
  );
};

export default Public;
