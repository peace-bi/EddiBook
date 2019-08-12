import * as io from 'io-ts'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, first, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'

import { GetProfileFailed, GetProfileSuccess, UpdateProfileFailed, UpdateProfileSuccess } from './profile.actions'

export function GetProfile() {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'profiles/user',
      method: 'GET'
    })(io.any).pipe(
      first(),
      map((res) => dispatch(GetProfileSuccess.get(res as any))),
      catchError((err) => of(dispatch(GetProfileFailed.get(err))))
    )
}

export function UpdateProfile() {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'profiles/user',
      method: 'POST'
    })(io.any).pipe(
      first(),
      map((res) => dispatch(UpdateProfileSuccess.get(res as any))),
      catchError((err) => of(dispatch(UpdateProfileFailed.get(err))))
    )
}
