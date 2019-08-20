import { defineScenarioAction } from 'redux-typed-actions'
import { BookDetailResponse, RelatedBookResponse } from './book-detail.model'

export const GetBookDetail = defineScenarioAction<undefined, BookDetailResponse>(
  'GetBookDetail'
)

export const GetRelatedBook = defineScenarioAction<undefined, RelatedBookResponse>('GetRelatedBook')
