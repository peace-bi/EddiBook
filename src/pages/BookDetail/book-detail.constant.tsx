import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    position: 'relative'
  },
  contentWrapper: {
    zIndex: 2
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  bookCover: {
    width: 300,
    height: 300,
    marginTop: 200
  },
  backgroundCover: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    left: '-30%',
    width: '160%',
    height: '50%',
    right: 0,
    opacity: 0.5,
    overflow: 'hidden'
  },
  backgroundCoverImg: {
    width: '100%',
    height: '100%'
  }
})
