import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { compose } from 'redux'

interface Props {}

interface State {}

class SignInComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView>
        <View />
      </SafeAreaView>
    )
  }
}

const enhancer = compose()

export default enhancer(SignInComponent)
