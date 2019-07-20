import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Dimensions, Keyboard } from 'react-native'
import { useSelector } from 'react-redux'
import { RootReducer } from 'shared/store/rootReducer'

export const LoadingComponent = () => {
  const fade = useRef(new Animated.Value(0)).current
  const zIndexDelay = useRef(new Animated.Value(0)).current
  const { showLoading } = useSelector((s: RootReducer) => s.AppState)
  useEffect(() => {
    if (showLoading) {
      Keyboard.dismiss()
      Animated.timing(zIndexDelay, {
        toValue: 9
      }).start()
      Animated.timing(fade, {
        toValue: 1,
        duration: 300
      }).start()
    } else {
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(zIndexDelay, {
          toValue: -9
        })
      ]).start()
    }
  }, [showLoading])
  return (
    <Animated.View
      style={{
        zIndex: zIndexDelay,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        opacity: fade,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center'
      }}
    >
      <ActivityIndicator size="large" />
    </Animated.View>
  )
}
