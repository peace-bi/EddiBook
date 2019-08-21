import { Icon } from '@ant-design/react-native'
import React from 'react'
import { Picker, Text, View, ViewStyle } from 'react-native'

interface MCountry {
  value: string
  phoneCode: string
}

interface Props {
  listCountry: MCountry[]
  selectedValue: number
  onValueChange?: (e: any) => void
  onBlur?: (e: any) => void
  style?: ViewStyle
  disabled?: boolean
}

export function PhoneCodePicker(props: Props) {
  const selectedCountry = props.listCountry.find(
    (country) => country.value === props.selectedValue.toString()
  )
  return (
    <View
      style={{
        borderWidth: 1,
        height: 48,
        borderColor: '#D3DCE6',
        borderRadius: 9,
        position: 'relative',
        backgroundColor: props.disabled ? '#E4E6EA' : '#FFF',
        ...props.style
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text
          style={{
            flex: 0.6,
            textAlign: 'right',
            paddingLeft: 5,
            fontSize: 15
          }}
        >
          {selectedCountry && selectedCountry.phoneCode}
        </Text>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'flex-end',
            paddingRight: 8
          }}
        >
          <Icon name="caret-down" style={{ textAlign: 'right' }} />
        </View>
      </View>
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          backgroundColor: 'white',
          opacity: 0
        }}
      >
        <Picker
          enabled={!props.disabled}
          mode="dialog"
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
        >
          {props.listCountry.map((item, key) => (
            <Picker.Item label={item.phoneCode} value={item.value} key={key} />
          ))}
        </Picker>
      </View>
    </View>
  )
}
