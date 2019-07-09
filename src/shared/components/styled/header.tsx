import styled from 'styled-components/native'

export const StyledHeader = styled.View`
  height: 64px;
  background-color: ${(props) => props.theme.header_color};
  width: 100%;
`

export const StyledHeaderSafeView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.header_color};
`
