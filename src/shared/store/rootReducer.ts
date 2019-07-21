import { signInReducer } from 'pages/SignIn/+state/sign-in.reducer'
import { signUpReducer } from 'pages/SignUp/+state/sign-up.reducer'
import { combineReducers } from 'redux'
import { PlainAction } from 'redux-typed-actions'

import { HideLoading, ShowLoading } from './action'

const initialState = {
  showLoading: false
}

export function appReducer(state = initialState, action: PlainAction) {
  if (ShowLoading.is(action)) {
    return {
      showLoading: true
    }
  }
  if (HideLoading.is(action)) {
    return {
      showLoading: false
    }
  }
  return state
}

export function userReducer(state = initialState, action: PlainAction) {
  if (ShowLoading.is(action)) {
    return {
      showLoading: true
    }
  }
  if (HideLoading.is(action)) {
    return {
      showLoading: false
    }
  }
  return state
}

const combinedReducer = {
  SignInState: signInReducer,
  SignUpState: signUpReducer,
  AppState: appReducer,
  UserState: userReducer
}

const rootReducer = combineReducers(combinedReducer)
export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
