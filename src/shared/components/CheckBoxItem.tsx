import { List } from '@ant-design/react-native'
import React, { useRef } from 'react'
import { CheckBox } from 'shared/components/CheckBox'

interface Props {
  children?: any
  onToggle?: (isChecked: boolean) => void
  checked?: boolean
}

export const CheckBoxItem = (props: Props) => {
  const { children, onToggle, checked } = props
  const checkBoxRef = useRef<any>(null)
  const toggleCheckBox = () => {
    const ref = checkBoxRef.current
    if (ref) {
      ref.toggle()
    }
  }

  return (
    <List.Item
      onPress={toggleCheckBox}
      thumb={
        <CheckBox
          checked={checked}
          ref={checkBoxRef}
          onChange={(event) => {
            if (onToggle) {
              onToggle(event.target.checked)
            }
          }}
        />
      }
    >
      {children}
    </List.Item>
  )
}
