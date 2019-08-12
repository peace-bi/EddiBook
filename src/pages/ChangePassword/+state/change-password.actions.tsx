import { defineAction } from 'redux-typed-actions'

export const ChangePasswordSuccess = defineAction<any>('CHANGE_PASSWORD_SUCCESS')
export const ChangePasswordFailed = defineAction<any>('CHANGE_PASSWORD_FAILED')
