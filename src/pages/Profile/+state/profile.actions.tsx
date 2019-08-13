import { defineAction } from 'redux-typed-actions'
import { Profile } from '../profile.model'

export const GetProfileSuccess = defineAction<Profile>('GET_PROFILE_SUCCESS')
export const GetProfileFailed = defineAction<any>('GET_PROFILE_FAILED')

export const UpdateProfileSuccess = defineAction<Profile>(
  'UPDATE_PROFILE_SUCCESS'
)
export const UpdateProfileFailed = defineAction<any>('UPDATE_PROFILE_FAILED')
