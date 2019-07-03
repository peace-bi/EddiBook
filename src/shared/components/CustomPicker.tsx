import { Icon } from '@ant-design/react-native'
import React, { useState } from 'react'
import { Picker, StyleSheet, Text, View, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 48,
    borderColor: '#D3DCE6',
    borderRadius: 9,
    position: 'relative'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  label: {
    flex: 0.8,
    textAlign: 'left',
    paddingLeft: 5,
    fontSize: 15
  },
  logoPostCode: {
    width: 24,
    alignSelf: 'center',
    marginLeft: 10,
    height: 16
  },
  icon: {
    flex: 0.2,
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 8
  },
  picker: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0
  }
})
interface Data {
  label: string
  value: string
}

interface Props {
  data: Data[]
  selectedValue: any
  onValueChange?: (e: any) => void
  onBlur?: (e: any) => void
  style?: ViewStyle
  disabled?: boolean
}

export function CustomSelectBox(props: Props) {
  const [currentValue, setCurrentValue] = useState({} as Data)

  function onValueChange(val: string) {
    const activeData = props.data.find(({ value }) => val === value) as Data
    setCurrentValue(activeData)
    return props.onValueChange && props.onValueChange(val)
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.disabled ? '#E4E6EA' : '#FFF',
        ...props.style
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.label}>{currentValue && currentValue.label}</Text>
        <Icon style={styles.icon} name="caret-down" />
      </View>
      <View style={styles.picker}>
        <Picker
          enabled={!props.disabled}
          mode="dialog"
          selectedValue={props.selectedValue}
          onValueChange={onValueChange}
        >
          {props.data.map((item, key) => (
            <Picker.Item label={item.label} value={item.value} key={key} />
          ))}
        </Picker>
      </View>
    </View>
  )
}
