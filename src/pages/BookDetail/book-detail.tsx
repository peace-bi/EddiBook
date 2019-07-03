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

import { Button, Icon, WhiteSpace, WingBlank } from '@ant-design/react-native'
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

const StyledCategoryGrey = styled(StyledCategory)`
  background-color: #f2f3f5;
  font-size: 10px;
`

const StyledDivider = styled.View`
  height: 10;
  background-color: ${(props) => props.theme.divider_color}
  margin-top: 20px;
  margin-bottom: 20px;
`

export default class BookDetail extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })
  scrollY = new Animated.Value(0)

  constructor(props: Props) {
    super(props)
  }

  render() {
    const headerHeightExtended = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 1.25],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    const opacity = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.contentWrapper}>
          <ScrollView
            overScrollMode="always"
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <FastImage
              style={styles.bookCover}
              resizeMode="stretch"
              source={{
                uri:
                  'https://editorial01.shutterstock.com/wm-preview-1500/10104654b/006d1b09/alita-battle-angel-film-2019-shutterstock-editorial-10104654b.jpg'
              }}
            />
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
                  Download
                </Button>
              </StyledView>
              <WhiteSpace />
              <WhiteSpace />
              <WhiteSpace />
              <StyledHorizontalView alignItems="center">
                <StyledTitleText>Intro</StyledTitleText>
                <StyledCategoryGrey>Kiếm hiệp Kim Dung</StyledCategoryGrey>
              </StyledHorizontalView>
              <WhiteSpace size="lg" />
              <WhiteSpace size="xs" />
              <>
                <StyledHorizontalView alignItems="center" py-0={true}>
                  <StyledDescMutedText>
                    Expiry date: 6/30/2019
                  </StyledDescMutedText>
                  <StyledDescMutedText>Size: 150 MB</StyledDescMutedText>
                </StyledHorizontalView>
                <WhiteSpace size="xs" />
                <StyledDescMutedText>
                  Publisher: Nhan Van Bookstore
                </StyledDescMutedText>
                <WhiteSpace size="md" />
                <StyledBodyText>
                  Bill Gates, born in Seattle, Washington, in 1955, is an
                  American business magnate, investor, philanthropist, and
                  author. In this Who Was...? biography, children will learn of
                  Gates' childhood passion for computer technology, which led
                  him to revolutionize personal computers
                </StyledBodyText>
              </>
            </WingBlank>
            <StyledDivider />
            <WhiteSpace size="md" />
            <WingBlank>
              <StyledHorizontalView alignItems="center">
                <StyledTitleText>Intro</StyledTitleText>
                <TouchableWithoutFeedback
                  onPress={() => {
                    // console.log(Theme.currentTheme)
                  }}
                >
                  <StyledTouchableText>View All</StyledTouchableText>
                </TouchableWithoutFeedback>
              </StyledHorizontalView>
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />
          </ScrollView>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9
          }}
        >
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
                >
                  <Icon name="left" style={styles.backButtonIcon} />
                </Button>
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>Book Info</Text>
              </View>
            </View>
          </View>
        </View>
        <Animated.View
          style={{
            ...styles.backgroundCover,
            borderBottomLeftRadius: headerHeightExtended,
            borderBottomRightRadius: headerHeightExtended,
            height: headerHeightExtended
          }}
        >
          <Animated.View
            style={{
              zIndex: 0,
              height: '100%',
              position: 'absolute',
              backgroundColor: '#F23F3C',
              width: '100%'
            }}
          />
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
        </Animated.View>
      </View>
    )
  }
}
