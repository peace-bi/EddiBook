import {
  GetBookDetailFail,
  GetBookDetailSuccess
} from 'pages/BookDetail/+state/book-detail.actions'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import { BookDetailResponse, RelatedBookResponse } from './book-detail.model'

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

export function getRelatedBook(bookId: number) {
  console.log('Get related book')
  function thunk() {
    return requestApi({
      url: 'library/book/dashboard/related-book/?page=0&size=3',
      method: 'POST',
      param: {
        bookId
      },
      type: 'json'
    })(RelatedBookResponse).pipe(
      tap((res) => console.log(res.result.content))
    ).subscribe()
  }

  return thunk
}
