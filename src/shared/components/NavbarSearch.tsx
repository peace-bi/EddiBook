import { SearchBar } from '@ant-design/react-native'
import { TabType } from 'pages/Home/+model'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { NavigationRoute, NavigationScreenProp } from 'react-navigation'

export const NavbarSearch = (props: NavigationScreenProp<NavigationRoute>) => {
  const title = props.getParam('title', 'Home')
  const tabType = props.getParam('tabType', TabType.BOOKSHELF)

  let contentView = <SearchBar defaultValue={title} placeholder="Thinh Tiet" />

  if (tabType !== TabType.BOOKSHELF) {
    contentView = <Text>{title}</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{contentView}</View>
    </SafeAreaView>
  )
}
