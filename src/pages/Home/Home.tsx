import { Button, Icon, TabBar, Toast } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { useState } from 'react'
import { View } from 'react-native'
import {
  NavigationRoute,
  NavigationScreenProp,
  NavigationStateRoute
} from 'react-navigation'
import { useNavigation, useNavigationState } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { TabType } from './+model'

const StyledView = styled.View`
  background-color: papayawhip;
`

const StyledText = styled.Text`
  color: palevioletred;
`

const StyledButton = styled(Button)``

export function Home() {
  const [selectedTab, setSelectedTab] = useState(TabType.BOOKSHELF)
  const [count, setCount] = useState(0)
  const navigationState = useNavigationState() as NavigationStateRoute<void>
  const navigation: NavigationScreenProp<NavigationRoute> = useNavigation()

  const onSelectedTab = (tabName: TabType) => {
    navigation.setParams({
      title: Localize.t(tabName)
    })
    setSelectedTab(tabName)
  }

  return (
    <TabBar>
      <TabBar.Item
        title={Localize.t(TabType.BOOKSHELF)}
        selected={selectedTab === TabType.BOOKSHELF}
        onPress={() => onSelectedTab(TabType.BOOKSHELF)}
        icon={<Icon name="home" />}
      >
        <View>
          <StyledView>
            <StyledText>{`Hello Bi: ${navigationState.routeName} ${count}`}</StyledText>
          </StyledView>
          <StyledButton
            type="primary"
            onPress={() => {
              Toast.info(`Increase count to ${count + 1}`)
              return setCount((prev) => {
                const newCount = prev + 1
                return newCount
              })
            }}
          >
            Start
          </StyledButton>
        </View>
      </TabBar.Item>
      <TabBar.Item
        title={Localize.t(TabType.DOWNLOADED)}
        selected={selectedTab === TabType.DOWNLOADED}
        onPress={() => onSelectedTab(TabType.DOWNLOADED)}
        icon={<Icon name="ordered-list" />}
      >
        <StyledView>
          <StyledText>Tab 2</StyledText>
        </StyledView>
      </TabBar.Item>
      <TabBar.Item
        title={Localize.t(TabType.MORE)}
        selected={selectedTab === TabType.MORE}
        onPress={() => onSelectedTab(TabType.MORE)}
        icon={<Icon name="ellipsis" />}
      >
        <StyledView>
          <StyledText>Tab 3</StyledText>
        </StyledView>
      </TabBar.Item>
    </TabBar>
  )
}

Home.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<NavigationRoute>
}) => ({
  title: navigation.getParam('title', Localize.t(TabType.BOOKSHELF))
})
