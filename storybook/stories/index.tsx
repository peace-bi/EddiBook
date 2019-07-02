import React from 'react'

// import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import { CustomInput } from 'shared/components'

storiesOf('Welcome', module).add('to Input', () => (
  <View style={{ marginTop: 60 }}>
    <CustomInput
      placeholder="Placeholder for input"
      secureTextEntry={true}
      valid={(text) => text.length > 6}
    />
  </View>
))
