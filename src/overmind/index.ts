import { IConfig } from 'overmind';
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
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Config extends IConfig<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
  }> {}
  // Due to circular typing we have to define an
  // explicit typing of state, actions and effects since
  // TS 3.9
}

export const useOvermind = createHook<typeof config>();
