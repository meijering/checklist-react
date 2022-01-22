/* eslint-disable keyword-spacing, no-unused-vars */
import axios from 'axios';
import {
  Credentials,
  RegisterData,
  PasswordData,
  Group,
  Question,
} from './state';

const base = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

const authorizedAxios = async (data: any) => {
  const localToken = sessionStorage.getItem('token');
  const refreshed = await axios({
    method: 'GET',
    url: `${base}/users/refresh`,
    headers: { Authorization: `Bearer ${localToken}` },
  });
  sessionStorage.setItem('token', refreshed.data.access_token);
  return axios({
    ...data,
    headers: { Authorization: `Bearer ${localToken}` },
  });
};

interface IAnswer {
  question: number;
  answer: string;
}
export const api = {
  setCredentials: async (registerData: RegisterData): Promise<any> => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${base}/users/register`,
        data: {
          ...registerData,
          returnTo: '/geregistreerd',
        }
      });
      return result.data;
    } catch (e) {
      return e;
    }
  },
  checkLoggedIn: async (): Promise<any> => {
    try {
      const checked = await authorizedAxios({
        method: 'GET',
        url: `${base}/users/check`,
      });
      return checked.data;
    } catch (e) {
      return null;
    }
  },
  setPassword: async ({ gebruikerId, password, token }: PasswordData): Promise<any> => {
    return axios({
      method: 'POST',
      url: `${base}/passwords/store-password`,
      data: {
        gebruikerId,
        password,
        token,
      },
    });
  },
  askForPassword: async (email: string): Promise<any> => {
    try {
      await axios({
        method: 'POST',
        url: `${base}/passwords/reset-password`,
        data: {
          email,
        },
      });
      return 'P00';
    } catch (e: any) {
      return e.response.data.code;
    }
  },
  getUser: async (credentials: Credentials): Promise<any> => {
    try {
      const userData = await axios({
        method: 'POST',
        url: `${base}/auth/login`,
        data: credentials,
      });
      return userData.data;
    } catch (e: any) {
      return e.response.status === 403 ? 'E01' : 'E02';
    }
  },
  doLogout: async (): Promise<any> => {
    try {
      await authorizedAxios({
        url: `${base}/users/logout`,
      });
      return 'R04';
    } catch (e) {
      return 'E99';
    }
  },
  getGroups: async (): Promise<any> => {
    try {
      const groupData = await authorizedAxios({
        url: `${base}/groups`,
      });
      return groupData.data.map((group: Group) => ({
        ...group,
        questions: group.questions.slice()
          .sort((a, b) => a.rang - b.rang)
          .map((question: Question) => ({
            ...question,
            answers: question.answers.slice()
              .sort(
                (a, b) => new Date(b.ingevoerdOp).getTime() - new Date(a.ingevoerdOp).getTime(),
              ),
          })),
      }));
    } catch (error) {
      return { message: 'Je sessie is verlopen. Ververs de pagina om weer in te loggen.' };
    }
  },
  getUsers: async (): Promise<any> => {
    try {
      const users = await authorizedAxios({
        url: `${base}/admin/users`,
      });
      return users.data;
    } catch (error) {
      return { message: 'Je sessie is verlopen. Ververs de pagina om weer in te loggen.' };
    }
  },
  getQuestions: async (): Promise<any> => {
    try {
      const questions = await authorizedAxios({
        url: `${base}/admin/questions`,
      });
      return questions.data;
    } catch (error) {
      return { message: 'Je sessie is verlopen. Ververs de pagina om weer in te loggen.' };
    }
  },

  setAnswer: async (answer: IAnswer): Promise<any> => {
    try {
      await authorizedAxios({
        method: 'PUT',
        url: `${base}/answers/${answer.question}/answer`,
        data: { answer: answer.answer },
      });
      return {};
    } catch (error) {
      return { message: 'Je sessie is verlopen, je antwoord is niet opgeslagen. Ververs de pagina om weer in te loggen.' };
    }
  },

  saveQuestion: async (question: Question): Promise<any> => {
    try {
      await authorizedAxios({
        method: 'PUT',
        url: `${base}/admin/questions/${question.vraagId}`,
        data: question,
      });
      return {};
    } catch (error) {
      return { message: 'Je sessie is verlopen, de gegevens zijn niet opgeslagen. Ververs de pagina om weer in te loggen.' };
    }
  },

  saveGroup: async (group: Group): Promise<any> => {
    try {
      await authorizedAxios({
        method: 'PUT',
        url: `${base}/admin/groups/${group.groepId}`,
        data: group,
      });
      return {};
    } catch (error) {
      return { message: 'Je sessie is verlopen, de gegevens zijn niet opgeslagen. Ververs de pagina om weer in te loggen.' };
    }
  },
};
export default api;
