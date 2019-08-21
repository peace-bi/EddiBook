import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React, { useCallback, useRef } from 'react'
import { Alert, Text, View } from 'react-native'
import { CustomInput } from 'shared/components/CustomInput'
import { useThunkDispatch } from 'shared/util'

import { useNavigation } from 'react-navigation-hooks'
import { HideLoading, ShowLoading } from 'shared/store/action'
import { ChangePasswordFailed, ChangePasswordSuccess } from './+state/change-password.actions'
import { ChangePasswordRequest } from './+state/change-password.effect'
import { styles } from './change-password.constant'

interface FormProps {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePasswordComponent = () => {
  const { goBack } = useNavigation()
  const newPasswordInput = useRef<CustomInput>(null)
  const confirmPasswordInput = useRef<CustomInput>(null)
  const dispatch = useThunkDispatch()
  const submit = useCallback((values: FormProps) => {
    dispatch(ShowLoading.get())
    dispatch(
      ChangePasswordRequest(values.currentPassword, values.newPassword)
    ).subscribe((result) => {
      if (ChangePasswordSuccess.is(result)) {
        dispatch(HideLoading.get())
        Alert.alert('Success!')
        goBack(null)
      }
      if (ChangePasswordFailed.is(result)) {
        dispatch(HideLoading.get())
        Alert.alert('Failed, please try again!')
      }
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <Formik
          onSubmit={submit}
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <View>
              <View style={styles.wrapper}>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('ChangePassword.CurrentPassword')}
                  </Text>
                  <CustomInput
                    secureTextEntry={true}
                    value={values.currentPassword}
                    onChangeText={handleChange('currentPassword')}
                    returnKeyType={'next'}
                    onBlur={handleBlur('email')}
                    onSubmitEditing={() =>
                      newPasswordInput.current &&
                      newPasswordInput.current.focus()
                    }
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('ChangePassword.NewPassword')}
                  </Text>
                  <CustomInput
                    secureTextEntry={true}
                    value={values.newPassword}
                    ref={newPasswordInput}
                    onChangeText={handleChange('newPassword')}
                    returnKeyType={'next'}
                    onBlur={handleBlur('email')}
                    onSubmitEditing={() =>
                      confirmPasswordInput.current &&
                      confirmPasswordInput.current.focus()
                    }
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('ChangePassword.ConfirmPassword')}
                  </Text>
                  <CustomInput
                    secureTextEntry={true}
                    value={values.confirmPassword}
                    ref={confirmPasswordInput}
                    onChangeText={handleChange('confirmPassword')}
                  />
                </View>
                <View style={styles.saveButtonWrapper}>
                  <Button style={styles.saveButton} onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>
                      {Localize.t('ChangePassword.SaveButton')}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

ChangePasswordComponent.navigationOptions = {
  headerTitle: Localize.t('ChangePassword.Title')
}

export const ChangePassword = ChangePasswordComponent
