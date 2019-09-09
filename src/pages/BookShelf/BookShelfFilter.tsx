import { Button, List } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import {
  AuthorFilter,
  BookShelfFilter as BookFilter,
  CategoryFilter,
  Filter,
  PublisherFilter
} from 'pages/BookShelf/+model'
import { getBookShelfFilter } from 'pages/BookShelf/+state/bookshelf.effect'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { NavigationStackScreenOptions } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'
import { Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'
import {
  CheckBoxItem,
  SelectableTag,
  StyledViewContainer
} from 'shared/components'
import { useThunkDispatch } from 'shared/util'
import styled from 'styled-components/native'

interface ChangeParam {
  filterKey: keyof Filter
  itemKey: string
  isChecked: boolean
}

interface ChangeAllParam {
  filterKey: keyof Filter
  isChecked: boolean
}

const CategoryContainer = styled.View`
  background-color: ${(props) => props.theme.container_background_color};
`

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.primary_color};
  margin-right: 16px;
  font-weight: bold;
`

const updateChange = (
  params: ChangeParam,
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
) => {
  const { filterKey, isChecked, itemKey } = params
  setFilter((prevState) =>
    prevState
      ? {
          ...prevState,
          [filterKey]: {
            ...prevState[filterKey],
            [itemKey]: {
              ...prevState[filterKey][itemKey],
              isChecked
            }
          }
        }
      : null
  )
}

const updateAllChange = (
  params: ChangeAllParam,
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
) => {
  const { filterKey, isChecked } = params

  setFilter((prevState) => {
    if (!prevState) {
      return null
    }

    Object.keys(prevState[filterKey]).forEach((key) => {
      prevState[filterKey][key] = {
        ...prevState[filterKey][key],
        isChecked
      }
    })

    return {
      ...prevState,
      [filterKey]: {
        ...prevState[filterKey]
      }
    }
  })
}

const renderBookShelf = (
  bookFilter: Record<string, BookFilter>,
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
) => {
  const isCheckedAll = Object.keys(bookFilter).every((key) => {
    return !!bookFilter[key].isChecked
  })
  const filterKey: keyof Filter = 'bookShelf'

  return (
    <List style={{ marginTop: 2 }}>
      <Text
        style={{
          marginLeft: 16,
          marginTop: 12,
          marginBottom: 8,
          fontWeight: 'bold'
        }}
      >
        {Localize.t('Common.BookShelf')}
      </Text>
      {(() => {
        return Object.keys(bookFilter).map((key) => {
          const book = bookFilter[key]
          return (
            <CheckBoxItem
              key={book.bookshelfId}
              checked={book.isChecked}
              onToggle={(isChecked) => {
                updateChange(
                  {
                    filterKey,
                    itemKey: key,
                    isChecked
                  },
                  setFilter
                )
              }}
            >
              <Text style={{ marginLeft: 8 }}>{book.name}</Text>
            </CheckBoxItem>
          )
        }) as any
      })()}
      <CheckBoxItem
        checked={isCheckedAll}
        onToggle={(isChecked) => {
          updateAllChange(
            {
              filterKey,
              isChecked
            },
            setFilter
          )
        }}
      >
        <Text style={{ marginLeft: 8 }}>{Localize.t('Common.All')}</Text>
      </CheckBoxItem>
    </List>
  )
}

const renderCategory = (
  categoryFilter: Record<string, CategoryFilter>,
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
) => {
  return (
    <CategoryContainer
      style={{ marginTop: 12, paddingVertical: 16, paddingHorizontal: 12 }}
    >
      <Text
        style={{
          marginLeft: 4,
          marginBottom: 12,
          fontWeight: 'bold',
          backgroundColor: 'white'
        }}
      >
        {Localize.t('Common.Category')}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.keys(categoryFilter).map((key) => {
          const item = categoryFilter[key]

          return (
            <SelectableTag
              key={item.bookCategoryId}
              checked={item.isChecked}
              onChange={(isChecked) => {
                updateChange(
                  {
                    filterKey: 'category',
                    itemKey: key,
                    isChecked
                  },
                  setFilter
                )
              }}
            >
              {item.name}
            </SelectableTag>
          )
        })}
      </View>
    </CategoryContainer>
  )
}

const renderAuthor = (
  authorFilter: Record<string, AuthorFilter>,
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
) => {
  return (
    <List style={{ marginTop: 12 }}>
      <Text
        style={{
          marginLeft: 16,
          marginTop: 12,
          marginBottom: 8,
          fontWeight: 'bold'
        }}
      >
        {Localize.t('Common.Author')}
      </Text>
      {(() => {
        return Object.keys(authorFilter).map((key) => {
          const author = authorFilter[key]
          return (
            <CheckBoxItem
              key={author.authorId}
              checked={author.isChecked}
              onToggle={(isChecked) => {
                updateChange(
                  {
                    filterKey: 'author',
                    itemKey: key,
                    isChecked
                  },
                  setFilter
                )
              }}
            >
              <Text style={{ marginLeft: 8 }}>{author.name}</Text>
            </CheckBoxItem>
          )
        }) as any
      })()}
    </List>
  )
}

const renderPublisher = (
  publisherFilter: Record<string, PublisherFilter>,
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
) => {
  const isCheckedAll = Object.keys(publisherFilter).every((key) => {
    return !!publisherFilter[key].isChecked
  })
  const filterKey: keyof Filter = 'publisher'

  return (
    <List style={{ marginTop: 12 }}>
      <Text
        style={{
          marginLeft: 16,
          marginTop: 12,
          marginBottom: 8,
          fontWeight: 'bold'
        }}
      >
        {Localize.t('Common.Publisher')}
      </Text>
      {(() => {
        return Object.keys(publisherFilter).map((key) => {
          const publisher = publisherFilter[key]
          return (
            <CheckBoxItem
              key={publisher.organizationId}
              checked={publisher.isChecked}
              onToggle={(isChecked) => {
                updateChange(
                  {
                    filterKey,
                    itemKey: key,
                    isChecked
                  },
                  setFilter
                )
              }}
            >
              <Text style={{ marginLeft: 8 }}>{publisher.name}</Text>
            </CheckBoxItem>
          )
        }) as any
      })()}
      <CheckBoxItem
        checked={isCheckedAll}
        onToggle={(isChecked) => {
          updateAllChange(
            {
              filterKey,
              isChecked
            },
            setFilter
          )
        }}
      >
        <Text style={{ marginLeft: 8 }}>{Localize.t('Common.All')}</Text>
      </CheckBoxItem>
    </List>
  )
}

export const BookShelfFilter = () => {
  const { setParams, goBack, state } = useNavigation()
  const initialCheck = state.params.initialCheck
    ? JSON.parse(state.params.initialCheck)
    : null
  const [filter, setFilter] = useState<Filter | null>(() => initialCheck)
  const dispatch = useThunkDispatch()

  const handleSubmit = () => {
    goBack()
    state.params.onApply(filter)
  }

  const handleResetAll = () => {
    setFilter((prevState) => {
      if (prevState) {
        const mapToUncheck: <T>(filterKey: keyof Filter) => T = (filterKey) =>
          Object.assign(
            {},
            ...Object.keys(prevState[filterKey]).map((key) => ({
              [key]: {
                ...prevState[filterKey][key],
                isChecked: undefined
              }
            }))
          )
        const bookShelf = mapToUncheck<Record<string, BookFilter>>('bookShelf')
        const author = mapToUncheck<Record<string, AuthorFilter>>('author')
        const publisher = mapToUncheck<Record<string, PublisherFilter>>(
          'publisher'
        )
        const category = mapToUncheck<Record<string, CategoryFilter>>(
          'category'
        )

        return {
          bookShelf,
          author,
          publisher,
          category
        } as Filter
      }

      return prevState
    })
  }

  useEffect(() => {
    let filterSubs: Subscription | null = null

    if (!initialCheck) {
      filterSubs = dispatch(getBookShelfFilter())
        .pipe(
          tap((result: Filter | null) => {
            if (result) {
              const { bookShelf, category, author, publisher } = result
              // setBackUpData({
              //   category: {...category},
              //   bookShelf: {...bookShelf},
              //   author: {...author},
              //   publisher: {...publisher}
              // })
              setFilter({
                category: { ...category },
                bookShelf: { ...bookShelf },
                author: { ...author },
                publisher: { ...publisher }
              })
            }
          })
        )
        .subscribe()
    }

    return () => {
      if (filterSubs) {
        filterSubs.unsubscribe()
      }
    }
  }, [])

  // Connect header button press through navigation params.
  useEffect(() => {
    setParams({ resetAll: handleResetAll })
  }, [filter])

  if (!filter) {
    return null
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#F2F3F5' }}>
          {renderBookShelf(filter.bookShelf, setFilter)}
          {renderCategory(filter.category, setFilter)}
          {renderAuthor(filter.author, setFilter)}
          {renderPublisher(filter.publisher, setFilter)}
          <StyledViewContainer>
            <Button
              type="primary"
              onPress={handleSubmit}
              style={{
                alignSelf: 'stretch',
                marginHorizontal: 16,
                marginTop: 32
              }}
            >
              {Localize.t('Common.Apply')}
            </Button>
          </StyledViewContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

BookShelfFilter.navigationOptions = ({
  navigation
}: any): NavigationStackScreenOptions => {
  const { getParam } = navigation

  return {
    headerRight: (
      <TouchableWithoutFeedback onPress={getParam('resetAll')}>
        <HeaderRightText>Reset All</HeaderRightText>
      </TouchableWithoutFeedback>
    ),
    title: 'All Filters'
  }
}
