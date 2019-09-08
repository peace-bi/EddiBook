import * as actions from 'pages/BookDetail/+state/book-detail.actions'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import { BookDetailResponse, RelatedBookResponse } from './book-detail.model'

export function getBookDetail(bookId: number) {
  function thunk(dispatch: ThunkDispatch<{}, {}, PlainAction>) {
    return requestApi({
      url: `library/book/dashboard/detail/${bookId}`,
      method: 'GET'
    })(BookDetailResponse)
      .pipe(
        map((book) => dispatch(actions.GetBookDetail.success.get(book.result))),
        catchError(() => {
          return of(dispatch(actions.GetBookDetail.failure.get()))
        })
      )
      .subscribe()
  }

  thunk.interceptInOffline = true
  return thunk
}

export function getRelatedBook(bookId: number) {
  function thunk(dispatch: ThunkDispatch<{}, {}, PlainAction>) {
    dispatch(actions.GetRelatedBook.get())
    return requestApi({
      url: 'library/book/dashboard/related-book/?page=0&size=3',
      method: 'POST',
      param: {
        bookId
      },
      type: 'json'
    })(RelatedBookResponse)
      .pipe(
        map((book) =>
          dispatch(actions.GetRelatedBook.success.get(book.result))
        ),
        catchError(() => {
          return of(dispatch(actions.GetRelatedBook.failure.get()))
        })
      )
      .subscribe()
  }

  thunk.interceptInOffline = true

  return thunk
}
