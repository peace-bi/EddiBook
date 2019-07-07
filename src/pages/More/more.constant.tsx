import { Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { EddiIcon } from 'shared/util'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  height: 100%;
  width: 140%;
  left: -20%;
  top: -80%;
  position: absolute;
  border-bottom-left-radius: 500;
  justify-content: flex-end;
  overflow: hidden;
  border-bottom-right-radius: 500;
`
export const Container = styled.View`
  flex: 1;
`

export const Background = styled(FastImage)`
  height: 160px;
  align-self: center;
  width: ${Dimensions.get('window').width};
`

export const UserInfo = styled.View`
  margin-top: 75;
`

export const AvatarContainer = styled.View`
  align-self: center;
  position: relative;
`

export const Avatar = styled(FastImage)`
  width: 120px;
  elevation: 3;
  height: 120px;
  border-radius: 120;
`

export const InfoContact = styled.View`
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
`

export const Divider = styled.View`
  height: 10px;
  background-color: #f2f3f5;
`

export const ListIcon = styled(EddiIcon).attrs(() => ({
  size: 30,
  backgroundColor: 'transparent',
  color: '#F23F3C'
}))`
  padding-right: 12;
`
