import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React from 'react'
import {
  Alert,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { compose } from 'redux'
import { CustomInput } from 'shared/components/CustomInput'
import { SignInStyles } from './sign-in.constant'

const tResolver = (path: string): string => `SignIn$${path}`

interface Props extends NavigationScreenProps<any> {}

interface State {}

interface FormProps {
  email: string
  password: string
}
class SignInComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })

  constructor(props: Props) {
    super(props)
    this.navigateSignUp = this.navigateSignUp.bind(this)
    this.submit = this.submit.bind(this)
  }

  navigateSignUp() {
    this.props.navigation.navigate('SignUp')
  }

  submit(values: FormProps) {
    Alert.alert(JSON.stringify(values, null, 2))
    Keyboard.dismiss()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={SignInStyles.wrapper}>
          <Text style={SignInStyles.title}>
            {Localize.t(tResolver('Title'))}
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={this.submit}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <View style={SignInStyles.fieldWrapper}>
                  <Text style={SignInStyles.label}>
                    {Localize.t(tResolver('EmailTitle'))}
                  </Text>
                  <CustomInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder={Localize.t(tResolver('EmailPlaceholder'))}
                  />
                </View>
                <View style={SignInStyles.fieldWrapper}>
                  <Text style={SignInStyles.label}>
                    {Localize.t(tResolver('PasswordTitle'))}
                  </Text>
                  <CustomInput
                    value={values.password}
                    onChangeText={handleChange('password')}
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
                  <Button
                    style={SignInStyles.signInButton}
                    onPress={handleSubmit}
                  >
                    <Text style={SignInStyles.signInButtonText}>
                      {Localize.t(tResolver('Button'))}
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
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
