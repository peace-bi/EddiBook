import * as io from 'io-ts'
import { City, Region } from 'pages/Profile/profile.model'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, first, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'

import {
  UpdateProfileFailed,
  UpdateProfileSuccess
} from 'pages/Profile/+state/profile.actions'
import { SubmitForm } from '../edit-profile.model'
import {
  GetCitiesFailed,
  GetCitiesSuccess,
  GetRegionFailed,
  GetRegionSuccess
} from './edit-profile.action'

export function getRegions(countryId: string) {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'account/metadata/regions',
      method: 'GET',
      param: {
        countryId
      }
    })(io.any).pipe(
      first(),
      map((res) => dispatch(GetRegionSuccess.get(res.result as Region[]))),
      catchError((err) => of(dispatch(GetRegionFailed.get(err))))
    )
}

export function getCities(countryId: string, regionId: string) {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'account/metadata/cities',
      method: 'GET',
      param: {
        countryId,
        regionId
      }
    })(io.any).pipe(
      first(),
      map((res) => dispatch(GetCitiesSuccess.get(res.result as City[]))),
      catchError((err) => of(dispatch(GetCitiesFailed.get(err))))
    )
}

export function updateProfile(data: SubmitForm) {
  return (
    dispatch: ThunkDispatch<{}, {}, PlainAction>
  ): Observable<PlainAction> =>
    requestApi({
      url: 'account/profiles/user',
      method: 'POST',
      param: data,
      type: 'json'
    })(io.any).pipe(
      first(),
      map((res) => dispatch(UpdateProfileSuccess.get(res.result))),
      catchError((err) => of(dispatch(UpdateProfileFailed.get(err))))
    )
}
