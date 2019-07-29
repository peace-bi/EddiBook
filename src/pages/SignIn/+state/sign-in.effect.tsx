import * as io from 'io-ts'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, first, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'

import { SignInFailed, SignInSuccess } from './sign-in.actions'

// http://192.168.2.40:9000/uaa/oauth/token

export function SignIn(username: string, password: string) {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'uaa/oauth/token',
      method: 'POST',
      param: {
        username,
        password,
        scope: 'ui',
        grant_type: 'password'
      }
    })(io.any).pipe(
      first(),
      map((data) => dispatch(SignInSuccess.get(data))),
      catchError((data) => of(dispatch(SignInFailed.get(data))))
    )
}

// export function refreshToken() {
//   return (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
//     requestApi({
//       url: 'uaa/oauth/token',
//       method: 'POST',
//       param: {

//         scope: 'ui',
//         grant_type: 'password'
//       }
//     })(io.any)
//       .pipe()
//       .subscribe()
// }
