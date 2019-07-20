import { SearchBar } from '@ant-design/react-native'
import { Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Icon } from 'react-native-vector-icons/Icon'
import { Ribbon, StyledHeader, StyledHeaderSafeView } from 'shared/components'
import { EddiIcon } from 'shared/util'
import { DefaultTheme, ThemedStyledProps } from 'styled-components'
import styled, { css } from 'styled-components/native'

export const StatusBar = styled.StatusBar.attrs(() => ({
  backgroundColor: 'white'
}))``

export const HeaderSafeView = styled(StyledHeaderSafeView)`
  background-color: white;
  flex: 1;
`
export const Search = styled(SearchBar)`
  border: 0;
`

export const Header = styled(StyledHeader)`
  flex-direction: row;
  background-color: #f2f3f5;
`

export const ItemContainer = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
`

export const ItemBodyContent = styled.View`
  flex: 1;
  padding-left: 16px;
`

// prettier-ignore
export const StatusContainer = styled.View`
  position: absolute;
  right: -3;
  top: -10;
  ${Platform.select({
    ios: css`
      zIndex: 999;
    `,
    android: css`
      elevation: 999;
    `
  })};
`

export const MutedText = styled.Text`
  color: ${(props) => props.theme.color_text_muted};
  margin-top: 8px;
  font-size: 12px;
`

export const TitleText = styled.Text`
  height: 40px;
  color: #4f4f4f;
  font-size: 16px;
  font-weight: bold;
`

export const PdfImage = styled(FastImage)`
  width: 95px;
  height: 150px;
  margin-top: -30;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`

export const HeaderActionIcon = styled(EddiIcon).attrs(
  (
    props: ThemedStyledProps<Icon & React.RefAttributes<Icon>, DefaultTheme>
  ) => ({
    color: props.theme.primary_color
  })
)`
  align-self: center;
`

export const HeaderActionContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.container_background_color};
  height: 44px;
  padding-right: 8px;
  padding-left: 4px;
`

export const StatusRibbon = styled(Ribbon)``
