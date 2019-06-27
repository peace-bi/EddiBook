import { Button } from '@ant-design/react-native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { compose } from 'redux'
import { CustomInput } from 'shared/components/CustomInput'

import { Localize } from 'core/localize'
import { SignUpStyles } from './sign-up.constant'

const tResolver = (path: string): string => `SignUp$${path}`

interface Props extends NavigationScreenProps<any> {}

interface State {}

class SignUpComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })

  constructor(props: Props) {
    super(props)
    this.navigateAuthenticateMail = this.navigateAuthenticateMail.bind(this)
  }

  navigateAuthenticateMail() {
    this.props.navigation.navigate('AuthenticateMail')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={SignUpStyles.wrapper}>
          <Text style={SignUpStyles.title}>
            {Localize.t(tResolver('Title'))}
          </Text>
          <View style={SignUpStyles.fieldWrapper}>
            <Text style={SignUpStyles.label}>
              {Localize.t(tResolver('Email'))}
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('EmailPlaceholder'))}
            />
          </View>
          <View style={SignUpStyles.fieldWrapper}>
            <Text style={SignUpStyles.label}>
              {Localize.t(tResolver('FirstName'))}*
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('FirstNamePlaceholder'))}
            />
          </View>
          <View style={SignUpStyles.fieldWrapper}>
            <Text style={SignUpStyles.label}>
              {Localize.t(tResolver('LastName'))} *
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('LastNamePlaceholder'))}
            />
          </View>
          <View style={SignUpStyles.fieldWrapper}>
            <Text style={SignUpStyles.label}>
              {Localize.t(tResolver('Password'))} *
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('PasswordPlaceholder'))}
              valid={true}
              secureTextEntry={true}
            />
          </View>
          <View style={SignUpStyles.fieldWrapper}>
            <Text style={SignUpStyles.label}>
              {Localize.t(tResolver('ConfirmPassword'))} *
            </Text>
            <CustomInput
              placeholder={Localize.t(tResolver('ConfirmPasswordPlaceholder'))}
              secureTextEntry={true}
            />
          </View>
          <View style={SignUpStyles.signUpButtonWrapper}>
            <Button
              style={SignUpStyles.signUpButton}
              onPress={this.navigateAuthenticateMail}
            >
              <Text style={SignUpStyles.signUpButtonText}>
                {Localize.t(tResolver('SignUpButton'))}
              </Text>
            </Button>
          </View>
        </View>
        <View style={SignUpStyles.policyContainer}>
          <View style={SignUpStyles.policyWrapper}>
            <Text style={SignUpStyles.policyText}>
              {Localize.t(tResolver('Policy1'))}
            </Text>
            <TouchableWithoutFeedback>
              <Text style={{ ...SignUpStyles.policyText, fontWeight: '600' }}>
                {Localize.t(tResolver('Policy2'))}
              </Text>
            </TouchableWithoutFeedback>
            <Text style={SignUpStyles.policyText}>
              {Localize.t(tResolver('Policy3'))}{' '}
            </Text>
            <TouchableWithoutFeedback>
              <Text style={{ ...SignUpStyles.policyText, fontWeight: '600' }}>
                {Localize.t(tResolver('Policy4'))}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const enhancer = compose()

export default enhancer(SignUpComponent)
