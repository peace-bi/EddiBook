import { Button, Toast } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { useState } from 'react'
import { View } from 'react-native'
import { NavigationStateRoute } from 'react-navigation'
import { useNavigationState } from 'react-navigation-hooks'
import styled from 'styled-components/native'

const StyledView = styled.View`
  background-color: papayawhip;
`

const StyledText = styled.Text`
  color: palevioletred;
`

const StyledButton = styled(Button)``

export function Home() {
  const [count, setCount] = useState(0)
  const navigationState = useNavigationState() as NavigationStateRoute<void>

  return (
    <View>
      <StyledView>
        <StyledText>{`${Localize.t('hello')} Bi: ${
          navigationState.routeName
        } ${count}`}</StyledText>
      </StyledView>
      <StyledButton
        type="primary"
        onPress={() => {
          setCount((prev) => {
            const newCount = prev + 1
            Toast.info(`Increase count to ${newCount}`)
            return newCount
          })
        }}
      >
        Start
      </StyledButton>
    </View>
  )
}
