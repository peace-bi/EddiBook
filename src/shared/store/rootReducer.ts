import bookShelfReducer from 'pages/BookShelf/+state/bookshelf.reducer'
import { profileReducer } from 'pages/Profile/+state/profile.reducer'
import { signInReducer } from 'pages/SignIn/+state/sign-in.reducer'
import { signUpReducer } from 'pages/SignUp/+state/sign-up.reducer'
import { reducer as network } from 'react-native-offline'
import { combineReducers, Reducer } from 'redux'
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

export interface RootReducer {
  SignInState: ReturnType<typeof signInReducer>
  SignUpState: ReturnType<typeof signUpReducer>
  AppState: ReturnType<typeof appReducer>
  UserState: ReturnType<typeof userReducer>
  BookShelfState: ReturnType<typeof bookShelfReducer>
  network: ReturnType<typeof network>,
  ProfileState: ReturnType<typeof profileReducer>
}

const combinedReducer = {
  SignInState: signInReducer,
  SignUpState: signUpReducer,
  AppState: appReducer,
  UserState: userReducer,
  BookShelfState: bookShelfReducer,
  network,
  ProfileState: profileReducer,
}

const rootReducer: Reducer<RootReducer> = combineReducers(combinedReducer)
export default rootReducer
