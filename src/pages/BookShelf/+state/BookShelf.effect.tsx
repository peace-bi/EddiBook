import { Observable, of } from 'rxjs'
import { Book } from '../+model'

const mock = {
  content: [
    {
      bookVersionHistoryId: 5,
      name: 'Book name  5',
      licenseDate: null,
      category: 'Book category 1',
      licenseEndDate: '2020-06-25T19:08:31.137Z',
      hasUpdate: false,
      hasLicenseExpired: false,
      pdf: '/library/file-storage/download/802547_cym_proto_1R.pdf',
      cover: '/library/file-storage/download/01_book.jpg',
      new: true,
      downloaded: false
    },
    {
      bookVersionHistoryId: 1,
      name: 'Book name  1',
      licenseDate: null,
      category: 'Book category 1',
      licenseEndDate: '2020-06-25T19:08:31.137Z',
      hasUpdate: false,
      hasLicenseExpired: false,
      pdf: '/library/file-storage/download/802547_cym_proto_1R.pdf',
      cover: '/library/file-storage/download/02_book.jpg',
      new: true,
      downloaded: false
    }
  ] as Book[]
}

export function getBookShelf() {
  return (): Observable<Book[]> => {
    return of(mock.content)
    // return requestApi({
    //   url: 'library/book/dashboard',
    //   method: 'POST',
    //   param: {
    //     organizationIds: [1, 2, 3],
    //     categoryIds: [1, 2, 3],
    //     authorIds: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    //     deviceId: 'ab12cd667fee4e',
    //     downloadedOnly: false
    //   },
    //   type: 'json'
    // })(BookResponse).pipe(
    //   map((res) => {
    //     return res.result.content
    //   }),
    //   catchError((err) => {
    //     console.info('Can not get err', err)
    //     return []
    //   })
    // )
  }
}
