import { Icon } from '@ant-design/react-native'
import React from 'react'
import { Image, Picker, Text, View, ViewStyle } from 'react-native'

import { phoneCodePickerStyles as styles } from '../edit-profile.constant'

interface MCountry {
  countryId: number
  name: string
  code: string
  postCode: string
  flag: string
}

interface Props {
  listCountry: MCountry[]
  selectedValue: any
  onValueChange?: (e: any) => void
  onBlur?: (e: any) => void
  style?: ViewStyle
  disabled?: boolean
}

export function PhoneCodePicker(props: Props) {
  const selectedCountry = props.listCountry.find(
    (country) => country.postCode === props.selectedValue
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
        <View style={{ flex: 0.4, justifyContent: 'flex-start' }}>
          <Image
            style={{ ...styles.logoPostCode }}
            source={{
              uri:
                selectedCountry && selectedCountry.flag
                  ? selectedCountry.flag
                  : 'https://cdn3.iconfinder.com/data/icons/action-states-vol-3-flat/48/Action___States_-_Vol._3-29-512.png'
            }}
          />
        </View>

        <Text
          style={{ flex: 0.4, textAlign: 'left', paddingLeft: 5, fontSize: 15 }}
        >
          {selectedCountry && selectedCountry.postCode}
        </Text>
        <Icon
          style={{ flex: 0.2, justifyContent: 'flex-end', paddingRight: 8 }}
          name="caret-down"
        />
      </View>
      <View style={styles.picker}>
        <Picker
          enabled={!props.disabled}
          mode="dialog"
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
        >
          {props.listCountry.map((item, key) => (
            <Picker.Item
              label={item.postCode}
              value={item.postCode}
              key={key}
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}
