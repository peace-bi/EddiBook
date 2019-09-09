import * as io from 'io-ts'

export interface BookShelfFilter {
  bookshelfId: number
  name: string
  isChecked?: boolean
}

export const BookShelfFilter: io.Type<BookShelfFilter> = io.type({
  bookshelfId: io.number,
  name: io.string
})

export const BookShelfFilterResponse = io.interface({
  content: io.array(BookShelfFilter)
})

export interface CategoryFilter {
  bookCategoryId: number
  description: string
  name: string
  isChecked?: boolean
}

export const CategoryFilter: io.Type<CategoryFilter> = io.type({
  bookCategoryId: io.number,
  name: io.string,
  description: io.string
})

export const CategoryFilterResponse = io.interface({
  content: io.array(CategoryFilter)
})

export interface AuthorFilter {
  authorId: number
  name: string
  isChecked?: boolean
}

export const AuthorFilter: io.Type<AuthorFilter> = io.type({
  authorId: io.number,
  name: io.string
})

export const AuthorFilterResponse = io.interface({
  content: io.array(AuthorFilter)
})

export interface PublisherFilter {
  organizationId: number
  name: string
  isChecked?: boolean
}

export const PublisherFilter: io.Type<PublisherFilter> = io.type({
  organizationId: io.number,
  name: io.string
})

export const PublisherFilterResponse = io.interface({
  content: io.array(PublisherFilter)
})

export interface Filter {
  bookShelf: {
    [key: string]: BookShelfFilter
  }
  category: {
    [key: string]: CategoryFilter
  }
  author: {
    [key: string]: AuthorFilter
  }
  publisher: {
    [key: string]: PublisherFilter
  }
}

export interface FilterRequest {
  organizationIds: number[]
  categoryIds: number[]
  authorIds: number[]
}
