import {
  GetBookShelfFail,
  GetBookShelfSuccess
} from 'pages/BookShelf/+state/bookshelf.actions'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import { BookResponse } from '../+model'

export function getBookShelf() {
  function thunk(dispatch: ThunkDispatch<{}, {}, PlainAction>) {
    // return of(mock.content)
    return requestApi({
      url: 'library/book/dashboard',
      method: 'POST',
      param: {
        // organizationIds: [1, 2, 3],
        // categoryIds: [1, 2, 3],
        // authorIds: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        deviceId: 'ab12cd667fee4e',
        downloadedOnly: false
      },
      type: 'json'
    })(BookResponse)
      .pipe(
        map((res) => {
          return dispatch(GetBookShelfSuccess.get(res.result.content))
          // return res.result.content
        }),
        catchError((err) => {
          console.info('Can not get err', err)
          return of(dispatch(GetBookShelfFail.get()))
        })
      )
      .subscribe()
  }

  thunk.interceptInOffline = true
  return thunk
}
