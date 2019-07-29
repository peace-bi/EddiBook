import { List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'
import { TabType } from 'shared/model'
import { Storage } from 'shared/storage'

import * as Styled from './more.constant'

export default function More() {
  const { navigate } = useNavigation()

  const signOut = useCallback(() => {
    Storage.getInstance().setJwt('')
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
                  'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
              }}
            />
          </Styled.AvatarContainer>
          <Styled.InfoContact>
            <Styled.UserName>User</Styled.UserName>
            <Styled.UserEmail>user@gmail.com</Styled.UserEmail>
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
            onPress={() => navigate('EditProfile')}
            thumb={<Styled.ListIcon name="change-password" />}
            arrow={'horizontal'}
          >
            {Localize.t('More.ChangePassword')}
          </Item>
          <Item
            onPress={() => navigate('EditProfile')}
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
