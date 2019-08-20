import { Button, Icon } from '@ant-design/react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Header } from 'react-navigation'
import { CustomInput } from 'shared/components'
import { listCountry as countries } from 'shared/util'
import styled from 'styled-components/native'

import { PhoneCodePicker } from './+component/phone-code-picker'

export const listCountry = countries.map((c) => ({
  label: c.name,
  value: c.countryId.toString(),
  phoneCode: c.phoneCode || 'N/A'
}))

const HeaderWrapper = styled.View`
  height: ${Header.HEIGHT};
  border-bottom-width: 1;
  border-bottom-color: #bdbdbd;
  flex-direction: row;
`
const BackButtonWrapper = styled.View`
  justify-content: center;
  flex: 0.3;
`

const BackButton = styled(Button).attrs(() => ({
  activeStyle: { backgroundColor: 'transparent' }
}))`
  border-width: 0;
  align-self: flex-start;
  background-color: transparent;
`

const BackButtonIcon = styled(Icon).attrs(() => ({
  name: 'close'
}))`
  color: #888;
`

const TitleWrapper = styled.View`
  justify-content: center;
  flex: 0.4;
`
const Title = styled.View`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`
const ContentWrapper = styled.View`
  max-width: 350px;
  width: 100%;
  padding-bottom: 50px;
  align-self: center;
`

const AvatarContainer = styled.View`
  align-self: center;
  margin-top: 16px;
  position: relative;
`
const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 120px;
`
const AvatarOverlayContainer = styled.View`
  width: 120px;
  height: 120px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

const AvatarOverlay = styled(LinearGradient).attrs(() => ({
  colors: ['rgba(0,0,0,0)', 'rgba(0,0,0,.8)'],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 }
}))`
  width: 120px;
  height: 60px;
  position: absolute;
  top: 60px;
  left: 0;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
`
const AvatarEditContainer = styled.View`
  justify-content: center;
  flex: 1;
`
const AvatarEditText = styled.Text`
  color: #fff;
  text-align: center;
`
const Field = styled.View`
  margin-top: 20px;
  justify-content: space-between;
`
const Label = styled.Text`
  color: #43484b;
  font-size: 13;
  margin-bottom: 4px;
`

const PhoneNumberWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const RegionCodePicker = styled(PhoneCodePicker).attrs(() => ({
  disabled: true
}))`
  flex: 0.35;
`

const PhoneNumberInput = styled(CustomInput)`
  flex: 0.6;
`

const SaveButtonWrapper = styled.View`
  margin-top: 38px;
  margin-bottom: 10px;
`

const SaveButton = styled(Button)`
  background-color: #f23f3c;
`

const SaveButtonText = styled.Text`
  color: #fff;
`

const PickerContainer = styled.View`
  border-width: 1;
  height: 48px;
  border-color: #d3dce6;
  border-radius: 9px;
  position: relative;
  background-color: ${(props: any) => (props.disabled ? '#ccc' : '#fff')};
`

const PickerField = styled.View`
  flex: 1;
  flex-direction: row;
`
const PickerText = styled.Text`
  flex: 1;
  align-self: center;
  font-size: 15;
  padding-left: 16;
`
const PickerIcon = styled(Icon).attrs(() => ({
  name: 'caret-down'
}))`
  width: 50;
  justify-content: flex-end;
  text-align: center;
  align-self: center;
`
export const Styled = {
  HeaderWrapper,
  BackButtonWrapper,
  BackButton,
  BackButtonIcon,
  TitleWrapper,
  Title,
  ContentWrapper,
  Avatar,
  AvatarContainer,
  AvatarOverlay,
  AvatarOverlayContainer,
  AvatarEditContainer,
  AvatarEditText,
  Field,
  Label,
  PhoneNumberWrapper,
  RegionCodePicker,
  PhoneNumberInput,
  SaveButtonWrapper,
  SaveButton,
  SaveButtonText,
  PickerContainer,
  PickerField,
  PickerText,
  PickerIcon
}
