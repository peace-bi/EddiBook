import { createSelector } from 'reselect'
import { RootReducer } from 'shared/store/rootReducer'

const bookDetailState = (state: RootReducer) => state.BookShelfState.bookDetail

const getBookDetail = (bookId: number) =>
  createSelector(
    bookDetailState,
    (state) => state.detail[bookId] ? state.detail[bookId].data : null
  )

export const bookDetailSelector = {
  getBookDetail
}
