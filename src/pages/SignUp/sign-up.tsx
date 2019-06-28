import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React from 'react'
import { Alert, Keyboard, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { compose } from 'redux'
import { CustomInput } from 'shared/components/CustomInput'

import { SignUpStyles } from './sign-up.constant'

const tResolver = (path: string): string => `SignUp$${path}`

interface Props extends NavigationScreenProps<any> {}

interface State {}

interface FormProps {
  email: string
  firstname: string
  lastname: string
  password: string
  confirmPassword: string
}

class SignUpComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })

  constructor(props: Props) {
    super(props)
    this.navigateAuthenticateMail = this.navigateAuthenticateMail.bind(this)
    this.submit = this.submit.bind(this)
  }

  navigateAuthenticateMail() {
    this.props.navigation.navigate('AuthenticateMail')
  }
  submit(values: FormProps) {
    Alert.alert(JSON.stringify(values, null, 2))
    Keyboard.dismiss()
    this.navigateAuthenticateMail()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={SignUpStyles.wrapper}>
          <Formik
            initialValues={{
              email: '',
              firstname: '',
              lastname: '',
              confirmPassword: '',
              password: ''
            }}
            onSubmit={this.submit}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <Text style={SignUpStyles.title}>
                  {Localize.t(tResolver('Title'))}
                </Text>
                <View style={SignUpStyles.fieldWrapper}>
                  <Text style={SignUpStyles.label}>
                    {Localize.t(tResolver('Email'))}
                  </Text>
                  <CustomInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder={Localize.t(tResolver('EmailPlaceholder'))}
                  />
                </View>
                <View style={SignUpStyles.fieldWrapper}>
                  <Text style={SignUpStyles.label}>
                    {Localize.t(tResolver('FirstName'))}*
                  </Text>
                  <CustomInput
                    value={values.firstname}
                    onChangeText={handleChange('firstname')}
                    placeholder={Localize.t(tResolver('FirstNamePlaceholder'))}
                  />
                </View>
                <View style={SignUpStyles.fieldWrapper}>
                  <Text style={SignUpStyles.label}>
                    {Localize.t(tResolver('LastName'))} *
                  </Text>
                  <CustomInput
                    value={values.lastname}
                    onChangeText={handleChange('lastname')}
                    placeholder={Localize.t(tResolver('LastNamePlaceholder'))}
                  />
                </View>
                <View style={SignUpStyles.fieldWrapper}>
                  <Text style={SignUpStyles.label}>
                    {Localize.t(tResolver('Password'))} *
                  </Text>
                  <CustomInput
                    value={values.password}
                    onChangeText={handleChange('password')}
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
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder={Localize.t(
                      tResolver('ConfirmPasswordPlaceholder')
                    )}
                    secureTextEntry={true}
                  />
                </View>
                <View style={SignUpStyles.signUpButtonWrapper}>
                  <Button
                    style={SignUpStyles.signUpButton}
                    onPress={handleSubmit}
                  >
                    <Text style={SignUpStyles.signUpButtonText}>
                      {Localize.t(tResolver('SignUpButton'))}
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
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
