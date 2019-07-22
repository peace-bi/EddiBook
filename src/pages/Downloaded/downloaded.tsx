import { Localize } from 'core/localize'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TabType } from 'shared/model'

export const Downloaded = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Downloaded</Text>
      </View>
    </SafeAreaView>
  )
}

Downloaded.navigationOptions = () => ({
  tabBarLabel: Localize.t(TabType.DOWNLOADED)
})
