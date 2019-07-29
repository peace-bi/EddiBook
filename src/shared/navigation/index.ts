import { AuthLoading } from 'pages/AuthLoading'
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationRoute
} from 'react-navigation'
import { NavigationScreenPropExtend } from './+model'
import AuthStack from './auth'
import MainStack from './main'

const navigation = createSwitchNavigator(
  {
    AuthLoading,
    AuthStack,
    MainStack: {
      screen: MainStack,
      path: 'main'
    }
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default createAppContainer(navigation)
export * from './+model'

declare module 'react-navigation-hooks' {
  function useNavigation<
    S extends NavigationRoute
  >(): NavigationScreenPropExtend<S>
}
