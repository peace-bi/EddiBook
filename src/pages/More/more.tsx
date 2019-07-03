import { Icon, List } from '@ant-design/react-native'
import Item from '@ant-design/react-native/lib/list/ListItem'
import { Localize } from 'core/localize'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { MoreStyles as styles } from './more.constant'
export default function More() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.backgroundWrapper}>
        <FastImage
          style={{
            height: 160,
            alignSelf: 'center',
            width: Dimensions.get('window').width
          }}
          source={{
            uri: 'https://i.ytimg.com/vi/iI1wXOAGD5c/maxresdefault.jpg'
          }}
        />
      </View>
      <View>
        <View style={styles.avatarViewContainer}>
          <FastImage
            style={styles.avatar}
            source={{
              uri:
                'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/44750653_1291983287610702_7531437320625455104_n.jpg?_nc_cat=108&_nc_eui2=AeEu-AoCMrc-oB4sTLrczjMCBW7_6oyXHXhs1StDLMjyw9arGIdAB2mZ-1REtvMcRElkdYzv_228BTIgD3KD0b8gYk4VXJ0Q33LRGNI__4j2qA&_nc_oc=AQktT7ZP4s9ZEXQA3Lj8vS_6Y-i1IznCdd9k3mL6EyN-CsU9XcSVfsSIREQ03r67gT8&_nc_ht=scontent.fsgn8-1.fna&oh=a6bc1d8303393c3f9b13ffe103cddcd4&oe=5D83E77B'
            }}
          />
        </View>
        <View style={{ alignSelf: 'center', marginTop: 16 }}>
          <Text
            style={{ textAlign: 'center', color: '#333', fontWeight: '600' }}
          >
            Linh Penta 5/20/0
          </Text>
          <Text style={{ textAlign: 'center', color: '#828282' }}>
            linh.nguyen9xxx@gmail.com
          </Text>
        </View>
      </View>
      <List style={{ marginTop: 54 }}>
        <Item
          thumb={
            <Icon name="phone" color="#F23F3C" style={{ paddingRight: 12 }} />
          }
          arrow={'horizontal'}
        >
          {Localize.t('More.ChangePassword')}
        </Item>
        <Item
          thumb={
            <Icon name="flag" color="#F23F3C" style={{ paddingRight: 12 }} />
          }
          arrow={'horizontal'}
        >
          {Localize.t('More.Settings')}
        </Item>
        <View style={{ height: 10, backgroundColor: '#F2F3F5' }} />
        <Item
          thumb={
            <Icon name="flag" color="#F23F3C" style={{ paddingRight: 12 }} />
          }
          arrow={'horizontal'}
        >
          {Localize.t('More.PrivacyPolicy')}
        </Item>
        <Item
          thumb={
            <Icon name="flag" color="#F23F3C" style={{ paddingRight: 12 }} />
          }
          arrow={'horizontal'}
        >
          {Localize.t('More.AboutUs')}
        </Item>
        <Item
          thumb={
            <Icon name="flag" color="#F23F3C" style={{ paddingRight: 12 }} />
          }
          arrow={'horizontal'}
        >
          {Localize.t('More.TermsConditions')}
        </Item>
        <View style={{ height: 10, backgroundColor: '#F2F3F5' }} />
        <Item
          thumb={
            <Icon name="flag" color="#F23F3C" style={{ paddingRight: 12 }} />
          }
          arrow={'horizontal'}
        >
          {Localize.t('More.Logout')}
        </Item>
      </List>
    </View>
  )
}

More.navigationOptions = {
  header: null
}
