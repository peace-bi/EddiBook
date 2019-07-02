import styled from 'styled-components/native'

export const StyledStatus = styled.StatusBar.attrs((props) => ({
  barStyle: 'light-content',
  backgroundColor: props.theme.header_color
}))``
