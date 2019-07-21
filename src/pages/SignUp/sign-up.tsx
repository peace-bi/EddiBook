import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React, { useCallback, useRef } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'
import { CustomInput } from 'shared/components/CustomInput'
import { HideLoading, ShowLoading } from 'shared/store/action'
import { useThunkDispatch } from 'shared/util'

import { SignUp } from './+state/sign-up.effect'
import { SignUpStyles } from './sign-up.constant'
import { SignUpForm } from './sign-up.model'

interface FormProps extends SignUpForm {
  confirmPassword: string
}
type FormError = {
  [s in keyof FormProps]?: string
}
const validate = (values: FormProps) => {
  const errors: FormError = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,64}$/i.test(values.password)
  ) {
    errors.password = 'Not match'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Not match'
  }
  return errors
}
const SignUpComponent = () => {
  const firstNameInput = useRef<CustomInput>(null)
  const lastNameInput = useRef<CustomInput>(null)
  const passwordInput = useRef<CustomInput>(null)
  const confirmPasswordInput = useRef<CustomInput>(null)
  const dispatch = useThunkDispatch()
  const { navigate } = useNavigation()

  const submit = useCallback((values: FormProps) => {
    const { confirmPassword, ...rest } = values
    dispatch(ShowLoading.get())
    dispatch(SignUp(rest)).then((response) => {
      dispatch(HideLoading.get())
      if (response.type === 'SIGNUP_FAILED') {
        Alert.alert('Failed to resgister!')
      } else if (response.type === 'SIGNUP_SUCCESS') {
        navigate('AuthenticateMail')
      }
    })
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1
      }}
    >
      <View style={SignUpStyles.wrapper}>
        <Formik
          initialValues={{
            email: 'tietthinh@gmail.com',
            firstName: 'Thinh',
            lastName: 'Tran',
            confirmPassword: '12345678@Xa',
            password: '12345678@Xa'
          }}
          validate={validate}
          onSubmit={submit}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched
          }) => (
            <View>
              <Text style={SignUpStyles.title}>
                {Localize.t('SignUp.Title')}
              </Text>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.Email')}
                  {touched.email}
                </Text>
                <CustomInput
                  value={values.email}
                  returnKeyType={'next'}
                  autoFocus={true}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() =>
                    firstNameInput.current && firstNameInput.current.focus()
                  }
                  placeholder={Localize.t('SignUp.EmailPlaceholder')}
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.email && touched.email ? errors.email : ' '}
                  </Text>
                }
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.FirstName')}*
                </Text>
                <CustomInput
                  value={values.firstName}
                  returnKeyType={'next'}
                  ref={firstNameInput}
                  onSubmitEditing={() =>
                    lastNameInput.current && lastNameInput.current.focus()
                  }
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder={Localize.t('SignUp.FirstNamePlaceholder')}
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.firstName && touched.firstName
                      ? errors.firstName
                      : ' '}
                  </Text>
                }
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.LastName')} *
                </Text>
                <CustomInput
                  value={values.lastName}
                  ref={lastNameInput}
                  returnKeyType={'next'}
                  onSubmitEditing={() =>
                    passwordInput.current && passwordInput.current.focus()
                  }
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder={Localize.t('SignUp.LastNamePlaceholder')}
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.lastName && touched.lastName
                      ? errors.lastName
                      : ' '}
                  </Text>
                }
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.Password')} *
                </Text>
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  ref={passwordInput}
                  returnKeyType={'next'}
                  onSubmitEditing={() =>
                    confirmPasswordInput.current &&
                    confirmPasswordInput.current.focus()
                  }
                  onBlur={handleBlur('password')}
                  placeholder={Localize.t('SignUp.PasswordPlaceholder')}
                  valid={true}
                  secureTextEntry={true}
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.password && touched.password
                      ? errors.password
                      : ' '}
                  </Text>
                }
              </View>
              <View style={SignUpStyles.fieldWrapper}>
                <Text style={SignUpStyles.label}>
                  {Localize.t('SignUp.ConfirmPassword')} *
                </Text>
                <CustomInput
                  value={values.confirmPassword}
                  ref={confirmPasswordInput}
                  returnKeyType={'next'}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={Localize.t('SignUp.ConfirmPasswordPlaceholder')}
                  secureTextEntry={true}
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ' '}
                  </Text>
                }
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
    </ScrollView>
  )
}
SignUpComponent.navigationOptions = {
  header: null
}
export default SignUpComponent
