import BookDetail from 'pages/BookDetail/book-detail'
import { BookShelf } from 'pages/BookShelf'
import { ChangePassword } from 'pages/ChangePassword/change-password'
import { Downloaded } from 'pages/Downloaded'
import EditProfile from 'pages/EditProfile/edit-profile'
import More from 'pages/More/more'
import Profile from 'pages/Profile/profile'
import { ViewPDF } from 'pages/ViewPDF'
import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { ThemedBottomTabBar } from 'shared/components'
import { TabType } from 'shared/model'
import { EddiIcon } from 'shared/util'

const Tab = createBottomTabNavigator(
  {
    [TabType.BOOKSHELF]: BookShelf,
    [TabType.DOWNLOADED]: {
      screen: Downloaded,
      path: 'downloaded'
    },
    [TabType.MORE]: {
      screen: More,
      path: 'more'
    }
  },
  {
    tabBarPosition: 'bottom',
    navigationOptions: {
      header: null
    },
    tabBarComponent: ThemedBottomTabBar,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        const IconComponent = EddiIcon
        let iconName
        switch (routeName) {
          case TabType.BOOKSHELF:
            iconName = 'bookshelf'
            break
          case TabType.DOWNLOADED:
            iconName = 'downloaded'
            break
          case TabType.MORE:
            iconName = 'more'
            break
          default:
            iconName = 'bookshelf'
            break
        }

        return (
          <IconComponent
            size={35}
            name={iconName}
            color={tintColor || undefined}
          />
        )
      }
    })
  }
)

const navigation = createStackNavigator(
  {
    Tab: {
      screen: Tab,
      path: 'tab'
    },
    BookDetail: {
      screen: BookDetail,
      path: 'bookdetail/:id'
    },
    EditProfile: {
      screen: EditProfile
    },
    ChangePassword: {
      screen: ChangePassword
    },
    Profile: {
      screen: Profile
    },
    ViewPDF
  },
  {
    initialRouteName: 'Tab'
  }
)

export default createAppContainer(navigation)
