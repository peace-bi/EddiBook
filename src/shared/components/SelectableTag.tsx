import React, { useCallback, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components/native'

const TextStyle = styled.Text`
  padding: 4px 8px;
`

const ViewStyle = styled.View`
  align-self: flex-start;
  border-radius: 16px;
  margin: 4px;
`

interface Props {
  children: string
  onChange?: (isSelected: boolean) => void
}

export const SelectableTag = (props: Props) => {
  const { children, onChange } = props
  const [checked, setChecked] = useState(false)
  const { getScreenProps } = useNavigation()
  const theme = getScreenProps().theme
  const handleClick = useCallback(() => {
    const afterCheck = !checked

    setChecked(afterCheck)
    if (onChange) {
      onChange(afterCheck)
    }

  }, [checked])

  return <TouchableWithoutFeedback onPress={handleClick}>
    <ViewStyle style={checked ? { backgroundColor: theme.tag_container_selected_color } : { backgroundColor: theme.tag_container_color }}>
      <TextStyle style={checked ? { color: theme.tag_text_selected_color } : {color: theme.tag_text_color}}>{children}</TextStyle>
    </ViewStyle>
  </TouchableWithoutFeedback>
}
