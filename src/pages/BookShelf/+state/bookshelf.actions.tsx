import { Book } from 'pages/BookShelf/+model'
import { defineAction } from 'redux-typed-actions'
import { BookAction } from 'shared/model'

export const GetBookShelfSuccess = defineAction<Book[]>('GetBookShelfSuccess')
export const GetBookShelfFail = defineAction<void>('GetBookShelfFail')

export const GenerateBookActionStatus = defineAction<Dictionary<BookAction>>(
  'GenerateBookActionStatus'
)
export const ChangeDownActionStatus = defineAction<{
  bookId: number
  status: BookAction
}>('ChangeDownActionStatus')
