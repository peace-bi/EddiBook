import { Theme } from '@ant-design/react-native/lib/style'
import { NavigationScreenProp } from 'react-navigation'

interface ScreenProps {
  changeTheme: (name?: string) => any
  theme: Partial<Theme>
}

export interface NavigationScreenPropExtend<S> extends NavigationScreenProp<S> {
  getScreenProps: () => ScreenProps
}
