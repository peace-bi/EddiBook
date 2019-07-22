import { List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import React from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import * as Styled from './profile.constant'

// tslint:disable-next-line: max-line-length
const mockAvatar =
  'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
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
          <Styled.UserName>User</Styled.UserName>
          <Styled.UserEmail>user@gmail.com</Styled.UserEmail>
        </Styled.UserInfoContainer>
        <List style={{ marginTop: 54 }}>
          <Item thumb={<Styled.Icon name="mobile" />}>(+84) x xxx xxxx</Item>
          <Item thumb={<Styled.Icon name="location" />}>
            12, Ton Dan Street, Ward 13, District 4, HCM
          </Item>
          <Item thumb={<Styled.Icon name="flag" />}>N/A</Item>
        </List>
      </View>
    </Styled.PageContainer>
  )
}

Profile.navigationOptions = {
  header: null
}
export default Profile
