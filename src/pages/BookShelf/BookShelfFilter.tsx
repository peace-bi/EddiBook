import { Button, List } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { BookShelfFilter as BookFilter, CategoryFilter, Filter } from 'pages/BookShelf/+model'
import { getBookShelfFilter } from 'pages/BookShelf/+state/bookshelf.effect'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { tap } from 'rxjs/operators'
import { CheckBoxItem, SelectableTag } from 'shared/components'
import { useThunkDispatch } from 'shared/util'
import styled from 'styled-components/native'

const CategoryContainer = styled.View`
  background-color: ${(props) => props.theme.container_background_color};
`

const renderBookShelf = (bookFilter: Record<string, BookFilter>, setFilter: React.Dispatch<React.SetStateAction<Filter | null>>) => {
  const isCheckedAll = Object.keys(bookFilter).every((key) => {
    return !!bookFilter[key].isChecked
  })

  return <List style={{ marginTop: 2 }}>
    <Text style={{ marginLeft: 16, marginTop: 12, marginBottom: 8, fontWeight: 'bold' }}>{Localize.t('Common.BookShelf')}</Text>
    {(() => {
      return Object.keys(bookFilter).map((key) => {
        const book = bookFilter[key]
        return <CheckBoxItem key={book.bookshelfId} checked={book.isChecked} onToggle={(isChecked) => {
          setFilter((prevState) => prevState ? ({
            ...prevState,
            bookShelf: {
              ...prevState.bookShelf,
              [key]: {
                ...prevState.bookShelf[key],
                isChecked
              }

            }
          }) : null)
        }}>
          <Text style={{ marginLeft: 8 }}>{book.name}</Text>
        </CheckBoxItem>
      }) as any
    })()}
    <CheckBoxItem checked={isCheckedAll} onToggle={(isChecked) => {
      setFilter((prevState) => {
        if (!prevState) {
          return null
        }

        Object.keys(prevState.bookShelf).forEach((key) => {
          prevState.bookShelf[key] = {
            ...prevState.bookShelf[key],
            isChecked
          }
        })

        return {
          ...prevState,
          bookShelf: {
            ...prevState.bookShelf
          }
        }
      })
    }}>
      <Text style={{ marginLeft: 8 }}>All</Text>
    </CheckBoxItem>
  </List>
}

const renderCategory = (categoryFilter: Record<string, CategoryFilter>, setFilter: React.Dispatch<React.SetStateAction<Filter | null>>) => {
  return <CategoryContainer style={{ marginTop: 12, paddingVertical: 16, paddingHorizontal: 12 }}>
    <Text style={{ marginLeft: 4, marginBottom: 12, fontWeight: 'bold', backgroundColor: 'white' }}>{Localize.t('Common.Category')}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {
        Object.keys(categoryFilter).map((key) => {
          const item = categoryFilter[key]

          return <SelectableTag key={item.bookCategoryId}  checked={item.isChecked} onChange={(isChecked) => {
            setFilter((prevState) => prevState ? ({
              ...prevState,
              category: {
                ...prevState.category,
                [key]: {
                  ...prevState.category[key],
                  isChecked
                }

              }
            }) : null)
          }}>{item.name}</SelectableTag>
        })
      }
    </View>
  </CategoryContainer>
}

const renderAuthor = () => {
  return <List style={{ marginTop: 12 }}>
    <Text style={{ marginLeft: 16, marginTop: 12, marginBottom: 8, fontWeight: 'bold' }}>{Localize.t('Common.Author')}</Text>
    <CheckBoxItem>
      <Text style={{ marginLeft: 8 }}>The secret of success</Text>
    </CheckBoxItem>
  </List>
}

const renderPublisher = () => {
  return <List style={{ marginTop: 12 }}>
    <Text style={{ marginLeft: 16, marginTop: 12, marginBottom: 8, fontWeight: 'bold' }}>{Localize.t('Common.Publisher')}</Text>
    <CheckBoxItem>
      <Text style={{ marginLeft: 8 }}>The secret of success</Text>
    </CheckBoxItem>
    <CheckBoxItem>
      <Text style={{ marginLeft: 8 }}>All</Text>
    </CheckBoxItem>
  </List>
}

export const BookShelfFilter = () => {
  const [backUpData, setBackUpData] = useState<Filter | null>(null)
  const [filter, setFilter] = useState<Filter | null>(null)
  const dispatch = useThunkDispatch()

  useEffect(() => {
    const filterSubs = dispatch(getBookShelfFilter()).pipe(
      tap((result: Filter | null) => {
        if (result) {
          const { bookShelf, category, author, publisher } = result
          setBackUpData({
            category: {...category},
            bookShelf: {...bookShelf},
            author: {...author},
            publisher: {...publisher}
          })
          setFilter({
            category: {...category},
            bookShelf: {...bookShelf},
            author: {...author},
            publisher: {...publisher}
          })
        }
      })
    ).subscribe()

    return () => {
      filterSubs.unsubscribe()
    }
  }, [])

  if (!filter) {
    return null
  }

  return <SafeAreaView>
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#F2F3F5' }}>
        {renderBookShelf(filter.bookShelf, setFilter)}
        {renderCategory(filter.category, setFilter)}
        {renderAuthor()}
        {renderPublisher()}
        <Button onPress={() => {
          setFilter(backUpData)
        }
        }>Reset all</Button>
      </View>
    </ScrollView>
  </SafeAreaView>
}
