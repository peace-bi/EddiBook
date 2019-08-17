import {
  ActivityIndicator,
  Button,
  Icon,
  WhiteSpace,
  WingBlank
} from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { formatBytes } from 'shared/util'
import { getBookDetail, getRelatedBook } from './+state/book-detail.effect'
import { Author, BookDetailResponse } from './+state/book-detail.model'
import { bookDetailSelector } from './+state/book-detail.selector'

import React from 'react'
import {
  Animated,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useScreens } from 'react-native-screens'
import { Header, NavigationScreenProps, ScrollView } from 'react-navigation'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { PlainAction } from 'redux-typed-actions'
import { getHost } from 'shared/api'
import {
  StyledBodyText,
  StyledCategory,
  StyledDescMutedText,
  StyledDescText,
  StyledTitleText,
  StyledTouchableText
} from 'shared/components'
import { RootReducer } from 'shared/store/rootReducer'
import styled, { DefaultTheme } from 'styled-components/native'
import { styles } from './book-detail.constant'
import { BookActionButton } from './BookAction'
import { RelatedBook } from './RelatedBook'

// tslint:disable-next-line:react-hooks-nesting
useScreens(false)

const HEADER_MAX_HEIGHT = 300
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 20
const HEADER_MIN_HEIGHT = Header.HEIGHT + STATUS_BAR_HEIGHT
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

interface Props extends NavigationScreenProps<any> {
  dispatch: ThunkDispatch<{}, {}, PlainAction>
  book: BookDetailResponse | null
}

interface State {}

interface StyledView {
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
  theme: DefaultTheme
}

const StyledBookName = styled.Text`
  color: ${(props) => props.theme.color_text_caption};
  font-size: 16px;
  font-weight: 500;
`

const StyledView = styled.View<StyledView>`
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : 'flex-start'};
  /* padding: 16px; */
`

const StyledHorizontalView = styled(StyledView)`
  flex-direction: row;
  justify-content: space-between;
`

const StyledCategoryCustom = styled(StyledCategory)`
  background-color: ${(props) => props.theme.divider_color};
  font-size: 10px;
`

const StyledDivider = styled.View`
  height: 10;
  background-color: ${(props) => props.theme.divider_color};
  margin-top: 20px;
  margin-bottom: 20px;
`

const StyledAnimatedHeader = styled(Animated.View)`
  z-index: 0;
  height: 100%;
  position: absolute;
  background-color: ${(props) => (props.theme as DefaultTheme).header_color};
  width: 100%;
`

const StyledContainer = styled.View`
  background-color: ${(props) => props.theme.container_background_color};
`

const StyledAnimatedHeaderView = styled.View`
  position: absolute;
  top: 0;
  z-index: -1;
  left: -25%;
  width: 150%;
  height: 50%;
  right: 0;
  overflow: hidden;
`
const StyledHeader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  max-height: ${HEADER_MIN_HEIGHT};
`

const HeaderComponent = Animated.createAnimatedComponent(
  StyledAnimatedHeaderView
)
class BookDetail extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })
  scrollY = new Animated.Value(0)

  constructor(props: Props) {
    super(props)
  }

  componentDidMount(): void {
    const bookId = this.props.navigation.getParam('bookId')
    this.props.dispatch(getBookDetail(bookId))
    this.props.dispatch(getRelatedBook(bookId))
  }

  backPress = () => {
    this.props.navigation.pop()
  }

  getAuthors = (authors: Author[] | undefined) => {
    return authors ? authors.reduce((sum, curr, index) => {
      const name = index === 0 ? curr.name : `, ${curr.name}`
      return sum + name
    }, '') : ''
  }

  renderLicenseTime = (item: BookDetailResponse) => {
    if (item.hasLicenseExpired) {
      return Localize.t('Book.LicenseDate', {
        p: Localize.t('Common.Expired')
      })
    }
    if (item.licenseStatus === 'Perpetual') {
      return null
    }
    if (item.licenseEndDate) {
      return Localize.t('Book.LicenseDate', {
        p: Localize.strftime(new Date(item.licenseEndDate), '%Y/%m/%d')
      })
    }
    return null
  }

  /*
  * size: number (bytes)
  * */
  getBookSize = (size: number) => {
    return formatBytes(size)
  }

  render() {
    const book = this.props.book

    if (!book) {
      return (
        <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    const headerHeightExtended = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 1.25],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    const headerHeightInverted = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 1.25],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: 'clamp'
    })
    const opacity = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [4, 0],
      extrapolate: 'clamp'
    })

    const { authors, name, bookId, categoryName, bookSize, pdf, description } = book

    return (
      <StyledContainer style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.contentWrapper}>
          <ScrollView
            snapToOffsets={[HEADER_MAX_HEIGHT]}
            snapToEnd={false}
            snapToStart={true}
            overScrollMode="always"
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
          >
            <View style={{ height: 300 + Header.HEIGHT + 52 }} />
            <WingBlank>
              <StyledView alignItems={'center'}>
                <WhiteSpace />
                <WhiteSpace />
                <StyledBookName>{name}</StyledBookName>
                <WhiteSpace size="xs" />
                <StyledDescText>{this.getAuthors(authors)}</StyledDescText>
                <BookActionButton bookId={bookId} bookUrl={pdf} />
              </StyledView>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <StyledHorizontalView alignItems="center">
                <StyledTitleText>
                  {Localize.t('BookingDetail.Intro')}
                </StyledTitleText>
                <StyledCategoryCustom>{categoryName}</StyledCategoryCustom>
              </StyledHorizontalView>
              <WhiteSpace size="lg" />
              <WhiteSpace size="xs" />
              <StyledHorizontalView alignItems="center" py-0={true}>
                <StyledDescMutedText>
                  {this.renderLicenseTime(book)}
                </StyledDescMutedText>
                <StyledDescMutedText>
                  {Localize.t('BookingDetail.Size', { p: this.getBookSize(bookSize) })}
                </StyledDescMutedText>
              </StyledHorizontalView>
              <WhiteSpace size="xs" />
              <StyledDescMutedText>
                {Localize.t('BookingDetail.Publisher', {
                  p: 'Nhan Van Bookstore'
                })}
              </StyledDescMutedText>
              <WhiteSpace size="md" />
              <StyledBodyText>{description}</StyledBodyText>
            </WingBlank>
            <StyledDivider />
            <WhiteSpace size="md" />
            <WingBlank>
              <StyledHorizontalView alignItems="center">
                <StyledTitleText>
                  {Localize.t('BookingDetail.RelatedBook')}
                </StyledTitleText>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (this.props.screenProps) {
                      // this.props.screenProps.changeTheme('dark')
                    }
                  }}
                >
                  <StyledTouchableText>
                    {Localize.t('Common.ViewAll')}
                  </StyledTouchableText>
                </TouchableWithoutFeedback>
              </StyledHorizontalView>
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />
            <RelatedBook />
            <WhiteSpace />
            <WhiteSpace />
          </ScrollView>
        </View>
        <StyledHeader>
          <View style={{ height: STATUS_BAR_HEIGHT }} />
          <View
            style={{
              flex: 1,
              height: Header.HEIGHT,
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <View style={styles.viewWrapper}>
              <View style={styles.backButtonWrapper}>
                <Button
                  activeStyle={{ backgroundColor: 'transparent' }}
                  style={styles.backButton}
                  onPress={this.backPress}
                >
                  <Icon name="left" style={styles.backButtonIcon} />
                </Button>
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                  {Localize.t('BookingDetail.BookInfo')}
                </Text>
              </View>
            </View>
          </View>
          <Animated.View style={{ opacity, top: headerHeightInverted }}>
            <FastImage
              style={styles.bookCover}
              resizeMode="stretch"
              source={{
                uri: `${getHost()}${book.cover}`
              }}
            />
          </Animated.View>
        </StyledHeader>
        <HeaderComponent
          style={{
            borderBottomLeftRadius: headerHeightExtended,
            borderBottomRightRadius: headerHeightExtended,
            height: headerHeightExtended
          }}
        >
          <StyledAnimatedHeader />
          <Animated.View style={{ opacity, flex: 1 }}>
            <FastImage
              style={{
                ...styles.backgroundCoverImg,
                zIndex: 1,
                top: 0,
                left: 0,
                flex: 1
              }}
              resizeMode="cover"
              source={{
                uri: `${getHost()}${book.cover}`
              }}
            />
          </Animated.View>
        </HeaderComponent>
      </StyledContainer>
    )
  }
}

export default connect((state: RootReducer, props: any) => {
  const bookId = props.navigation.getParam('bookId')
  return {
    book: bookDetailSelector.getBookDetail(bookId)(state)
  }
})(BookDetail)
