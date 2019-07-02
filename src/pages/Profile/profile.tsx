import { Button, Icon } from '@ant-design/react-native'
import EddiIconConfig from 'assets/icon/config.json'
import { Localize } from 'core/localize'
import React from 'react'
import { Text, View } from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { NavigationScreenProps } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'

import { ProfileStyles as styles } from './profile.constant'

const EddiIcon = createIconSetFromFontello(
  EddiIconConfig,
  'eddiicon',
  'eddiicon.ttf'
)

interface Props extends NavigationScreenProps<any> {}

function Profile(props: Props) {
  const navigation = useNavigation()
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
          <Button
            style={styles.doneButton}
            activeStyle={{ backgroundColor: 'transparent' }}
          >
            <Text style={styles.doneButtonText}>
              <EddiIcon size={30} name={'pen'} />
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

Profile.navigationOptions = {
  header: null
}
export default Profile
