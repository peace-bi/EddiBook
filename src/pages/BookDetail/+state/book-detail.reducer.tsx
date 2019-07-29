import { GetBookDetailSuccess } from 'pages/BookDetail/+state/book-detail.actions'
import { PlainAction } from 'redux-typed-actions'
import { BookDetailResponse } from './book-detail.model'

export interface BookDetailState {
  detail: Dictionary<BookDetailResponse>
}

export const bookDetailInitialState: BookDetailState = {
  detail: {}
}

export function bookDetailReducer(s: BookDetailState, a: PlainAction) {
  if (GetBookDetailSuccess.is(a)) {
    return {
      ...s,
      detail: {
        ...s.detail,
        [a.payload.bookId]: a.payload
      }
    }
  }

  return s
}
