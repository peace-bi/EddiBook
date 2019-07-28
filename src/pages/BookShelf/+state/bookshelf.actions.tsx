import { Book } from 'pages/BookShelf/+model'
import { defineAction } from 'redux-typed-actions'

export const GetBookShelfSuccess = defineAction<Book[]>('GetBookShelfSuccess')
export const GetBookShelfFail = defineAction<void>('GetBookShelfFail')
