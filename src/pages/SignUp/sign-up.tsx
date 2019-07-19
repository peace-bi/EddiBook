import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React, { useCallback } from 'react'
import { Alert, KeyboardAvoidingView, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'
import { CustomInput } from 'shared/components/CustomInput'
import { useThunkDispatch } from 'shared/util'

import { SignUp } from './+state/sign-up.effect'
import { SignUpStyles } from './sign-up.constant'
import { SignUpForm } from './sign-up.model'

// import { useNavigation } from 'react-navigation-hooks'
interface FormProps extends SignUpForm {
  confirmPassword: string
}

const SignUpComponent = () => {
  const dispatch = useThunkDispatch()
  const { navigate } = useNavigation()

  const submit = useCallback((values: FormProps) => {
    const { confirmPassword, ...rest } = values
    dispatch(SignUp(rest)).then((response) => {
      if (response.type === 'SIGNUP_FAILED') {
        Alert.alert('Failed to resgister!')
      } else if (response.type === 'SIGNUP_SUCCESS') {
        navigate('AuthenticateMail')
      }
    })
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={SignUpStyles.wrapper}>
        <Formik
          initialValues={{
            email: 'thinh.tran@banvien.com.vn',
            firstName: 'Thinh',
            lastName: 'Tran',
            confirmPassword: '12345678@Xs',
            password: '12345678@Xs'
          }}
          onSubmit={submit}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <Text style={SignUpStyles.title}>
                {Localize.t('SignUp.Title')}
              </Text>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.Email')}
                </Text>
                <CustomInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder={Localize.t('SignUp.EmailPlaceholder')}
                />
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.FirstName')}*
                </Text>
                <CustomInput
                  value={values.firstName}
                  onChangeText={handleChange('firstname')}
                  placeholder={Localize.t('SignUp.FirstNamePlaceholder')}
                />
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.LastName')} *
                </Text>
                <CustomInput
                  value={values.lastName}
                  onChangeText={handleChange('lastname')}
                  placeholder={Localize.t('SignUp.LastNamePlaceholder')}
                />
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.Password')} *
                </Text>
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder={Localize.t('SignUp.PasswordPlaceholder')}
                  valid={true}
                  secureTextEntry={true}
                />
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.ConfirmPassword')} *
                </Text>
                <CustomInput
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder={Localize.t('SignUp.ConfirmPasswordPlaceholder')}
                  secureTextEntry={true}
                />
              </View>
              <View style={SignUpStyles.signUpButtonWrapper}>
                <Button
                  style={SignUpStyles.signUpButton}
                  onPress={handleSubmit}
                >
                  <Text style={SignUpStyles.signUpButtonText}>
                    {Localize.t('SignUp.SignUpButton')}
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
            {Localize.t('SignUp.Policy1')}
          </Text>
          <TouchableWithoutFeedback>
            <Text style={{ ...SignUpStyles.policyText, fontWeight: '600' }}>
              {Localize.t('SignUp.Policy2')}
            </Text>
          </TouchableWithoutFeedback>
          <Text style={SignUpStyles.policyText}>
            {Localize.t('SignUp.Policy3')}{' '}
          </Text>
          <TouchableWithoutFeedback>
            <Text style={{ ...SignUpStyles.policyText, fontWeight: '600' }}>
              {Localize.t('SignUp.Policy4')}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
SignUpComponent.navigationOptions = {
  header: null
}
export default SignUpComponent
