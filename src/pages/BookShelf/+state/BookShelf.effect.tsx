import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { requestApi } from 'shared/api'
import { Book, BookResponse } from '../+model'

// const mock = {
//   content: [
//     {
//       bookVersionHistoryId: 5,
//       name: 'Book name  5',
//       licenseDate: null,
//       category: 'Book category 1',
//       licenseEndDate: '2020-06-25T19:08:31.137Z',
//       hasUpdate: false,
//       hasLicenseExpired: false,
//       pdf: 'http://edds.banvien.com.vn/library/file-storage/download/Book.pdf',
//       cover:
//         'http://edds.banvien.com.vn/library/file-storage/download/05_book.jpg',
//       new: true,
//       downloaded: false
//     },
//     {
//       bookVersionHistoryId: 1,
//       name: 'Book name  1',
//       licenseDate: null,
//       category: 'Book category 1',
//       licenseEndDate: '2020-06-25T19:08:31.137Z',
//       hasUpdate: false,
//       hasLicenseExpired: false,
//       pdf: 'http://edds.banvien.com.vn/library/file-storage/download/Book.pdf',
//       cover:
//         'http://edds.banvien.com.vn/library/file-storage/download/01_book.jpg',
//       new: true,
//       downloaded: false
//     }
//   ] as Book[]
// }

export function getBookShelf() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Observable<Book[]> => {
    // return of(mock.content)
    return requestApi({
      url: 'library/book/dashboard',
      method: 'POST',
      param: {
        organizationIds: [1],
        categoryIds: [1, 2, 3],
        authorIds: [10, 11],
        deviceId: 'ab12cd667fee4e',
        downloadedOnly: false
      },
      type: 'json'
    })(BookResponse).pipe(map((res) => res.result.content))
  }
}
