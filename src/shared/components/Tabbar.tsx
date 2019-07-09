import React from 'react'
import { BottomTabBar } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'

export const ThemedBottomTabBar = (props: any) => {
  const navigation = useNavigation()
  const { theme } = navigation.getScreenProps()

  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.active_tint_color}
      inactiveTintColor={theme.inactive_tint_color}
    />
  )
}
