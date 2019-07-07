import { Button } from '@ant-design/react-native'
import FastImage from 'react-native-fast-image'
import { Header } from 'react-navigation'
import { EddiIcon } from 'shared/util'
import styled from 'styled-components/native'

export const PageContainer = styled.View`
  flex: 1;
`
export const PageWrapper = styled.View`
  height: ${Header.HEIGHT};
  border-bottom-width: 1;
  border-bottom-color: #bdbdbd;
  flex-direction: row;
`
export const BackButtonWrapper = styled.View`
  justify-content: center;
  flex: 0.3;
`
export const BackButton = styled(Button).attrs((/* props */) => ({
  activeStyle: {
    backgroundColor: 'transparent'
  }
}))`
  border-width: 0;
  align-self: flex-start;
  background-color: transparent;
`

export const BackIcon = styled(EddiIcon).attrs(() => ({
  color: '#888',
  name: 'chevron-left',
  size: 24
}))``

export const TitleWrapper = styled.View`
  justify-content: center;
  flex: 0.4;
`
export const TitleText = styled.Text`
  text-align: center;
  font-size: 20;
  font-weight: 600;
`

export const EditWrapper = styled.View`
  justify-content: flex-end;
  flex: 0.3;
`

export const EditButton = styled(Button).attrs((/* props */) => ({
  activeStyle: {
    backgroundColor: 'transparent'
  }
}))`
  border-width: 0;
  align-self: flex-end;
  background-color: transparent;
`

export const EditIcon = styled(EddiIcon).attrs((/* {theme } */) => ({
  size: 30,
  backgroundColor: 'transparent',
  selectionColor: 'transparent',
  color: '#F23F3C',
  name: 'pen'
}))`
  align-self: flex-end;
  background-color: transparent;
`

export const AvatarViewContainer = styled.View`
  align-self: center;
  margin-top: 16;
  position: relative;
`
export const UserAvatar = styled(FastImage)`
  width: 120;
  height: 120;
  border-radius: 120;
`

export const UserInfoContainer = styled.View`
  align-self: center;
  margin-top: 16;
`

export const UserName = styled.Text`
  text-align: center;
  color: #333;
  font-weight: 600;
`
export const UserEmail = styled.Text`
  text-align: center;
  color: #828282;
  font-weight: 600;
`
export const Icon = styled(EddiIcon).attrs(({}) => ({
  color: '#F23F3C',
  size: 30
}))`
  padding-right: 12px;
`
