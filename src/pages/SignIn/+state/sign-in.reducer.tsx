import { SignInState } from '../sign-in.model'

const initalState: SignInState = {
  error: [],
  loggedIn: false
}

export function signInReducer(s = initalState, a: any): SignInState {
  if (a.type === 'SIGNIN_SUCCESS') {
    return {
      ...s,
      loggedIn: true
    }
  }
  if (a.type === 'SIGNIN_SUCCESS') {
    return {
      ...s,
      error: a.payload,
      loggedIn: false
    }
  }
  return s
}
