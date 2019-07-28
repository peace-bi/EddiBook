import { Book } from 'pages/BookShelf/+model'
import { GetBookShelfSuccess } from 'pages/BookShelf/+state/bookshelf.actions'
import { PlainAction } from 'redux-typed-actions'

export interface BookShelfState {
  list: Book[] | null
}

const initialState: BookShelfState = {
  list: null
}

export function bookShelfReducer(
  s = initialState,
  a: PlainAction
): BookShelfState {
  if (GetBookShelfSuccess.is(a)) {
    return {
      list: a.payload
    }
  }
  return s
}
