import { StyleSheet } from 'react-native'

export const MoreStyles = StyleSheet.create({
  backgroundWrapper: {
    height: '100%',
    width: '140%',
    left: '-20%',
    top: '-80%',
    position: 'absolute',
    borderBottomLeftRadius: 500,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderBottomRightRadius: 500
  },
  avatarViewContainer: {
    alignSelf: 'center',
    marginTop: 75,
    position: 'relative'
  },
  avatar: {
    width: 120,
    elevation: 3,
    height: 120,
    borderRadius: 120
  }
})
