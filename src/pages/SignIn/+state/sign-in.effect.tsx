import * as io from 'io-ts'
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
        password,
        scope: 'ui',
        grant_type: 'password'
      }
    })(io.any).subscribe(
      () => dispatch({ type: 'SIGNIN_SUCCESS' }),
      () => dispatch({ type: 'SIGNIN_FAILED' })
    )
}
