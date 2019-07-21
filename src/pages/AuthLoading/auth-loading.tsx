import React, { Fragment, useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'

export const AuthLoading = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.navigate('MainStack')
    // navigation.navigate('AuthStack')
  }, [])

  return <Fragment />
}
