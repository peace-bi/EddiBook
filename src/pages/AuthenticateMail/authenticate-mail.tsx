import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 350,
    width: '100%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 60,
    textAlign: 'center'
  },
  content: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  email: {
    color: '#1E8EEB'
  },
  signInButton: {
    backgroundColor: '#F23F3C',
    marginTop: 60
  },
  signInButtonText: {
    color: '#fff'
  },
  resendEmailButton: {
    borderWidth: 0,
    alignSelf: 'center',
    marginTop: 22
  },
  resendEmailButtonText: {
    color: '#F23F3C'
  }
})

interface Props extends NavigationScreenProps<any> {}

interface State {}

export default class AuthenticateMail extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null
  })

  constructor(props: Props) {
    super(props)
    this.navigateSignIn = this.navigateSignIn.bind(this)
  }

  navigateSignIn() {
    this.props.navigation.navigate('SignIn')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            {Localize.t('AuthenticateMail.Title')}
          </Text>
          <View style={styles.content}>
            <Text>{Localize.t('AuthenticateMail.Content1')} </Text>
            <TouchableWithoutFeedback>
              <Text style={styles.email}>test@gmail.com.</Text>
            </TouchableWithoutFeedback>
            <Text>{Localize.t('AuthenticateMail.Content2')}</Text>
          </View>
          <Button style={styles.signInButton} onPress={this.navigateSignIn}>
            <Text style={styles.signInButtonText}>
              {Localize.t('AuthenticateMail.SignIn')}
            </Text>
          </Button>
          <Button style={styles.resendEmailButton}>
            <Text style={styles.resendEmailButtonText}>
              {Localize.t('AuthenticateMail.ResendEmail')}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    )
  }
}
