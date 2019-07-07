import { Button, Icon, TabBar } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { BookShelf } from 'pages/BookShelf'
import React, { useState } from 'react'
import { NavigationRoute, NavigationScreenProp } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'
import { NavigationScreenPropExtend } from 'shared/navigation'
import styled from 'styled-components/native'
import { TabType } from './+model'
import { HomeHeader } from './Header'

const StyledView = styled.View`
  background-color: papayawhip;
`

const StyledText = styled.Text`
  color: palevioletred;
`

export function Home() {
  const [selectedTab, setSelectedTab] = useState(TabType.BOOKSHELF)
  // const [count, setCount] = useState(0)
  // const navigationState = useNavigationState() as NavigationStateRoute<void>
  const navigation: NavigationScreenPropExtend<
    NavigationRoute
  > = useNavigation()
  const screenProps = navigation.getScreenProps()

  const onSelectedTab = (tabName: TabType) => {
    navigation.setParams({
      title: Localize.t(tabName),
      tabType: tabName
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
        <BookShelf />
      </TabBar.Item>
      <TabBar.Item
        title={Localize.t(TabType.DOWNLOADED)}
        selected={selectedTab === TabType.DOWNLOADED}
        onPress={() => onSelectedTab(TabType.DOWNLOADED)}
        icon={<Icon name="ordered-list" />}
      >
        <StyledView>
          <Button
            type="primary"
            onPress={() => screenProps.changeTheme('dark')}
          >
            Hello
          </Button>
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
  header: <HomeHeader {...navigation} />
  // headerStyle: { height: 64, backgroundColor: 'blue' }
})
