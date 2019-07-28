/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */
import { NoticeBar, Provider as AntProvider } from '@ant-design/react-native/'
import enUS from '@ant-design/react-native/es/locale-provider/en_US'
import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { ReduxNetworkProvider } from 'react-native-offline'
import { useScreens } from 'react-native-screens'
import { SafeAreaView } from 'react-navigation'
import { Provider, useSelector } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { Persistor } from 'redux-persist/es/types'
import { PersistGate } from 'redux-persist/integration/react'
import { LoadingComponent } from 'shared/components/GlobalLoading'
import AppContainer from 'shared/navigation'
import configStore from 'shared/store/configStore'
import { RootReducer } from 'shared/store/rootReducer'
import { Theme } from 'shared/themes'
import { ThemeProvider } from 'styled-components/native'

// tslint:disable-next-line:react-hooks-nesting
useScreens(false)

// const [store, persist] = configStore()

interface State {
  theme: Theme
  isLoadingPersist: boolean
  storePersist: [Store<PersistPartial, AnyAction>, Persistor]
}

const NetworkNotice = () => {
  const isConnected = useSelector((s: RootReducer) => s.network.isConnected)

  return !isConnected ? <SafeAreaView>
    <NoticeBar mode="closable">
      Lost connection
    </NoticeBar></SafeAreaView> : null
}

export default class App extends React.Component<{}, State> {
  // prefix = /https?:\/\/edds.banvien.com.vn|https?:\/\/www.edds.banvien.com.vn|edds.banvien.com.vn|eddibook:\//
  prefix = 'eddibook://'

  constructor(props: any) {
    super(props)
    this.state = {
      isLoadingPersist: true,
      storePersist: configStore(() => this.setState({ isLoadingPersist: false })),
      theme: Theme.getTheme()
    }
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    // Implment change language
  }

  changeTheme = (themeName: string) => {
    this.setState({ theme: Theme.getTheme(themeName) })
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  render() {
    if (this.state.isLoadingPersist) {
      return null
    }

    const { theme } = this.state
    const [store, persistor] = this.state.storePersist
    return (
      <Provider store={store}>
        <ReduxNetworkProvider pingServerUrl="https://edds.banvien.com.vn" shouldPing={true}>
          <PersistGate loading={null} persistor={persistor}>
            <AntProvider theme={theme} locale={enUS as any}>
              <NetworkNotice/>
              <LoadingComponent/>
              <ThemeProvider theme={theme}>
                <AppContainer
                  uriPrefix={this.prefix}
                  screenProps={{ changeTheme: this.changeTheme, theme }}
                />
              </ThemeProvider>
            </AntProvider>
          </PersistGate>
        </ReduxNetworkProvider>
      </Provider>
    )
  }
}
