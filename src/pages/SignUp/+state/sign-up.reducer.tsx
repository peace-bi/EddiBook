export function signUpReducer(s = {}, a: any): any {
  if (a.type === 'SIGNUP_SUCCESS') {
    return {
      ...s
    }
  }
  if (a.type === 'SIGNUP_FAILED') {
    return {
      ...s,
      error: a.payload
    }
  }
  return s
}
