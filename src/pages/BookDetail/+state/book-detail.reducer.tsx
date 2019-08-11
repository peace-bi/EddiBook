import { GetBookDetailSuccess } from 'pages/BookDetail/+state/book-detail.actions'
import { PlainAction } from 'redux-typed-actions'
import { BookDetailInfo } from './book-detail.model'

export interface BookDetailState {
  detail: Dictionary<BookDetailInfo>
}

export const bookDetailInitialState: BookDetailState = {
  detail: {}
}

export function bookDetailReducer(s: BookDetailState, a: PlainAction): BookDetailState {
  if (GetBookDetailSuccess.is(a)) {
    return {
      ...s,
      detail: {
        ...s.detail,
        [a.payload.bookId]: {
          data: a.payload
        }
      }
    }
  }

  return s
}
