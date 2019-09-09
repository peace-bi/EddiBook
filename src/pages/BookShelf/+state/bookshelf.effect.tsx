import {
  AuthorFilter,
  AuthorFilterResponse,
  BookShelfFilter,
  BookShelfFilterResponse,
  CategoryFilter,
  CategoryFilterResponse,
  Filter,
  PublisherFilter,
  PublisherFilterResponse
} from 'pages/BookShelf/+model/filter'
import {
  GenerateBookActionStatus,
  GetBookShelfFail,
  GetBookShelfSuccess
} from 'pages/BookShelf/+state/bookshelf.actions'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { forkJoin, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import { BookAction } from 'shared/model'
import { Storage } from 'shared/storage'
import { BookResponse, FilterParams } from '../+model'

export function getBookShelf(searchParams?: FilterParams) {
  function thunk(dispatch: ThunkDispatch<{}, {}, PlainAction>) {
    const filters = searchParams
      ? {
          filter: {
            contains: searchParams.search
          },
          ...searchParams.filter
        }
      : undefined

    return requestApi({
      url: 'library/book/dashboard',
      method: 'POST',
      param: {
        ...filters,
        // organizationIds: [1, 2, 3],
        // categoryIds: [1, 2, 3],
        // authorIds: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        deviceId: 'ab12cd667fee4e',
        downloadedOnly: false
      },
      type: 'json'
    })(BookResponse)
      .pipe(
        map(async (res) => {
          const storage = Storage.getInstance()
          const fileIds = await storage.getFileIds()

          const bookActions = res.result.content.reduce(
            (sum, current) => {
              const isFileExist = checkFileExist(
                fileIds,
                current.bookId.toString()
              )

              sum[current.bookId] = isFileExist
                ? BookAction.DOWNLOADED
                : BookAction.DOWNLOAD
              return sum
            },
            {} as Dictionary<BookAction>
          )

          return [
            dispatch(GetBookShelfSuccess.get(res.result.content)),
            dispatch(GenerateBookActionStatus.get(bookActions))
          ]
        }),
        catchError((err) => {
          console.info('Can not get err', err)
          return of(dispatch(GetBookShelfFail.get()))
        })
      )
      .subscribe()
  }

  thunk.interceptInOffline = true
  return thunk
}

export function getBookShelfFilter() {
  function thunk(): Observable<Filter | null> {
    return forkJoin([
      requestApi({
        url: 'library/bookshelfmanagement/bookshelvenames',
        method: 'GET',
        type: 'json'
      })(BookShelfFilterResponse),
      requestApi({
        url: 'library/category/all',
        method: 'GET',
        type: 'json'
      })(CategoryFilterResponse),
      requestApi({
        url: 'library/author/all',
        method: 'GET',
        type: 'json'
      })(AuthorFilterResponse),
      requestApi({
        url: 'account/clients/all',
        method: 'GET',
        type: 'json'
      })(PublisherFilterResponse)
    ]).pipe(
      map(([bookShelf, category, author, publisher]) => {
        const bookFilter = bookShelf.result.content.reduce(
          (sum, curr) => {
            sum[curr.bookshelfId] = curr
            return sum
          },
          {} as Record<string, BookShelfFilter>
        )

        const categoryFilter = category.result.content.reduce(
          (sum, curr) => {
            sum[curr.bookCategoryId] = curr
            return sum
          },
          {} as Record<string, CategoryFilter>
        )

        const authorFilter = author.result.content.reduce(
          (sum, curr) => {
            sum[curr.authorId] = curr
            return sum
          },
          {} as Record<string, AuthorFilter>
        )

        const publisherFilter = publisher.result.content.reduce(
          (sum, curr) => {
            sum[curr.organizationId] = curr
            return sum
          },
          {} as Record<string, PublisherFilter>
        )

        return {
          bookShelf: bookFilter,
          category: categoryFilter,
          author: authorFilter,
          publisher: publisherFilter
        }
      }),
      catchError(() => {
        return of(null)
      })
    )
  }

  return thunk
}

function checkFileExist(fileIds: string[], id: string) {
  return !!fileIds.includes(id.toString())
}
