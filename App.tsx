/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */
import { Provider as AntProvider } from '@ant-design/react-native/'
import enUS from '@ant-design/react-native/es/locale-provider/en_US'
import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import AppContainer from 'shared/navigation'
import configStore from 'shared/store/configStore'
import { Theme } from 'shared/themes'
import { ThemeProvider } from 'styled-components/native'

// tslint:disable-next-line:react-hooks-nesting
useScreens()

const store = configStore()

interface State {
  theme: Theme
}

export default class App extends React.Component<{}, State> {
  // prefix = /https?:\/\/edds.banvien.com.vn|https?:\/\/www.edds.banvien.com.vn|edds.banvien.com.vn|eddibook:\//
  prefix = 'eddibook://'

  constructor(props: any) {
    super(props)
    this.state = {
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
    const { theme } = this.state
    return (
      <Provider store={store}>
        <AntProvider theme={theme} locale={enUS as any}>
          <ThemeProvider theme={theme}>
            <AppContainer
              uriPrefix={this.prefix}
              screenProps={{ changeTheme: this.changeTheme, theme }}
            />
          </ThemeProvider>
        </AntProvider>
      </Provider>
    )
  }
}
