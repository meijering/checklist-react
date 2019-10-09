import { AsyncAction } from 'overmind'
import { RegisterData, Credentials } from './state'
import { async } from 'q'

export const checkLogin: AsyncAction = async ({ effects, state }) => {
  const isLoggedIn = await effects.api.checkLoggedIn()
  // const groups = JSON.parse(localStorage.getItem('groups'))
  if (isLoggedIn.data.message) {
    state.error.check = isLoggedIn.data.message
  } else {
    state.error.check = undefined
    state.user = isLoggedIn.data
    const groups = await effects.api.getGroups()
    state.groups = groups
    state.isLoggedIn = true
  }
  state.hasLoaded = true
}

export const doRegister: AsyncAction<RegisterData> = async ({ effects, state }, registerData) => {
  const userData = await effects.api.setCredentials(registerData)
  // const groups = JSON.parse(localStorage.getItem('groups'))
  if (userData.data.message) {
    state.error.login = userData.data.message
  } else {
    state.error.login = undefined
    state.user = userData.data
    const groups = await effects.api.getGroups()
    state.groups = groups
    state.isLoggedIn = true
  }
}

export const doLogin: AsyncAction<Credentials> = async ({ effects, state }, credentials) => {
  const userData = await effects.api.getUser(credentials)
  // const groups = JSON.parse(localStorage.getItem('groups'))
  if (userData.data.message) {
    state.error.login = userData.data.message
  } else {
    state.error.login = undefined
    state.user = userData.data
    const groups = await effects.api.getGroups()
    state.groups = groups
    state.isLoggedIn = true
  }
}

export const logoutUser: AsyncAction = async ({ effects, state }) => {
  await effects.api.doLogout()
  state.user = undefined
  state.isLoggedIn = false
}

export const getGroups: AsyncAction = async ({ effects, state }) => {
  const groupData = await effects.api.getGroups()
  if (groupData.data.message) {
    state.error.server = groupData.message
  } else {
    state.error.server = undefined
    state.groups = groupData
    // localStorage.setItem('groups', state.groups)
  }
  // state.groups = await effects.api.getGroups()
}
interface Answer {
  question: number,
  answer: string,
}
export const saveAnswer: AsyncAction<Answer> = async ({ effects, state }, answer) => {
  state.isSaving = answer.question
  const answerData = await effects.api.setAnswer(answer)
  state.isSaving = undefined
  if (answerData.message) {
    state.error.server = answerData.data.message
  } else {
    state.groups = answerData
  }
}
