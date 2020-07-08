import { createContext } from 'react'

const AuthContext = createContext(null)
export { AuthContext }

export const FAUNA_STORAGE_TOKEN = 'faunaToken'

export function getToken () {
  if (typeof window === 'undefined') {
    return null
  } else {
    return window.localStorage.getItem(FAUNA_STORAGE_TOKEN)
  }
}

export function setToken (token) {
  window.localStorage.setItem(FAUNA_STORAGE_TOKEN, token)
}

export function removeToken () {
  window.localStorage.removeItem(FAUNA_STORAGE_TOKEN)
}
