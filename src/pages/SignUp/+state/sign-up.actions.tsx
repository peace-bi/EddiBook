import { defineAction } from 'redux-typed-actions'
import { SignUpSuccessResponse } from '../sign-up.model'

export const SignUpSuccess = defineAction<SignUpSuccessResponse>(
  'SIGNUP_SUCCESS'
)
export const SignUpFailed = defineAction<any>('SIGNUP_FAILED')
