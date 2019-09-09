import { ProfileState } from '../profile.model'
import { GetProfileFailed, GetProfileSuccess } from './profile.actions'

const initState: ProfileState = {
  profile: null
}

export function profileReducer(s = initState, a: any): ProfileState {
  if (GetProfileSuccess.is(a)) {
    return {
      ...s,
      profile: a.payload
    }
  }
  if (GetProfileFailed.is(a)) {
    return {
      ...s,
      profile: null
    }
  }
  return s
}
