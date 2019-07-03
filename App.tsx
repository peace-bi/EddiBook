/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */
import { Provider as AntProvider } from '@ant-design/react-native/'
import enUS from '@ant-design/react-native/es/locale-provider/en_US'
import AuthenticateMail from 'pages/AuthenticateMail/authenticate-mail'
import BookDetail from 'pages/BookDetail/book-detail'
import EditProfile from 'pages/EditProfile/edit-profile'
import ForgotPassword from 'pages/ForgotPassword/forgot-password'
import { Home } from 'pages/Home'
import Profile from 'pages/Profile/profile'
import ResetPassword from 'pages/ResetPassword/reset-password'
import SignIn from 'pages/SignIn/sign-in'
import SignUp from 'pages/SignUp/sign-up'
import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { useScreens } from 'react-native-screens'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import configStore from 'shared/store/configStore'
import { Theme } from 'shared/themes'
import { ThemeProvider } from 'styled-components/native'

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
    },
    BookDetail: {
      screen: BookDetail
    },
    EditProfile: {
      screen: EditProfile
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: 'BookDetail',
    /* The header config from HomeScreen is now here */
    headerLayoutPreset: 'center',
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
  theme: Theme
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      theme: Theme.getTheme()
    }
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    // Implment change language
  }

  changeTheme = (themeName: string) => {
    this.setState({ theme: Theme.getTheme(themeName) })
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  render() {
    const { theme } = this.state
    return (
      <Provider store={store}>
        <AntProvider theme={theme} locale={enUS as any}>
          <ThemeProvider theme={theme}>
            <AppContainer
              screenProps={{ changeTheme: this.changeTheme, theme }}
            />
          </ThemeProvider>
        </AntProvider>
      </Provider>
    )
  }
}
