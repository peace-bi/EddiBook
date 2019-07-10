import { SearchBar } from '@ant-design/react-native'
import { StyledHeader, StyledHeaderSafeView } from 'shared/components'
import styled from 'styled-components/native'

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
  background-color: #f2f3f5;
`
