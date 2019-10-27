import { Action, AsyncAction } from 'overmind'
import { RegisterData, PasswordData, Credentials } from './state'
import { async } from 'q'

type Message = {
  code: string,
  message: string,
}

const messages: Message[] = [
  { code: '', message: '' },
  { code: 'R00', message: 'Je bent geregistreerd. Je ontvangt een E-mail waarin je inloggegevens staan.' },
  { code: 'R01', message: 'Dit adres is al bekend maar is niet geactiveerd.' },
  { code: 'R02', message: 'Dit adres is al geregistreed. Als je je wachtwoord bent vergeten, kun je een nieuw wachtwoord opvragen.' },
  { code: 'P00', message: 'Er is een mail naar je toegestuurd met instructies om je wachtwoord te wijzigen.' },
]

export const checkLogin: AsyncAction = async ({ effects, state }) => {
  const isLoggedIn = await effects.api.checkLoggedIn()
  if (isLoggedIn) {
    state.user = isLoggedIn
    const groups = await effects.api.getGroups()
    state.groups = groups
    state.isLoggedIn = true
  }
  state.hasLoaded = true
}
export const doSendPwd: AsyncAction<string> = async ({ effects, state }, email) => {
  state.passwordSent = false
  const pwSent = await effects.api.askForPassword(email)
  const thisMessage = messages.find(m => m.code === pwSent) || messages[0]
  state.message = thisMessage.message
  state.passwordSent = true
}

export const releaseSendPwd: Action = ({ effects, state }) => {
  state.passwordSent = false
}

export const doRegister: AsyncAction<RegisterData> = async ({ effects, state }, registerData) => {  
  state.isRegistered = false
  const userData = await effects.api.setCredentials(registerData)
  const thisMessage = messages.find(m => m.code === userData) || messages[0]
  state.message = thisMessage.message
  state.isRegistered = true
}

export const releaseRegister: Action = ({ effects, state }) => {
  state.isRegistered = false
}

export const changePassword: AsyncAction<PasswordData> = async ({ effects, state }, passwordData) => {
  const pwData = await effects.api.setPassword(passwordData)
  if (pwData.data.message) {
    state.error.server = pwData.data.message
  } else {
    state.error.server = undefined
  }
}

export const doLogin: AsyncAction<Credentials> = async ({ effects, state }, credentials) => {
  const userData = await effects.api.getUser(credentials)
  if (userData.message) {
    state.error.login = userData.message
  } else {
    state.error.login = undefined
    state.user = userData
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
