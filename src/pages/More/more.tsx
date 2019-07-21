import { List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import React, { useCallback } from 'react'
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
            uri: 'https://i.ytimg.com/vi/iI1wXOAGD5c/maxresdefault.jpg'
          }}
        />
      </Styled.Wrapper>
      <Styled.UserInfo>
        <TouchableWithoutFeedback onPressIn={() => navigate('Profile')}>
          <Styled.AvatarContainer>
            <Styled.Avatar
              source={{
                uri:
                  // tslint:disable-next-line: max-line-length
                  'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/44750653_1291983287610702_7531437320625455104_n.jpg?_nc_cat=108&_nc_eui2=AeEu-AoCMrc-oB4sTLrczjMCBW7_6oyXHXhs1StDLMjyw9arGIdAB2mZ-1REtvMcRElkdYzv_228BTIgD3KD0b8gYk4VXJ0Q33LRGNI__4j2qA&_nc_oc=AQktT7ZP4s9ZEXQA3Lj8vS_6Y-i1IznCdd9k3mL6EyN-CsU9XcSVfsSIREQ03r67gT8&_nc_ht=scontent.fsgn8-1.fna&oh=a6bc1d8303393c3f9b13ffe103cddcd4&oe=5D83E77B'
              }}
            />
          </Styled.AvatarContainer>
          <Styled.InfoContact>
            <Styled.UserName>Linh Penta 5/20/0</Styled.UserName>
            <Styled.UserEmail>linh.nguyen9xxx@gmail.com</Styled.UserEmail>
          </Styled.InfoContact>
        </TouchableWithoutFeedback>
      </Styled.UserInfo>
      <List style={{ marginTop: 54 }}>
        <Item
          onPressIn={() => navigate('EditProfile')}
          thumb={<Styled.ListIcon name="change-password" />}
          arrow={'horizontal'}
        >
          {Localize.t('More.ChangePassword')}
        </Item>
        <Item
          onPressIn={() => navigate('EditProfile')}
          thumb={<Styled.ListIcon name="settings" />}
          arrow={'horizontal'}
        >
          {Localize.t('More.Settings')}
        </Item>
        <Styled.Divider />
        <Item
          onPressIn={() => navigate('EditProfile')}
          thumb={<Styled.ListIcon name="privacy" />}
          arrow={'horizontal'}
        >
          {Localize.t('More.PrivacyPolicy')}
        </Item>
        <Item
          onPressIn={() => navigate('EditProfile')}
          thumb={<Styled.ListIcon name="info" />}
          arrow={'horizontal'}
        >
          {Localize.t('More.AboutUs')}
        </Item>
        <Item
          onPressIn={() => navigate('EditProfile')}
          thumb={<Styled.ListIcon name="term" />}
          arrow={'horizontal'}
        >
          {Localize.t('More.TermsConditions')}
        </Item>
        <Styled.Divider />
        <Item
          onPressIn={signOut}
          thumb={<Styled.ListIcon name="logout" />}
          arrow={'horizontal'}
        >
          {Localize.t('More.Logout')}
        </Item>
      </List>
    </Styled.Container>
  )
}

More.navigationOptions = () => ({
  tabBarLabel: Localize.t(TabType.MORE)
})
