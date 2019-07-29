import { Button, Icon } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { CustomInput } from 'shared/components/CustomInput'

import { forgotPasswordStyles as styles } from './reset-password.constant'

interface Props extends NavigationScreenProps<any> {}

interface State {}

export default class ResetPassword extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: (
      <View>
        <Icon
          style={{ padding: 18, color: '#888888', fontSize: 24 }}
          name="close"
        />
      </View>
    )
  })

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{Localize.t('ResetPassword.Title')}</Text>
          <View style={styles.content}>
            <Text>{Localize.t('ResetPassword.Content')} </Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>
              {Localize.t('ResetPassword.PasswordLabel')} *
            </Text>
            <CustomInput
              placeholder={Localize.t('ResetPassword.PasswordPlaceholder')}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>
              {Localize.t('ResetPassword.ConfirmPasswordLabel')} *
            </Text>
            <CustomInput
              placeholder={Localize.t(
                'ResetPassword.ConfirmPasswordPlaceholder'
              )}
            />
          </View>
          <Button style={styles.sendButton}>
            <Text style={styles.sendButtonText}>
              {Localize.t('ResetPassword.SaveButton')}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    )
  }
}
