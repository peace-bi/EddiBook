import * as io from 'io-ts'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, first, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'

import { SignUpForm } from '../sign-up.model'
import { SignUpFailed, SignUpSuccess } from './sign-up.actions'

export function SignUp(data: SignUpForm) {
  return (dispatch: ThunkDispatch<{}, {}, PlainAction>): Observable<PlainAction> =>
    requestApi({
      url: 'account/users/signup',
      method: 'POST',
      param: data,
      type: 'json'
    })(io.any).pipe(
      first(),
      map((res) => dispatch(SignUpSuccess.get(res as any))),
      catchError((err) => of(dispatch(SignUpFailed.get(err))))
    )
}
