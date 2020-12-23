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
  interface Config extends IConfig<typeof config> {}
};

export const useOvermind = createHook<typeof config>();
