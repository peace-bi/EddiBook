import { SearchBar } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { TabType } from 'shared/model'
import { Book, BookRenderItem } from './+model'
import * as Styled from './BookShelf.contant'
import { BookShelfItem } from './BookShelfItem'

const keyExtractor = (item: any) => {
  return item.key
}

const renderItem = ({ item }: BookRenderItem<Book, string>) => (
  <BookShelfItem item={item} />
)

const data: Book[] = [
  {
    key: '1',
    name:
      // tslint:disable-next-line:max-line-length
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
    downloaded: false,
    status: 'NEW',
    coverUrl:
      'https://static1.squarespace.com/static/57d0be8b197aea6ac8094583/57d0e2c5d482e9cbbd0163ba/57d0e31af7e0ab55388eb78c/1473307419491/Ros+Cover+10SP+pdf.png?format=1000w'
  },
  {
    key: '2',
    name:
      // tslint:disable-next-line:max-line-length
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
    downloaded: false,
    status: 'NEW',
    coverUrl:
      'http://static1.squarespace.com/static/57d0be8b197aea6ac8094583/57d0e2c5d482e9cbbd0163ba/580e1cd2f5e23112ec389748/1477319890779/Say+it+again+Cover+10SP+PDF+ONLY.png'
  },
  {
    key: '3',
    name:
      // tslint:disable-next-line:max-line-length
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
    downloaded: false,
    status: 'NEW',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnSqUTQtf-oe1LfPb8Uz2rwjcTizy8_qXs5QizGw5KC_RV1ww'
  },
  {
    key: '4',
    name: 'Bon',
    downloaded: false,
    status: 'NEW',
    coverUrl:
      'https://wildpoland.com/wp-content/uploads/2014/08/biebrza-site-guide-pdf-cover-01.jpg'
  }
]

const useBook = (bookId: string) => {
  const [value, setValue] = useState<Book[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setValue(data)
  }, [bookId, search])

  return {
    value,
    setValue,
    search: useCallback((text: string) => setSearch(text), [])
  }
}

interface Search {
  search: (text: string) => void
}

const Search = ({ search }: Search) => {
  const searchRef = useRef<SearchBar>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [lastSearch, setLastSearch] = useState<string>('')
  const searchCancel = useCallback(() => {
    if (searchRef.current && searchRef.current.inputRef) {
      searchRef.current.inputRef.blur()
    }
    setSearchText(lastSearch)
  }, [lastSearch])
  const searchChange = useCallback((value) => {
    setSearchText(value)
  }, [])
  const submitSearch = useCallback((value) => {
    search(value)
    setLastSearch(value)
  }, [])

  return (
    <Styled.Search
      ref={searchRef}
      value={searchText}
      showCancelButton={false}
      placeholder={Localize.t('Book.SearchPlaceholder')}
      cancelText={Localize.t('Common.Cancel')}
      onChange={searchChange}
      onCancel={searchCancel}
      onSubmit={submitSearch}
    />
  )
}

export const BookShelf = () => {
  // Using for change book item status
  const [bookStatus, setBookStatus] = useState<string[]>([])
  const renderBookItem = useCallback(
    ({ item, index }) => renderItem({ item, index, bookStatus, setBookStatus }),
    []
  )

  // Hook get book from api
  const book = useBook('123')

  return (
    <Styled.HeaderSafeView>
      <Styled.StatusBar />
      <Styled.Header>
        <Search search={book.search} />
      </Styled.Header>
      <FlatList
        style={{ flex: 1, backgroundColor: '#F2F3F5', paddingTop: 8 }}
        horizontal={false}
        extraData={bookStatus}
        data={book.value}
        renderItem={renderBookItem}
        keyExtractor={keyExtractor}
        numColumns={DeviceInfo.isTablet() ? 2 : 1}
      />
    </Styled.HeaderSafeView>
  )
}

BookShelf.navigationOptions = () => ({
  tabBarLabel: Localize.t(TabType.BOOKSHELF)
})
