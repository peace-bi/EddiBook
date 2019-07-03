import styled from 'styled-components/native'

export const StyledTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`

export const StyledDescText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.description_color};
`

export const StyledDescMutedText = styled(StyledDescText)`
  color: ${(props) => props.theme.muted_color};
`

export const StyledBodyText = styled.Text`
  color: ${(props) => props.theme.text_color};
`
