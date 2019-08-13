import { ActivityIndicator, List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { RootReducer } from 'shared/store/rootReducer'

import * as Styled from './profile.constant'

function ProfileComponent() {
  const { navigate, goBack } = useNavigation()
  const profile = useSelector((s: RootReducer) => s.ProfileState.profile)

  return profile ? (
    <SafeAreaView>
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
                uri: profile.userProfile.avatar
              }}
            />
          </Styled.AvatarViewContainer>
          <Styled.UserInfoContainer>
            <Styled.UserName>{`${profile.userProfile.firstName} ${profile.userProfile.lastName}`}</Styled.UserName>
            <Styled.UserEmail>{profile.username}</Styled.UserEmail>
          </Styled.UserInfoContainer>
          <List style={{ marginTop: 54 }}>
            <Item
              thumb={<Styled.Icon name="mobile" />}
            >{`(${profile.userProfile.address.country.phoneCode}) ${profile.userProfile.phone}`}</Item>
            <Item thumb={<Styled.Icon name="location" />}>
              {profile.userProfile.address.streetOne}
            </Item>
            <Item thumb={<Styled.Icon name="flag" />}>
              {profile.userProfile.address.country.name}
            </Item>
          </List>
        </View>
      </Styled.PageContainer>
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  )
}

ProfileComponent.navigationOptions = {
  header: null
}
export default ProfileComponent
