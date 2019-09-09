import React, { Fragment, useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Storage } from 'shared/storage'

export const AuthLoading = () => {
  const navigation = useNavigation()

  useEffect(() => {
    Storage.getInstance()
      .getToken()
      .then((token) => {
        const { jwt } = token
        if (jwt) {
          navigation.navigate('MainStack')
        } else {
          navigation.navigate('AuthStack')
        }
      })
  }, [])

  return <Fragment />
}
