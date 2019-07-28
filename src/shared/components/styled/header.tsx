import styled from 'styled-components/native'

export const StyledHeader = styled.View`
  height: 64px;
  background-color: ${(props) => props.theme.header_color};
  width: 100%;
`
export const StyledHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.color_text_caption};
`

export const StyledHeaderSafeView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.header_color};
`
