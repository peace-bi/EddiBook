/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */
import { Provider as AntProvider } from '@ant-design/react-native'
import AuthenticateMail from 'pages/AuthenticateMail/authenticate-mail'
import ForgotPassword from 'pages/ForgotPassword/forgot-password'
import { Home } from 'pages/Home'
import ResetPassword from 'pages/ResetPassword/reset-password'
import SignIn from 'pages/SignIn/sign-in'
import SignUp from 'pages/SignUp/sign-up'
import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { useScreens } from 'react-native-screens'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import configStore from 'shared/store/configStore'

// tslint:disable-next-line:react-hooks-nesting
useScreens()

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Home',
        headerBackTitle: 'A much too long text for back button from B to A',
        headerTruncatedBackTitle: 'to A'
      })
    },
    SignIn: {
      screen: SignIn
    },
    SignUp: {
      screen: SignUp
    },
    AuthenticateMail: {
      screen: AuthenticateMail
    },
    ForgotPassword: {
      screen: ForgotPassword
    },
    ResetPassword: {
      screen: ResetPassword
    }
  },
  {
    initialRouteName: 'SignUp',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      // title: 'Nancy',
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)
const AppContainer = createAppContainer(AppNavigator)
const store = configStore()

interface State {
  theme: any
  currentTheme: any
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentTheme: null,
      theme: null
    }
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    // Implment change language
  }

  changeTheme = (theme: any, currentTheme: any) => {
    this.setState({ theme, currentTheme })
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  render() {
    const { theme, currentTheme } = this.state
    return (
      <Provider store={store}>
        <AntProvider theme={theme}>
          <AppContainer
            screenProps={{ changeTheme: this.changeTheme, currentTheme }}
          />
        </AntProvider>
      </Provider>
    )
  }
}
