import AuthenticateMail from 'pages/AuthenticateMail/authenticate-mail'
import ForgotPassword from 'pages/ForgotPassword/forgot-password'
import ResetPassword from 'pages/ResetPassword/reset-password'
import SignIn from 'pages/SignIn/sign-in'
import SignUp from 'pages/SignUp/sign-up'
import { createAppContainer, createStackNavigator } from 'react-navigation'

const navigation = createStackNavigator(
  {
    SignIn,
    SignUp,
    ResetPassword,
    AuthenticateMail,
    ForgotPassword
  },
  {
    initialRouteName: 'SignIn'
  }
)

export default createAppContainer(navigation)
