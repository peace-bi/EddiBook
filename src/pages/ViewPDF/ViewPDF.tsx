/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { DocumentView, RNPdftron } from 'react-native-pdftron'
// import RNPdfTronUtils from 'react-native-pdftron-utils'
import { NavigationScreenProps } from 'react-navigation'

interface Props extends NavigationScreenProps<any> {}
interface State {
  permissionGranted: boolean
}
export class ViewPDF extends Component<Props, State> {
  static navigationOptions = {
    header:
      Platform.OS === 'android' ? (
        <View style={{ height: 20, backgroundColor: 'blue' }}></View>
      ) : null
  }

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
    // const path: string = this.props.navigation.getParam('url')
    // console.info('leading nav button pressed')
    // RNPdfTronUtils.exportAnnotations(
    //   path
    // ).then(() => {
    //   // console.log('url', url)
    // })

    // BackHandler.exitApp()
    this.props.navigation.goBack()
  }

  render() {
    if (!this.state.permissionGranted) {
      return (
        <View style={styles.container}>
          <Text>Storage permission required.</Text>
        </View>
      )
    }

    const path: string = this.props.navigation.getParam('url')

    return (
      <>
        <StatusBar translucent={true} backgroundColor="blue" />
        <SafeAreaView></SafeAreaView>
        <DocumentView
          document={path}
          showLeadingNavButton={true}
          leadingNavButtonIcon={
            Platform.OS === 'ios'
              ? 'ic_close_black_24px.png'
              : 'ic_arrow_back_white_24dp'
          }
          onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
          customHeaders={{ Foo: '1234' }}
        />
      </>
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
