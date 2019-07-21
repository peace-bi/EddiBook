import { SignInState } from '../sign-in.model'
import { SignInFailed, SignInSuccess } from './sign-in.actions'

const initalState: SignInState = {
  error: [],
  loggedIn: false
}

export function signInReducer(s = initalState, a: any): SignInState {
  if (SignInSuccess.is(a)) {
    return {
      ...s,
      loggedIn: true
    }
  }
  if (SignInFailed.is(a)) {
    return {
      ...s,
      error: a.payload,
      loggedIn: false
    }
  }
  return s
}
