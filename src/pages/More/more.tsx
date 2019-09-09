import { List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import { GetProfile } from 'pages/Profile/+state/profile.effect'
import React, { useCallback, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { TabType } from 'shared/model'
import { Storage } from 'shared/storage'
import { RootReducer } from 'shared/store/rootReducer'
import { useThunkDispatch } from 'shared/util'

import * as Styled from './more.constant'

export default function More() {
  const { navigate } = useNavigation()

  const profile = useSelector((s: RootReducer) => s.ProfileState.profile)
  const dispatch = useThunkDispatch()
  useEffect(() => {
    dispatch(GetProfile()).subscribe()
  }, [])

  const signOut = useCallback(() => {
    Storage.getInstance().removeToken()
    navigate('AuthStack')
  }, [])

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Background
          source={{
            uri:
              'https://png.pngtree.com/thumb_back/fw800/back_pic/00/08/53/17562a43dac4e41.jpg'
          }}
        />
      </Styled.Wrapper>
      <Styled.UserInfo>
        <TouchableWithoutFeedback onPress={() => navigate('Profile')}>
          <Styled.AvatarContainer>
            <Styled.Avatar
              source={{
                uri:
                  profile && profile.userProfile
                    ? profile.userProfile.avatar
                    : 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
              }}
            />
          </Styled.AvatarContainer>
          <Styled.InfoContact>
            <Styled.UserName>
              {profile && profile.userProfile
                ? `${profile.userProfile.firstName} ${profile.userProfile.lastName}`
                : ''}
            </Styled.UserName>
            <Styled.UserEmail>{profile && profile.username}</Styled.UserEmail>
          </Styled.InfoContact>
        </TouchableWithoutFeedback>
      </Styled.UserInfo>
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List style={{ marginTop: 54 }}>
          <Item
            onPress={() => navigate('ChangePassword')}
            thumb={<Styled.ListIcon name="change-password" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.ChangePassword')}
          </Item>
          <Item
            onPress={() => navigate('Settings')}
            thumb={<Styled.ListIcon name="settings" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.Settings')}
          </Item>
          <Styled.Divider />
          <Item
            onPress={() => navigate('EditProfile')}
            thumb={<Styled.ListIcon name="privacy" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.PrivacyPolicy')}
          </Item>
          <Item
            onPress={() => navigate('EditProfile')}
            thumb={<Styled.ListIcon name="info" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.AboutUs')}
          </Item>
          <Item
            onPress={() => navigate('EditProfile')}
            thumb={<Styled.ListIcon name="term" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.TermsConditions')}
          </Item>
          <Styled.Divider />
          <Item
            onPress={signOut}
            thumb={<Styled.ListIcon name="logout" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.Logout')}
          </Item>
        </List>
      </ScrollView>
    </Styled.Container>
  )
}

More.navigationOptions = () => ({
  tabBarLabel: Localize.t(TabType.MORE)
})
