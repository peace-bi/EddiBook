import { Book } from 'pages/BookShelf/+model'
import {
  ChangeDownActionStatus,
  GenerateBookActionStatus,
  GetBookShelfSuccess
} from 'pages/BookShelf/+state/bookshelf.actions'
import { PlainAction } from 'redux-typed-actions'
import { BookAction } from 'shared/model'

export interface BookShelfState {
  list: Book[] | null
  actionStatus: Dictionary<BookAction>
}

const initialState: BookShelfState = {
  list: null,
  actionStatus: {}
}

export function bookShelfReducer(
  s = initialState,
  a: PlainAction
): BookShelfState {
  if (GetBookShelfSuccess.is(a)) {
    return {
      ...s,
      list: a.payload
    }
  }
  if (GenerateBookActionStatus.is(a)) {
    return {
      ...s,
      actionStatus: a.payload
    }
  }
  if (ChangeDownActionStatus.is(a)) {
    return {
      ...s,
      actionStatus: {
        ...s.actionStatus,
        [a.payload.bookId]: a.payload.status
      }
    }
  }

  return s
}
