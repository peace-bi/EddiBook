import { Button, Icon, WhiteSpace, WingBlank } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React from 'react'
import {
  Animated,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Header, NavigationScreenProps, ScrollView } from 'react-navigation'
import {
  StyledBodyText,
  StyledCategory,
  StyledDescMutedText,
  StyledDescText,
  StyledTitleText,
  StyledTouchableText
} from 'shared/components'
import styled, { DefaultTheme } from 'styled-components/native'

import { styles } from './book-detail.constant'
import { RelatedBook } from './RelatedBook'

const HEADER_MAX_HEIGHT = 300
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 20
const HEADER_MIN_HEIGHT = Header.HEIGHT + STATUS_BAR_HEIGHT
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

interface Props extends NavigationScreenProps<any> {}

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
  z-index: 0;
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
export default class BookDetail extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })
  scrollY = new Animated.Value(0)
  constructor(props: Props) {
    super(props)
  }

  backPress = () => {
    this.props.navigation.pop()
  }

  render() {
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
                <StyledBookName>Who is Bill Gates?</StyledBookName>
                <WhiteSpace size="xs" />
                <StyledDescText>Patricia Brennan Demuth</StyledDescText>
                <Button
                  type="primary"
                  onPress={() => {}}
                  style={{ alignSelf: 'stretch', marginTop: 36 }}
                >
                  {Localize.t('BookingDetail.Download')}
                </Button>
              </StyledView>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <StyledHorizontalView alignItems="center">
                <StyledTitleText>
                  {Localize.t('BookingDetail.Intro')}
                </StyledTitleText>
                <StyledCategoryCustom>Kiếm hiệp Kim Dung</StyledCategoryCustom>
              </StyledHorizontalView>
              <WhiteSpace size="lg" />
              <WhiteSpace size="xs" />
              <StyledHorizontalView alignItems="center" py-0={true}>
                <StyledDescMutedText>
                  {Localize.t('BookingDetail.ExpiryDate', {
                    p: Localize.strftime(new Date(), '%m/%d/%Y')
                  })}
                </StyledDescMutedText>
                <StyledDescMutedText>
                  {Localize.t('BookingDetail.Size', { p: '150mb' })}
                </StyledDescMutedText>
              </StyledHorizontalView>
              <WhiteSpace size="xs" />
              <StyledDescMutedText>
                {Localize.t('BookingDetail.Publisher', {
                  p: 'Nhan Van Bookstore'
                })}
              </StyledDescMutedText>
              <WhiteSpace size="md" />
              <StyledBodyText>
                Bill Gates, born in Seattle, Washington, in 1955, is an American
                business magnate, investor, philanthropist, and author. In this
                Who Was...? biography, children will learn of Gates' childhood
                passion for computer technology, which led him to revolutionize
                personal computers
              </StyledBodyText>
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
                      this.props.screenProps.changeTheme('dark')
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
              justifyContent: 'center'
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
                <Text style={styles.title}>Book Info</Text>
              </View>
            </View>
          </View>
          <Animated.View style={{ opacity, top: headerHeightInverted }}>
            <FastImage
              style={styles.bookCover}
              resizeMode="stretch"
              source={{
                uri:
                  'https://editorial01.shutterstock.com/wm-preview-1500/10104654b/006d1b09/alita-battle-angel-film-2019-shutterstock-editorial-10104654b.jpg'
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
                uri:
                  'https://editorial01.shutterstock.com/wm-preview-1500/10104654b/006d1b09/alita-battle-angel-film-2019-shutterstock-editorial-10104654b.jpg'
              }}
            />
          </Animated.View>
        </HeaderComponent>
      </StyledContainer>
    )
  }
}
