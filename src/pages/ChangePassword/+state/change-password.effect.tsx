import * as io from 'io-ts'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, first, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import {
  ChangePasswordFailed,
  ChangePasswordSuccess
} from './change-password.actions'

export function ChangePasswordRequest(
  oldPassword: string,
  newPassword: string
) {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'account/users/passwords',
      method: 'POST',
      param: {
        newPassword,
        oldPassword
      },
      type: 'json'
    })(io.any).pipe(
      first(),
      map((data) => dispatch(ChangePasswordSuccess.get(data))),
      catchError((data) => of(dispatch(ChangePasswordFailed.get(data))))
    )
}
