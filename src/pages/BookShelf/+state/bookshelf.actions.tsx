import { Book, Filter } from 'pages/BookShelf/+model'
import { defineAction, defineScenarioAction } from 'redux-typed-actions'
import { BookAction } from 'shared/model'

export const GetBookShelfSuccess = defineAction<Book[]>('GetBookShelfSuccess')
export const GetBookShelfFail = defineAction<void>('GetBookShelfFail')

export const GenerateBookActionStatus = defineAction<Dictionary<BookAction>>(
  'GenerateBookActionStatus'
)
export const ChangeActionStatus = defineAction<{
  bookId: number
  status: BookAction
}>('ChangeActionStatus')

export const GetBookShelfFilter = defineScenarioAction<undefined, Filter>('BookShelfFilterArray')
