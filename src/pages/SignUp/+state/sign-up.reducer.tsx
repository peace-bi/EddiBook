import { SignUpFailed, SignUpSuccess } from './sign-up.actions'

export function signUpReducer(s = {}, a: any): any {
  if (SignUpSuccess.is(a)) {
    return {
      ...s
    }
  }
  if (SignUpFailed.is(a)) {
    return {
      ...s,
      error: a.payload
    }
  }
  return s
}
