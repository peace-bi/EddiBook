import { SearchBar } from '@ant-design/react-native'
import { TabType } from 'pages/Home/+model'
import React from 'react'
import { Text } from 'react-native'
import { NavigationRoute, NavigationScreenProp } from 'react-navigation'
import { StyledStatus } from 'shared/components'
import styled from 'styled-components/native'

const StyledHeader = styled.View`
  height: 64px;
  background-color: ${(props) => props.theme.header_color};
  width: 100%;
`

const StyledSafeView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.header_color};
`

export const HomeHeader = (props: NavigationScreenProp<NavigationRoute>) => {
  const title = props.getParam('title', 'Home')
  const tabType = props.getParam('tabType', TabType.BOOKSHELF)

  let contentView = <SearchBar defaultValue={title} placeholder="Thinh Tiet" />

  if (tabType !== TabType.BOOKSHELF) {
    contentView = <Text>{title}</Text>
  }

  return (
    <StyledSafeView>
      <StyledStatus />
      <StyledHeader>{contentView}</StyledHeader>
    </StyledSafeView>
  )
}
