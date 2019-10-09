import axios from 'axios'
import { Credentials, RegisterData, Group, Question } from './state'

const base = process.env.REACT_APP_API
axios.defaults.withCredentials = true;
interface Answer {
  question: number,
  answer: string,
}
export const api = {
  setCredentials: async (registerData: RegisterData): Promise<any> => {
    const result = await axios({
      method: 'POST',
      url: `${base}/register`,
      data:  registerData,
    })
    return result
  },
  checkLoggedIn: async (): Promise<any> => {
    const checked = await axios({
      method: 'GET',
      url: `${base}/auth/check`,
    })
    return checked
  },
  getUser: async (credentials: Credentials): Promise<any> => {
    const userData = await axios({
      method: 'POST',
      url: `${base}/auth/login`,
      data: credentials,
    })
    return userData
  },
  doLogout: async (): Promise<void> => {
    await axios({
      url: `${base}/auth/logout`,
    })
  },
  getGroups: async (): Promise<any> => {
    const groupData = await axios({
      url: `${base}/api/v0/groups`,
    })
    return groupData.data.map((group: Group) => ({
      ...group,
      questions: group.questions.slice()
        .sort((a, b) => a.rang - b.rang)
        .map((question: Question) => ({
          ...question,
          answers: question.answers.slice()
            .sort((a, b) =>  new Date(b.ingevoerd_op).getTime() - new Date(a.ingevoerd_op).getTime()),
        }))
    }))
  },
  setAnswer: async (answer: Answer): Promise<any> => {
    const result = await axios({
      method: 'PUT',
      url: `${base}/api/v0/questions/${answer.question}/answer`,
      data: { answer: answer.answer },
    })
    return result.data.map((group: Group) => ({
      ...group,
      questions: group.questions.slice()
        .sort((a, b) => a.rang - b.rang)
        .map((question: Question) => ({
          ...question,
          answers: question.answers.slice()
            .sort((a, b) =>  new Date(b.ingevoerd_op).getTime() - new Date(a.ingevoerd_op).getTime()),
        })),
    })
  )},
}
