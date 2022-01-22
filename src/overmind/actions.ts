/* eslint-disable no-param-reassign, no-unused-vars, max-len */
import { navigate } from '@reach/router';
import { Action, AsyncAction } from 'overmind';
import { RegisterData, PasswordData, Credentials, Message, Question, Group } from './state';

const messages: Message[] = [
  { code: '', type: '', message: '' },
  { code: 'R00', type: 'info', message: 'Je bent geregistreerd. Je ontvangt een E-mail waarin je inloggegevens staan.' },
  { code: 'R01', type: 'info', message: 'Dit emailadres is al bekend maar is niet geactiveerd.' },
  { code: 'R02', type: '', message: 'Dit e-mailadres is al geregistreerd. Als je je wachtwoord bent vergeten, gebruik dan de "wachtwoord vergeten" optie om een nieuw wachtwoord opvragen.' },
  { code: 'R03', type: 'info', message: 'Je toegangscode is gewijzigd!'},
  { code: 'R04', type: 'info', message: 'Je bent uitgelogd' },
  { code: 'P00', type: '', message: 'Er is een mail naar je toegestuurd met instructies om je wachtwoord te wijzigen.' },
  { code: 'E01', type: 'error', message: 'Je bent al ergens ingelogd. Log eerst daar uit, of wacht tot die sessie is verlopen. Dit duurt maximaal een uur.' },
  { code: 'E02', type: 'error', message: 'De combinatie van e-mail adres en wachtwoord is niet bekend' },
  { code: 'E99', type: 'error', message: 'Er is iets fout gegaan.'},
  { code: 'V01', type: 'info', message: 'De wijzigingen zijn doorgevoerd'},
];

/**
 * Authorisation actions
 */
export const checkLogin: AsyncAction = async ({ effects, state }: any): Promise<void> => {
  const isLoggedIn = await effects.api.checkLoggedIn();
  if (isLoggedIn) {
    state.user = isLoggedIn;
    const groups = await effects.api.getGroups();
    state.groups = groups;
    state.isLoggedIn = true;
  }
  state.hasLoaded = true;
};

export const doSendPwd: AsyncAction<string> = async ({ effects, state }, email) => {
  state.passwordSent = false;
  const pwSent = await effects.api.askForPassword(email);
  const thisMessage = messages.find((m) => m.code === pwSent) || messages[0];
  state.message = thisMessage;
  state.passwordSent = true;
};

export const releaseSendPwd: Action = ({ effects, state }) => {
  state.passwordSent = false;
};

export const doRegister: AsyncAction<RegisterData> = async ({ effects, state }, registerData) => {
  state.isRegistered = false;
  const userData = await effects.api.setCredentials(registerData);
  const thisMessage = messages.find((m) => m.code === userData?.code) || messages[0];
  state.message = thisMessage;
  state.isRegistered = true;
  if (userData.checkout) {
    navigate(userData.checkout.href);
  }
};

export const releaseRegister: Action = ({ effects, state }) => {
  state.isRegistered = false;
};

export const changePassword: AsyncAction<PasswordData> = async ({ effects, state }, passwordData) => {
  state.passwordSent = false;
  const pwData = await effects.api.setPassword(passwordData);

  if (pwData.data.success) {
    const thisMessage = messages.find((m) => m.code === 'R03');
    state.message = thisMessage;
  } else {
    if (pwData.data.message) {
      state.message = { code: 'E00', type: '', message: pwData.data.message };
    } else {
      state.message = undefined;
    }
  }
  state.passwordSent = true;
};

export const doLogin: AsyncAction<Credentials> = async ({ effects, state }, credentials) => {
  const userData = await effects.api.getUser(credentials);
  if (userData.access_token) {
    sessionStorage.setItem('token', userData.access_token);
    state.user = userData.user;
    const groups = await effects.api.getGroups();
    state.groups = groups;
    state.isLoggedIn = true;
    state.message = undefined;
  } else {
    state.message = messages.find((m) => m.code === userData);
  }
};

export const logoutUser: AsyncAction = async ({ effects, state }) => {
  const logoutData = await effects.api.doLogout();
  sessionStorage.removeItem('token');
  state.message = messages.find((m) => m.code === logoutData);
  state.user = undefined;
  state.isLoggedIn = false;
  navigate('/');
};

/**
 * admin actions
 */
export const getUsers: AsyncAction = async ({ effects, state }: any): Promise<void> => {
  const users = await effects.api.getUsers();
  state.users = users || [];
};

export const saveQuestion: AsyncAction<Question> = async ({ effects, state }, question): Promise<void> => {
  state.message = undefined;
  await effects.api.saveQuestion(question);
  const questions = state.questions?.map((q) => (
    q.vraagId === question.vraagId ? question : q
  ));
  state.questions = questions;
  state.message = messages.find((m) => m.code === 'V01');
};

export const saveGroup: AsyncAction<Group> = async ({ effects, state }, group): Promise<void> => {
  state.message = undefined;
  await effects.api.saveGroup(group);
  const groups = state.groups?.map((g) => (
    g.groepId === group.groepId ? group : g
  ));
  state.groups = groups;
  state.message = messages.find((m) => m.code === 'V01');
};


/**
 * public actions
 */
export const getQuestions: AsyncAction = async ({ effects, state }: any): Promise<void> => {
  const questions = await effects.api.getQuestions();
  state.questions = questions || [];
};

interface IAnswer {
  question: number;
  answer: string;
}
export const saveAnswer: AsyncAction<IAnswer> = async ({ effects, state }, answer) => {
  state.isSaving = answer.question;
  const answerData = await effects.api.setAnswer(answer);
  if (answerData.message) {
    state.message = { code: 'E04', type: 'error', message: answerData.message };
  } else {
    state.message = undefined;
    const groups = await effects.api.getGroups();
    state.isSaving = undefined;
    state.groups = groups;
  }
};

/**
 * internal actions
 */
export const changePageTitle: Action<string> = ({ effects, state }, title) => {
  state.pageTitle = title;
};

export const getGroups: AsyncAction = async ({ effects, state }) => {
  const groupData = await effects.api.getGroups();
  if (groupData.message) {
    state.message = { code: 'E03', type: 'error', message: groupData.message };
  } else {
    state.message = undefined;
    state.groups = groupData;
  }
};
