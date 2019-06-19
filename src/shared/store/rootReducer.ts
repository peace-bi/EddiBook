import { combineReducers } from 'redux'

const initialState = {}

export function appReducer(state = initialState) {
  return state
}

const rootReducer = combineReducers({
  appReducer
})

export default rootReducer
