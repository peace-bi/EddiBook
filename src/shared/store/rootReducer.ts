import { signInReducer } from 'pages/SignIn/+state/sign-in.reducer'
import { signUpReducer } from 'pages/SignUp/+state/sign-up.reducer'
import { combineReducers } from 'redux'

const initialState = {}

export function appReducer(state = initialState) {
  return state
}

const combinedReducer = {
  signInReducer,
  SignUpState: signUpReducer,
  appReducer
}

const rootReducer = combineReducers(combinedReducer)
export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
