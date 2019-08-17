import * as io from 'io-ts'

export interface BookDetailResponse {
  bookId: number
  bookVersionHistoryId: number
  name: string
  licenseStatus: string
  hasLicenseExpired: boolean
  pdf: string
  cover: string
  authors: Author[] | undefined
  bookCategoryId: number
  categoryName: string
  publisherId: string
  publisherName: string | undefined
  createdDate: string
  versionId: number
  description: string
  producerUser: string
  publicationStatus: string
  new: boolean
  bookSize: number
  licenseEndDate: string | undefined
}

const Author: io.Type<Author> = io.type({
  authorId: io.number,
  name: io.string
})

export const BookDetailResponse: io.Type<BookDetailResponse> = io.type({
  bookId: io.number,
  bookVersionHistoryId: io.number,
  name: io.string,
  licenseStatus: io.string,
  hasLicenseExpired: io.boolean,
  pdf: io.string,
  cover: io.string,
  authors: io.union([io.array(Author), io.undefined]),
  bookCategoryId: io.number,
  categoryName: io.string,
  publisherId: io.string,
  publisherName: io.union([io.string, io.undefined]),
  createdDate: io.string,
  versionId: io.number,
  description: io.string,
  producerUser: io.string,
  publicationStatus: io.string,
  new: io.boolean,
  bookSize: io.number,
  licenseEndDate: io.union([io.string, io.undefined])
})

export interface Author {
  authorId: number
  name: string
}

export interface BookDetailInfo {
  data: BookDetailResponse
  related: any[]
}

export interface RelatedBook {
  bookId: number
  bookVersionHistoryId: number
  category: string
  categoryId: number
  cover: string
  hasLicenseExpired: boolean
  licenseStatus: string
  name: string
  new: boolean
  pdf: string
}

export const RelatedBook: io.Type<RelatedBook> = io.type({
  bookId: io.number,
  bookVersionHistoryId: io.number,
  category: io.string,
  categoryId: io.number,
  cover: io.string,
  hasLicenseExpired: io.boolean,
  licenseStatus: io.string,
  name: io.string,
  new: io.boolean,
  pdf: io.string
})

export interface RelatedBookResponse {
  content: RelatedBook[]
}

export const RelatedBookResponse: io.Type<RelatedBookResponse> = io.type({
  content: io.array(RelatedBook)
})
