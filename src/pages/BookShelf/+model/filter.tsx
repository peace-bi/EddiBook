import * as io from 'io-ts'

export interface BookShelfFilter {
  bookshelfId: number,
  name: string,
  isChecked?: boolean
}

export const BookShelfFilter: io.Type<BookShelfFilter> = io.type({
  bookshelfId: io.number,
  name: io.string
})

export const BookShelfFilterResponse = io.interface({
  content: io.array(BookShelfFilter)
})

export interface Filter {
  bookShelf: {
    [key: string]: BookShelfFilter
  }
}
