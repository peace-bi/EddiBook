import React from 'react'
import { Animated, Image, ImageBackground, StatusBar, View } from 'react-native'
import { NavigationScreenProps, ScrollView } from 'react-navigation'
import { styles } from './book-detail.constant'
const HEADER_MAX_HEIGHT = 300
const HEADER_MIN_HEIGHT = 0
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
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.contentWrapper}>
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <Image
              style={styles.bookCover}
              resizeMode="contain"
              source={{
                uri:
                  'http://www.creativindie.com/wp-content/uploads/2013/10/Enchantment-Book-Cover-Best-Seller1.jpg'
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
        <Animated.View
          style={{
            ...styles.backgroundCover,
            borderBottomLeftRadius: headerHeight,
            borderBottomRightRadius: headerHeight
          }}
        >
          <ImageBackground
            style={styles.backgroundCoverImg}
            resizeMode="cover"
            source={{
              uri:
                'http://www.creativindie.com/wp-content/uploads/2013/10/Enchantment-Book-Cover-Best-Seller1.jpg'
            }}
          />
        </Animated.View>
      </View>
    )
  }
}
