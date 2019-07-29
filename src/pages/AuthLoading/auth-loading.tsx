import React, { Fragment, useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Storage } from 'shared/storage'

export const AuthLoading = () => {
  const navigation = useNavigation()

  useEffect(() => {
    Storage.getInstance()
      .getJwt()
      .then((jwt) => {
        if (jwt) {
          navigation.navigate('MainStack')
        } else {
          navigation.navigate('AuthStack')
        }
      })
  }, [])

  return <Fragment />
}
