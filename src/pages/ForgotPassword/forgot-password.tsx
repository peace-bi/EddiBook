import { Button, Icon } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { CustomInput } from 'shared/components/CustomInput'

import { forgotPasswordStyles as styles } from './forgot-password.constant'

const tResolver = (path: string): string => `ForgotPassword$${path}`

interface Props extends NavigationScreenProps<any> {}

interface State {}

export default class ForgotPassword extends React.Component<Props, State> {
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
          <Text style={styles.title}>{Localize.t(tResolver('Title'))}</Text>
          <View style={styles.content}>
            <Text>{Localize.t(tResolver('Content'))} </Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>
              {Localize.t(tResolver('EmailLabel'))}
            </Text>
            <CustomInput
              valid={(text) =>
                text.length > 0
                  ? !!text.match(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim)
                  : undefined
              }
              keyboardType="email-address"
              placeholder={Localize.t(tResolver('EmailPlaceholder'))}
            />
          </View>
          <Button style={styles.sendButton}>
            <Text style={styles.sendButtonText}>
              {Localize.t(tResolver('SendButton'))}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    )
  }
}
