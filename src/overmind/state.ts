import { Derive } from 'overmind'

export type Credentials = {
  username: string,
  password: string,
}

export type RegisterData = {
  email: string,
  name: string,
}

export type PasswordData = {
  userId: string,
  password: string,
  token: string,
}

export type User = {
  gebruiker_id: number,
  naam: string,
  laatst_ingelogd: Date,
}

export type Answer = {
  antwoord_id: number,
  vraag_id: number,
  gebruiker_id: number,
  antwoord: string,
  ingevoerd_op: Date,
}

export type Remark = {
  opmerking_id: number,
  vraag_id: number,
  gebruiker_id: number,
  opmerking: string,
  ingevoerd_op: Date,
}

export type Tip = {
  tip_id: number,
  vraag_id: number,
  gebruiker_id: number,
  tip: string,
  ingevoerd_op: Date,
}

export type Question = {
  vraag_id: number,
  groep_id: number,
  type: string,
  rang: number,
  vraag: string,
  answers: Answer[],
  remarks: Remark[],
  tips: Tip[],
  ingevoerd_op: Date,
}

export type Group = {
  groep_id: number,
  naam: string,
  navigatie_naam: string,
  questions: Question[]
  thema: number,
}

export type Error = {
  check?: string,
  server?: string,
  login?: string,
}

export type State = {
  theme: number,
  waiting: boolean,
  isLoggedIn: boolean,
  passwordSent: boolean,
  isRegistered: boolean,
  message?: string,
  user?: User,
  hasLoaded: boolean,
  isSaving?: number,
  groups?: Group[],
  themedGroups: Derive<State, Group[]>,
  error: Error,
}

export const state: State = {
  waiting: false,
  passwordSent: false,
  isLoggedIn: false,
  isRegistered: false,
  hasLoaded: false,
  theme: 1,
  error: {},
  themedGroups: ({ groups, theme }) =>
    groups ? Object.values(groups).filter(item => item.thema === theme) : [],
}
