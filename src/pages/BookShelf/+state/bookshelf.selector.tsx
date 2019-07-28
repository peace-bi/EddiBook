import { createSelector } from 'reselect'
import { BookAction } from 'shared/model'
import { RootReducer } from 'shared/store/rootReducer'

const bookshelfState = (state: RootReducer) => state.BookShelfState

const getBookActionStatus = createSelector(
  bookshelfState,
  (state) => state.actionStatus
)

const getDownloadedBook = createSelector(
  bookshelfState,
  (state) => {
    return (state.list || []).filter(
      (item) =>
        state.actionStatus[item.bookId] === BookAction.DOWNLOADED ||
        state.actionStatus[item.bookId] === BookAction.UPDATE
    )
  }
)

export const bookshelfSelector = {
  getBookActionStatus,
  getDownloadedBook
}
