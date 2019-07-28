import * as io from 'io-ts'

export interface Book {
  bookId: number
  bookVersionHistoryId: number
  name: string
  licenseDate: string | undefined | null
  category: string
  licenseEndDate: string | undefined | null
  licenseStatus: string
  hasUpdate: boolean
  hasLicenseExpired: boolean
  pdf: string
  cover: string
  new: boolean
  downloaded: boolean
}

export const Book: io.Type<Book> = io.type({
  bookId: io.number,
  bookVersionHistoryId: io.number,
  category: io.string,
  cover: io.string,
  downloaded: io.boolean,
  hasLicenseExpired: io.boolean,
  hasUpdate: io.boolean,
  licenseDate: io.union([io.string, io.undefined, io.null]),
  licenseEndDate: io.union([io.string, io.undefined, io.null]),
  licenseStatus: io.string,
  name: io.string,
  new: io.boolean,
  pdf: io.string
})

export const BookResponse = io.type({
  content: io.array(Book)
})
