import { Button, Icon, List } from '@ant-design/react-native'
import EddiIconConfig from 'assets/icon/config.json'
import { Localize } from 'core/localize'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { useNavigation } from 'react-navigation-hooks'

// https://images4.alphacoders.com/936/thumb-350-936801.jpg

import Item from '@ant-design/react-native/lib/list/ListItem'
import { ProfileStyles as styles } from './profile.constant'

const EddiIcon = createIconSetFromFontello(EddiIconConfig)

// interface Props {}

function Profile(/*props: Props*/) {
  const { navigate } = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.viewWrapper}>
        <View style={styles.backButtonWrapper}>
          <Button
            activeStyle={{ backgroundColor: 'transparent' }}
            style={styles.backButton}
          >
            <Icon name="left" style={styles.backButtonIcon} />
          </Button>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{Localize.t('Profile.Title')}</Text>
        </View>
        <View style={styles.doneWrapper}>
          <EddiIcon.Button
            onPress={() => navigate('EditProfile')}
            size={30}
            backgroundColor="transparent"
            color="#F23F3C"
            style={styles.doneButtonText}
            name={'pen'}
          />
        </View>
      </View>
      <View key="body">
        <View style={styles.avatarViewContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                'https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/14/a0/51/14a05155-d7ae-e3ff-4c8e-a50c17dd3d5a/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg'
            }}
          />
        </View>
        <View style={{ alignSelf: 'center', marginTop: 16 }}>
          <Text
            style={{ textAlign: 'center', color: '#333', fontWeight: '600' }}
          >
            Linh Feeder
          </Text>
          <Text style={{ textAlign: 'center', color: '#828282' }}>
            linh.nguyen9xxx@gmail.com
          </Text>
        </View>
        <List style={{ marginTop: 54 }}>
          <Item
            thumb={
              <Icon name="phone" color="#F23F3C" style={{ paddingRight: 12 }} />
            }
          >
            (+84) 77 948 1368
          </Item>
          <Item
            thumb={
              <Icon
                name="environment"
                color="#F23F3C"
                style={{ paddingRight: 12 }}
              />
            }
          >
            12, Ton Dan Street, Ward 13, District 4, HCM
          </Item>
          <Item
            thumb={
              <Icon name="flag" color="#F23F3C" style={{ paddingRight: 12 }} />
            }
          >
            Đất nước Gia Lai
          </Item>
        </List>
      </View>
    </View>
  )
}

Profile.navigationOptions = {
  header: null
}
export default Profile
