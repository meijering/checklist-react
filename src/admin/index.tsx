import React, { FC, ReactNode } from 'react';
import { Link, RouteComponentProps } from '@reach/router';

interface IAdminGroupItem extends RouteComponentProps{
  children: ReactNode;
}

const Admin: FC<IAdminGroupItem> = ({ children }: IAdminGroupItem) => {

  return (
    <div>
      <h1>Admin</h1>
      <nav>
        <Link to="gebruikers">Gebruikers</Link>{' '}
        <Link to="groepen">Groepen</Link>{' '}
        <Link to="vragen">Vragen</Link>
      </nav>
      {children}
    </div>
  );
};

export default Admin;
