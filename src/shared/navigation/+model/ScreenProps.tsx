import { NavigationScreenProp } from 'react-navigation'
import { DefaultTheme } from 'styled-components/native'

export interface ScreenProps {
  changeTheme: (name?: string) => any
  theme: Partial<DefaultTheme>
}

export interface NavigationScreenPropExtend<S> extends NavigationScreenProp<S> {
  getScreenProps: () => ScreenProps
}
