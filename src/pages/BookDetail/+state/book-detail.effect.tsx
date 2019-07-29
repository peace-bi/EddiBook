import {
  GetBookDetailFail,
  GetBookDetailSuccess
} from 'pages/BookDetail/+state/book-detail.actions'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import { BookDetailResponse } from './book-detail.model'

export function getBookDetail(bookId: number) {
  function thunk(dispatch: ThunkDispatch<{}, {}, PlainAction>) {
    return requestApi({
      url: `library/book/dashboard/detail/${bookId}`,
      method: 'GET'
    })(BookDetailResponse)
      .pipe(
        map((book) => dispatch(GetBookDetailSuccess.get(book.result))),
        catchError(() => {
          return of(dispatch(GetBookDetailFail.get()))
        })
      )
      .subscribe()
  }

  thunk.interceptInOffline = true
  return thunk
}
