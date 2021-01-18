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

const authorizedAxios = (data: any) => {
  const localToken = sessionStorage.getItem('token');
  return axios({
    ...data,
    headers: { Authorization: `Bearer ${localToken}` },
  });
};

interface Answer {
  question: number,
  answer: string,
}
export const api = {
  setCredentials: async (registerData: RegisterData): Promise<any> => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${base}/register`,
        data: registerData,
      });
      return result.data.code;
    } catch(e) {
      return e.response.data.code;
    }
  },
  checkLoggedIn: async (): Promise<any> => {
    try {
      const checked = await axios({
        method: 'GET',
        url: `${base}/auth/check`,
      });
      return checked.data;
    } catch(e) {
      return null;
    }
  },
  setPassword: async ({ userId, password, token }: PasswordData): Promise<any> => {
    const result = await axios({
      method: 'POST',
      url: `${base}/auth/store-password`,
      data: {
        userId,
        password,
        token,
      },
    });
    return result;
  },
  askForPassword: async (email: string): Promise<any> => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${base}/auth/reset-password`,
        data: {
          email,
        },
      });
      return 'P00';
    } catch(e) {
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
    } catch(e) {
      return { message: 'De combinatie van e-mail adres en wachtwoord is niet bekend' };
    }
  },
  doLogout: async (): Promise<void> => {
    await axios({
      url: `${base}/auth/logout`,
    });
  },
  getGroups: async (): Promise<any> => {
    const groupData = await authorizedAxios({
      url: `${base}/api/v0/groups`,
    });
    return groupData.data.map((group: Group) => ({
      ...group,
      questions: group.questions.slice()
        .sort((a, b) => a.rang - b.rang)
        .map((question: Question) => ({
          ...question,
          answers: question.answers.slice()
            .sort(
              (a, b) => new Date(b.ingevoerd_op).getTime() - new Date(a.ingevoerd_op).getTime(),
            ),
        })),
    }));
  },
  setAnswer: async (answer: Answer): Promise<any> => {
    const result = await authorizedAxios({
      method: 'PUT',
      url: `${base}/api/v0/questions/${answer.question}/answer`,
      data: { answer: answer.answer },
    });
    return result.data.map((group: Group) => ({
      ...group,
      questions: group.questions.slice()
        .sort((a, b) => a.rang - b.rang)
        .map((question: Question) => ({
          ...question,
          answers: question.answers.slice()
            .sort(
              (a, b) => new Date(b.ingevoerd_op).getTime() - new Date(a.ingevoerd_op).getTime(),
            ),
        })),
    }));
  },
};
export default api;
