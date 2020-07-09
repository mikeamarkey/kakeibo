import { createContext } from 'react'

const AuthContext = createContext(null)
export { AuthContext }

export const FAUNA_STORAGE_KEY = 'faunaData'

export function getAuthData () {
  if (typeof window === 'undefined') {
    return null
  } else {
    const authData = window.localStorage.getItem(FAUNA_STORAGE_KEY)
    return JSON.parse(authData)
  }
}

export function getAuthToken () {
  const authData = getAuthData()
  if (authData) {
    return authData.token
  } else {
    return null
  }
}

export function getAuthId () {
  const authData = getAuthData()
  if (authData) {
    return authData.id
  } else {
    return null
  }
}

export function setAuthData (data) {
  window.localStorage.setItem(FAUNA_STORAGE_KEY, JSON.stringify(data))
}

export function removeAuthData () {
  window.localStorage.removeItem(FAUNA_STORAGE_KEY)
}
