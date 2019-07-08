import { signInReducer } from 'pages/SignIn/+state/sign-in.reducer'
import { combineReducers } from 'redux'

const initialState = {}

export function appReducer(state = initialState) {
  return state
}

const rootReducer = combineReducers({
  signInReducer,
  appReducer
})

export default rootReducer
