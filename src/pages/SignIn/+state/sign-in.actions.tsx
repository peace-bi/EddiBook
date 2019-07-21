import { defineAction } from 'redux-typed-actions'

export const SignInSuccess = defineAction<any>('SIGNIN_SUCCESS')
export const SignInFailed = defineAction<any>('SIGNIN_FAILED')
