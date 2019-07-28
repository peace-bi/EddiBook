import { Localize } from 'core/localize'
import { BookShelfItem } from 'pages/BookShelf'
import { Book, BookRenderItem } from 'pages/BookShelf/+model'
import { bookshelfSelector } from 'pages/BookShelf/+state/bookshelf.selector'
import * as Styled from 'pages/BookShelf/BookShelf.contant'
import React, { useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useSelector } from 'react-redux'
import { StyledHeaderText } from 'shared/components'
import { BookAction, TabType } from 'shared/model'
import { RootReducer } from 'shared/store/rootReducer'

const keyExtractor = (item: Book) => {
  return item.bookId.toString()
}

const renderItem = ({
  item,
  bookActionStatus
}: BookRenderItem<Book, Dictionary<BookAction>>) => (
  <BookShelfItem item={item} status={bookActionStatus} />
)

export const Downloaded = () => {
  // Hook get book from api
  const books = useSelector(bookshelfSelector.getDownloadedBook)
  // Using for change book item status
  const bookActionStatus = useSelector(bookshelfSelector.getBookActionStatus)
  const renderBookItem = useCallback(
    ({ item, index }) => renderItem({ item, index, bookActionStatus }),
    [bookActionStatus]
  )

  return (
    <Styled.HeaderSafeView>
      <Styled.StatusBar />
      <Styled.Header style={{ paddingBottom: 20 }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 44,
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <StyledHeaderText style={{ alignSelf: 'center' }}>
            Downloaded Book List
          </StyledHeaderText>
        </View>
      </Styled.Header>
      <FlatList
        style={{ flex: 1, backgroundColor: '#F2F3F5', paddingTop: 8 }}
        horizontal={false}
        extraData={bookActionStatus}
        data={books}
        renderItem={renderBookItem}
        keyExtractor={keyExtractor}
        numColumns={DeviceInfo.isTablet() ? 2 : 1}
      />
    </Styled.HeaderSafeView>
  )
}

Downloaded.navigationOptions = () => ({
  tabBarLabel: Localize.t(TabType.DOWNLOADED)
})
