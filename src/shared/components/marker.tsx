import React from 'react'
import { Text, View } from 'react-native'

interface Props {
  size: number
  textSize: number
  color?: string
  subColor?: string
  textColor?: string
}

export function BookMarker(props: Props) {
  const { size, textSize, color, subColor, textColor } = props
  return (
    <View
      style={{
        alignSelf: 'center',
        top: (size * Math.sqrt(2) - size) / 2,
        width: size,
        height: size,
        overflow: 'hidden',
        borderTopEndRadius: size / 5
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          transform: [
            {
              rotate: '45deg'
            }
          ]
        }}
      >
        <View
          style={{
            alignSelf: 'center',
            position: 'relative'
          }}
        >
          <Text
            style={{
              textTransform: 'uppercase',
              color: textColor || '#fff',
              position: 'absolute',
              textAlign: 'center',
              zIndex: 6,
              top: (size / 4) * Math.sqrt(2) - size / 4,
              left: 0,
              width: size,
              alignSelf: 'center',
              fontSize: textSize
            }}
          >
            New
          </Text>
          <View
            style={{
              position: 'relative',
              width: size,
              height: size,
              overflow: 'hidden',
              alignSelf: 'center',
              transform: [
                {
                  rotate: '-45deg'
                }
              ]
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                zIndex: 5,
                position: 'absolute',
                borderRightWidth: size / 2,
                borderRightColor: color || 'red',
                borderTopWidth: size / 2,
                borderTopColor: color || 'red',
                borderLeftWidth: size / 2,
                borderLeftColor: 'transparent',
                borderBottomWidth: size / 2,
                borderBottomColor: 'transparent'
              }}
            />
            <View
              style={{
                backgroundColor: subColor || '#a00',
                width: size,
                height: size / 10,
                zIndex: 3
              }}
            />
            <View
              style={{
                backgroundColor: subColor || '#a00',
                width: size / 10,
                position: 'absolute',
                top: 0,
                left: 0.9 * size,
                height: size,
                zIndex: 3
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
