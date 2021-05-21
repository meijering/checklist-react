/* eslint-disable no-shadow, max-len */
import { derived } from 'overmind';

export type Credentials = {
  username: string;
  password: string;
};

export type RegisterData = {
  email: string;
  name: string;
};

export type PasswordData = {
  userId: string;
  password: string;
  token: string;
};

export type User = {
  gebruikerId: number;
  naam: string;
  laatstIngelogd: Date;
};

export type Answer = {
  antwoordId: number;
  vraagId: number;
  gebruikerId: number;
  antwoord: string;
  ingevoerdOp: Date;
};

export type Remark = {
  opmerkingId: number;
  vraagId: number;
  gebruikerId: number;
  opmerking: string;
  ingevoerdOp: Date;
};

export type Tip = {
  tipId: number;
  vraagId: number;
  gebruikerId: number;
  tip: string;
  ingevoerdOp: Date;
};

export type Question = {
  vraagId: number;
  groepId: number;
  type: string;
  rang: number;
  vraag: string;
  answers: Answer[];
  remarks: Remark[];
  tips: Tip[];
  ingevoerdOp: Date;
};

export type Group = {
  groepId: number;
  naam: string;
  navigatieNaam: string;
  questions: Question[];
  thema: number;
};

export type Message = {
  code: string;
  type: string;
  message: string;
};

export type Error = {
  check?: string;
  server?: string;
  login?: string;
};

export type State = {
  theme: number;
  waiting: boolean;
  isLoggedIn: boolean;
  passwordSent: boolean;
  isRegistered: boolean;
  message?: Message;
  user?: User;
  hasLoaded: boolean;
  isSaving?: number;
  groups?: Group[];
  themedGroups: Group[];
  error: Error;
  externalUrl?: string;
};

export const state: State = {
  waiting: false,
  passwordSent: false,
  isLoggedIn: false,
  isRegistered: false,
  hasLoaded: false,
  theme: 1,
  error: {},
  themedGroups: derived((thisstate: State) => (thisstate.groups ? Object.values(thisstate.groups).filter((item: any) => item.thema === thisstate.theme) : [])),
};
