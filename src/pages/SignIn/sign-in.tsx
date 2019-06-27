import { Button } from '@ant-design/react-native'
import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { compose } from 'redux'
import { CustomInput } from 'shared/components/CustomInput'

import { Localize } from 'core/localize'
import { SignInStyles } from './sign-in.constant'

const tResolver = (path: string): string => `SignIn$${path}`

interface Props extends NavigationScreenProps<any> {}

interface State {}

class SignInComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })

  constructor(props: Props) {
    super(props)
    this.navigateSignUp = this.navigateSignUp.bind(this)
  }

  navigateSignUp() {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={SignInStyles.wrapper}>
          <Text style={SignInStyles.title}>
            {Localize.t(tResolver('Title'))}
          </Text>
          <View style={SignInStyles.fieldWrapper}>
            <Text style={SignInStyles.label}>
              {Localize.t(tResolver('EmailTitle'))}
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('EmailPlaceholder'))}
            />
          </View>
          <View style={SignInStyles.fieldWrapper}>
            <Text style={SignInStyles.label}>
              {Localize.t(tResolver('PasswordTitle'))}
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('PasswordPlaceholder'))}
              secureTextEntry={true}
            />
          </View>
          <View style={SignInStyles.fieldWrapper}>
            <TouchableWithoutFeedback>
              <Text style={SignInStyles.forgotPasswordText}>
                {Localize.t(tResolver('ForgotPassword'))}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={SignInStyles.signInButtonWrapper}>
            <Button style={SignInStyles.signInButton}>
              <Text style={SignInStyles.signInButtonText}>
                {Localize.t(tResolver('Button'))}
              </Text>
            </Button>
          </View>
        </View>
        <View style={SignInStyles.noAccountContainer}>
          <View style={SignInStyles.noAccountWrapper}>
            <Text>{Localize.t(tResolver('NoAccount'))}</Text>
            <TouchableWithoutFeedback onPress={this.navigateSignUp}>
              <Text style={SignInStyles.signUpButtonText}>
                {Localize.t(tResolver('NavSignUp'))}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const enhancer = compose()

export default enhancer(SignInComponent)
