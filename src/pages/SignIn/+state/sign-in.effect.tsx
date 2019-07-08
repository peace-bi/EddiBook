import { Alert } from 'react-native'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { requestApi } from 'shared/api'

// http://192.168.2.40:9000/uaa/oauth/token

export function SignIn(username: string, password: string) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
    requestApi({
      url: 'uaa/oauth/token',
      method: 'POST',
      param: {
        username,
        password
      }
    })
      .catch((e) => console.info(e))
      .then(() => dispatch({ type: 'SIGNIN_SUCCESS' }))
      .catch((err) => {
        console.info(err)
        return dispatch({ type: 'SIGNIN_FAILED' })
      })
}
