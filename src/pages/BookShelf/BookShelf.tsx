import { Modal, SearchBar } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TouchableWithoutFeedback } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useSelector } from 'react-redux'
import { TabType } from 'shared/model'
import { RootReducer } from 'shared/store/rootReducer'
import { useThunkDispatch } from 'shared/util'
import { Book, BookRenderItem } from './+model'
import { getBookShelf } from './+state/bookshelf.effect'
import * as Styled from './BookShelf.contant'
import { BookShelfItem } from './BookShelfItem'

const useBook = (bookId: string) => {
  const books = useSelector((s: RootReducer) => s.BookShelfState.list)
  const [search, setSearch] = useState<string>('')
  const dispatch = useThunkDispatch()

  useEffect(() => {
    const bookshelfThunk = dispatch(getBookShelf())

    return () => {
      bookshelfThunk.unsubscribe()
    }
  }, [bookId, search])

  return {
    value: books,
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
      styles={{
        wrapper: {
          flex: 1
        }
      }}
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

const keyExtractor = (item: Book) => {
  return item.bookId.toString()
}

const renderItem = ({ item }: BookRenderItem<Book, string>) => (
  <BookShelfItem item={item} />
)

export const BookShelf = () => {
  // Using for change book item status
  const [bookStatus, setBookStatus] = useState<string[]>([])
  const renderBookItem = useCallback(
    ({ item, index }) => renderItem({ item, index, bookStatus, setBookStatus }),
    []
  )
  const handleActionKey = useCallback(() => {
    Modal.prompt(
      'Access Code',
      'Please enter the access code to view your bookshelf.',
      (password) => {
        if (password) {
          Alert.alert('Success')
        }
      },
      'default',
      undefined,
      ['Access code']
    )
  }, [])

  // Hook get book from api
  const book = useBook('123')

  return (
    <Styled.HeaderSafeView>
      <Styled.StatusBar />
      <Styled.Header>
        <Search search={book.search} />
        <Styled.HeaderActionContainer>
          <TouchableWithoutFeedback>
            <Styled.HeaderActionIcon name="filter" size={28} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleActionKey}>
            <Styled.HeaderActionIcon name="key" size={28} />
          </TouchableWithoutFeedback>
        </Styled.HeaderActionContainer>
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
