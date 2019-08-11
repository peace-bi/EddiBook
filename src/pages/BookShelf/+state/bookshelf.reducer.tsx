import AsyncStorage from '@react-native-community/async-storage'
import {
  bookDetailInitialState,
  bookDetailReducer,
  BookDetailState
} from 'pages/BookDetail/+state/book-detail.reducer'
import { Book } from 'pages/BookShelf/+model'
import {
  ChangeDownActionStatus,
  GenerateBookActionStatus,
  GetBookShelfSuccess
} from 'pages/BookShelf/+state/bookshelf.actions'
import { persistReducer } from 'redux-persist'
import { PersistConfig } from 'redux-persist/es/types'
import { PlainAction } from 'redux-typed-actions'
import { BookAction } from 'shared/model'

export interface BookShelfState {
  list: Book[] | null
  actionStatus: Dictionary<BookAction>
  bookDetail: BookDetailState
}

const initialState: BookShelfState = {
  list: null,
  actionStatus: {},
  bookDetail: bookDetailInitialState
}

function bookShelfReducer(s = initialState, a: PlainAction): BookShelfState {
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

  return {
    ...s,
    bookDetail: bookDetailReducer(s.bookDetail, a)
  }
}

// const migrations = {
//   0: (state: any) => {
//     // migration clear out device state
//     return {
//       ...state,
//     }
//   }
// }

const persistConfig: PersistConfig = {
  key: 'BookShelfState',
  storage: AsyncStorage,
  version: 1
  // migrate: createMigrate(migrations, { debug: true })
}

export default persistReducer(persistConfig, bookShelfReducer)
