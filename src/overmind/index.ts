import { createOvermind, IConfig } from 'overmind';
import { state } from './state';
import * as actions from './actions';
import * as effects from './effects';
import { createHook } from 'overmind-react';

export const config = {
  state,
  actions,
  effects,
};

declare module 'overmind' {
  // tslint:disable-next-line: interface-name
  interface Config extends IConfig<typeof config> {}
  //   state: typeof config.state;
  //   actions: typeof config.actions;
  //   effects: typeof config.effects;
  // } > {};
  // Due to circular typing we have to define an
  // explicit typing of state, actions and effects since
  // TS 3.9
}

export const overmind = createOvermind(config, { devtools: 'localhost:3002' });
export const useOvermind = createHook<typeof config>();
