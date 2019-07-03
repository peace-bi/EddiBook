import React from 'react'
import { Animated, StatusBar, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Header, NavigationScreenProps, ScrollView } from 'react-navigation'

import { Button, Icon } from '@ant-design/react-native'
import { styles } from './book-detail.constant'

const HEADER_MAX_HEIGHT = 300
const HEADER_MIN_HEIGHT = Header.HEIGHT + (StatusBar.currentHeight || 0)
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

interface Props extends NavigationScreenProps<any> {}

interface State {}

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
              resizeMode="contain"
              source={{
                uri:
                  'https://editorial01.shutterstock.com/wm-preview-1500/10104654b/006d1b09/alita-battle-angel-film-2019-shutterstock-editorial-10104654b.jpg'
              }}
            />
            <View>
              <View style={{ height: 300 }} />
              <View style={{ height: 300 }} />
              <View style={{ height: 300 }} />
              <View style={{ height: 300 }} />
              <View style={{ height: 300 }} />
              <View style={{ height: 300 }} />
            </View>
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
          <View style={{ height: StatusBar.currentHeight }} />
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
