import styled from 'styled-components/native'

export const StyledTitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color_text_caption};
`

export const StyledDescText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.color_text_paragraph};
`

export const StyledDescMutedText = styled(StyledDescText)`
  color: ${(props) => props.theme.color_text_muted};
`

export const StyledBodyText = styled.Text`
  color: ${(props) => props.theme.color_text_base};
`
