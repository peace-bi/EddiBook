import React, { useCallback, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Book, RenderItem } from './+model'
import { BookShelfItem } from './BookShelfItem'

function keyExtractor(item: any) {
  return item.key
}

const renderItem = ({ item }: RenderItem<Book, string>) => (
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

export const BookShelf = () => {
  const [bookStatus, setBookStatus] = useState<string[]>([])
  const renderItemCall = useCallback(
    ({ item, index }) => renderItem({ item, index, bookStatus, setBookStatus }),
    []
  )

  return (
    <SafeAreaView style={{ backgroundColor: '#F2F3F5', flex: 1 }}>
      <FlatList
        horizontal={false}
        extraData={bookStatus}
        data={data}
        renderItem={renderItemCall}
        keyExtractor={keyExtractor}
        numColumns={DeviceInfo.isTablet() ? 2 : 1}
      />
    </SafeAreaView>
  )
}
