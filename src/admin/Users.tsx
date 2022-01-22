import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useOvermind } from '../overmind';
import { User } from '../overmind/state';

const Users: FC<RouteComponentProps> = () => {
  const { state, actions }: any = useOvermind();

  useEffect(() => {
    actions.getUsers();
  }, []);
  return (
    <>
      {state.users?.map((user: User) => {
        return (
          <li key={user.gebruikerId}>
            {user.naam}
          </li>
        );
      })}
    </>
  );
};

export default Users;
