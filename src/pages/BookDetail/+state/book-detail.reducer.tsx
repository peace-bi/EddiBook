import { PlainAction } from 'redux-typed-actions'
import { GetBookDetail, GetRelatedBook } from './book-detail.actions'
import { BookDetailInfo } from './book-detail.model'

export interface BookDetailState {
  detail: Dictionary<BookDetailInfo>
}

export const bookDetailInitialState: BookDetailState = {
  detail: {}
}

export function bookDetailReducer(
  s: BookDetailState,
  a: PlainAction
): BookDetailState {
  if (GetBookDetail.success.is(a)) {
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
  if (GetRelatedBook.is(a)) {
    return s
  }

  return s
}
