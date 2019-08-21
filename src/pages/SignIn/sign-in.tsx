import { Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik, FormikErrors } from 'formik'
import React, { useCallback, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { compose } from 'redux'
import { CustomInput } from 'shared/components/CustomInput'
import { useThunkDispatch } from 'shared/util'

import { Storage } from 'shared/storage'
import { HideLoading, ShowLoading } from 'shared/store/action'
import { SignInFailed, SignInSuccess } from './+state/sign-in.actions'
import { SignIn } from './+state/sign-in.effect'
import * as Styled from './sign-in.constant'
import { SignInState } from './sign-in.model'

interface FormProps {
  email: string
  password: string
}

const validate = (values: FormProps) => {
  const errors: FormikErrors<FormProps> = {}
  if (!values.email) {
    errors.email = 'Required' // no-i18n
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address' // no-i18n
  }
  if (!values.password) {
    errors.password = 'Required' // no-i18n
  }
  return errors
}
const SignInComponent = () => {
  const [asyncErrorMessage, setAsyncErrorMessage] = useState()
  const store = useSelector((s) => s as SignInState)
  const passwordInput = useRef<CustomInput>(null)
  const dispatch = useThunkDispatch()
  const { navigate } = useNavigation()
  Storage.getInstance().setJwt('')
  const navigateSignUp = useCallback(() => {
    navigate('SignUp')
  }, [])
  const submit = useCallback((values: FormProps) => {
    dispatch(ShowLoading.get())
    dispatch(SignIn(values.email, values.password)).subscribe((result) => {
      if (SignInSuccess.is(result)) {
        const signInResult = result.payload.result
        if (signInResult.usergroup === 'CUSTOMER') {
          navigate('MainStack')
          Storage.getInstance().setJwt(signInResult.access_token)
        } else {
          Modal.alert(
            Localize.t('SignIn.Failed'),
            Localize.t('SignIn.UserNotAllow'),
            [
              {
                text: Localize.t('Common.OK'),
                style: 'cancel'
              }
            ]
          )
        }
      }
      if (SignInFailed.is(result)) {
        if (result.payload.error.error === 'invalid_grant') {
          setAsyncErrorMessage('Invalid user info') // no-i18n
        }
      }
      dispatch(HideLoading.get())
    })
  }, [])

  return (
    <Styled.PageContainer>
      <Styled.PageWrapper>
        <Styled.Title>
          {Localize.t('SignIn.Title')} {store.loggedIn}
        </Styled.Title>
        <Formik
          validate={validate}
          initialValues={{
            email: 'dat.nguyen-huu@banvien.com.vn', // dat.nguyen-huu@banvien.com.vn
            password: '12345678@Xx' // 12345678@Xx
          }}
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
              <Styled.Wrapper>
                <Styled.FieldLabel>
                  {Localize.t('SignIn.EmailTitle')}
                </Styled.FieldLabel>
                <CustomInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder={Localize.t('SignIn.EmailPlaceholder')}
                  returnKeyType={'next'}
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() =>
                    passwordInput.current && passwordInput.current.focus()
                  }
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.email && touched.email ? errors.email : ' '}
                  </Text>
                }
              </Styled.Wrapper>
              <Styled.Wrapper>
                <Styled.FieldLabel>
                  {Localize.t('SignIn.PasswordTitle')}
                </Styled.FieldLabel>
                <CustomInput
                  value={values.password}
                  ref={passwordInput}
                  onChangeText={handleChange('password')}
                  placeholder={Localize.t('SignIn.PasswordPlaceholder')}
                  secureTextEntry={true}
                  onBlur={handleBlur('password')}
                />
                {
                  <Text style={{ color: '#F23F3C' }}>
                    {errors.password && touched.password
                      ? errors.password
                      : ' '}
                  </Text>
                }
              </Styled.Wrapper>
              {
                <Text style={{ color: '#F23F3C', textAlign: 'center' }}>
                  {asyncErrorMessage ? asyncErrorMessage : ' '}
                </Text>
              }
              <Styled.Wrapper>
                <TouchableWithoutFeedback>
                  <Styled.ForgotPasswordText>
                    {Localize.t('SignIn.ForgotPassword')}
                  </Styled.ForgotPasswordText>
                </TouchableWithoutFeedback>
              </Styled.Wrapper>
              <Styled.SignInWrapper>
                <Styled.SignInButton onPress={handleSubmit}>
                  <Styled.SignInButtonText>
                    {Localize.t('SignIn.Button')}
                  </Styled.SignInButtonText>
                </Styled.SignInButton>
              </Styled.SignInWrapper>
            </View>
          )}
        </Formik>
      </Styled.PageWrapper>
      <Styled.SignUpContainer>
        <Styled.SignUpWrapper>
          <Styled.NoAccountText>
            {Localize.t('SignIn.NoAccount')}
          </Styled.NoAccountText>
          <TouchableWithoutFeedback onPress={navigateSignUp}>
            <Styled.SignUpText>
              {Localize.t('SignIn.NavSignUp')}
            </Styled.SignUpText>
          </TouchableWithoutFeedback>
        </Styled.SignUpWrapper>
      </Styled.SignUpContainer>
    </Styled.PageContainer>
  )
}
SignInComponent.navigationOptions = {
  header: null
}
const enhancer = compose()

export default enhancer(SignInComponent)
