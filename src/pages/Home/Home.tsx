/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { DocumentView, RNPdftron } from 'react-native-pdftron'

interface Props {}
interface State {
  permissionGranted: boolean
}
export class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      permissionGranted: Platform.OS === 'ios' ? true : false
    }

    RNPdftron.initialize('')
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestStoragePermission()
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          permissionGranted: true
        })
        console.info('Storage permission granted')
      } else {
        this.setState({
          permissionGranted: false
        })
        console.info('Storage permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  onLeadingNavButtonPressed = () => {
    console.info('leading nav button pressed')
    if (Platform.OS === 'ios') {
      Alert.alert(
        'App',
        'onLeadingNavButtonPressed',
        [{ text: 'OK', onPress: () => console.info('OK Pressed') }],
        { cancelable: true }
      )
    } else {
      BackHandler.exitApp()
    }
  }

  render() {
    if (!this.state.permissionGranted) {
      return (
        <View style={styles.container}>
          <Text>Storage permission required.</Text>
        </View>
      )
    }

    const path = 'sample'

    return (
      <DocumentView
        document={path}
        showLeadingNavButton={true}
        leadingNavButtonIcon={
          Platform.OS === 'ios'
            ? 'ic_close_black_24px.png'
            : 'ic_arrow_back_white_24dp'
        }
        onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
