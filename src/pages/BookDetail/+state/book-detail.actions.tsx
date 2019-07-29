import { defineAction } from 'redux-typed-actions'
import { BookDetailResponse } from './book-detail.model'

export const GetBookDetailSuccess = defineAction<BookDetailResponse>(
  'GetBookDetailSuccess'
)
export const GetBookDetailFail = defineAction<BookDetailResponse>(
  'GetBookDetailFail'
)
