import { SearchBar } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { bookshelfSelector } from 'pages/BookShelf/+state/bookshelf.selector'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, TouchableWithoutFeedback } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { BookAction, TabType } from 'shared/model'
import { RootReducer } from 'shared/store/rootReducer'
import { useThunkDispatch } from 'shared/util'
import { Book, BookRenderItem, Filter, FilterRequest } from './+model'
import { getBookShelf } from './+state/bookshelf.effect'
import * as Styled from './BookShelf.contant'
import { BookShelfItem } from './BookShelfItem'

const useBook = () => {
  const books = useSelector((s: RootReducer) => s.BookShelfState.list)
  const [search, setSearch] = useState<string>('')
  const [filter, setFilter] = useState<FilterRequest>({
    authorIds: [],
    categoryIds: [],
    organizationIds: []
  })
  const dispatch = useThunkDispatch()

  useEffect(() => {
    const bookshelfThunk = dispatch(
      getBookShelf({
        search,
        filter
      })
    )

    return () => {
      bookshelfThunk.unsubscribe()
    }
  }, [search, filter])

  return {
    value: books,
    search: useCallback((text: string) => setSearch(text), []),
    applyFilter: useCallback((data: FilterRequest) => setFilter(data), [filter])
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

const renderItem = ({
  item,
  bookActionStatus
}: BookRenderItem<Book, Dictionary<BookAction>>) => (
  <BookShelfItem item={item} status={bookActionStatus} />
)

export const BookShelf = () => {
  // const
  const book = useBook() // Hook get book from api
  const [filterData, setFilterData] = useState<Filter | null>(null)

  // Using for change book item status
  const bookActionStatus = useSelector(bookshelfSelector.getBookActionStatus)
  const renderBookItem = useCallback(
    ({ item, index }) => renderItem({ item, index, bookActionStatus }),
    [bookActionStatus]
  )
  const { navigate } = useNavigation()
  // const handleActionKey = useCallback(() => {
  //   Modal.prompt(
  //     'Access Code',
  //     'Please enter the access code to view your bookshelf.',
  //     (password) => {
  //       if (password) {
  //         Alert.alert('Success')
  //       }
  //     },
  //     'default',
  //     undefined,
  //     ['Access code']å
  //   )
  // }, [])

  const onFilterApply = (data: Filter | null) => {
    const filterData: FilterRequest = {
      organizationIds: [],
      categoryIds: [],
      authorIds: []
    }

    if (data) {
      const { category, author } = data

      filterData.categoryIds = Object.keys(category)
        .filter((key) => category[key].isChecked)
        .map((key) => category[key].bookCategoryId)

      filterData.authorIds = Object.keys(author)
        .filter((key) => author[key].isChecked)
        .map((key) => author[key].authorId)
    }

    book.applyFilter(filterData)
    setFilterData(data)
  }

  return (
    <Styled.HeaderSafeView>
      <Styled.StatusBar />
      <Styled.Header>
        <Search search={book.search} />
        <Styled.HeaderActionContainer>
          <TouchableWithoutFeedback
            onPressIn={() => {
              navigate('BookShelfFilter', {
                onApply: onFilterApply,
                initialCheck: JSON.stringify(filterData)
              })
            }}
          >
            <Styled.HeaderActionIcon name="filter" size={28} />
          </TouchableWithoutFeedback>
          {/*<TouchableWithoutFeedback onPress={handleActionKey}>*/}
          {/*  <Styled.HeaderActionIcon name="key" size={28} />*/}
          {/*</TouchableWithoutFeedback>*/}
        </Styled.HeaderActionContainer>
      </Styled.Header>
      <FlatList
        style={{ flex: 1, backgroundColor: '#F2F3F5', paddingTop: 8 }}
        horizontal={false}
        extraData={bookActionStatus}
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
