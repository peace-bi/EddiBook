import { List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import React from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import * as Styled from './profile.constant'

// tslint:disable-next-line: max-line-length
const mockAvatar =
  'https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/14/a0/51/14a05155-d7ae-e3ff-4c8e-a50c17dd3d5a/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg'
function Profile() {
  const { navigate, goBack } = useNavigation()
  return (
    <Styled.PageContainer>
      <Styled.PageWrapper>
        <Styled.BackButtonWrapper>
          <Styled.BackButton onPressIn={() => goBack(null)}>
            <Styled.BackIcon />
          </Styled.BackButton>
        </Styled.BackButtonWrapper>
        <Styled.TitleWrapper>
          <Styled.TitleText>{Localize.t('Profile.Title')}</Styled.TitleText>
        </Styled.TitleWrapper>
        <Styled.EditWrapper>
          <Styled.EditButton onPressIn={() => navigate('EditProfile')}>
            <Styled.EditIcon />
          </Styled.EditButton>
        </Styled.EditWrapper>
      </Styled.PageWrapper>
      <View>
        <Styled.AvatarViewContainer>
          <Styled.UserAvatar
            source={{
              uri: mockAvatar
            }}
          />
        </Styled.AvatarViewContainer>
        <Styled.UserInfoContainer>
          <Styled.UserName>Linh Feeder</Styled.UserName>
          <Styled.UserEmail>linh.nguyen9xxx@gmail.com</Styled.UserEmail>
        </Styled.UserInfoContainer>
        <List style={{ marginTop: 54 }}>
          <Item thumb={<Styled.Icon name="mobile" />}>(+84) 77 948 1368</Item>
          <Item thumb={<Styled.Icon name="location" />}>
            12, Ton Dan Street, Ward 13, District 4, HCM
          </Item>
          <Item thumb={<Styled.Icon name="flag" />}>Đất nước Gia Lai</Item>
        </List>
      </View>
    </Styled.PageContainer>
  )
}

Profile.navigationOptions = {
  header: null
}
export default Profile
