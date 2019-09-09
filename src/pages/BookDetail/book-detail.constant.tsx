import { StyleSheet } from 'react-native'
import { Header } from 'react-navigation'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    overflow: 'hidden',
    position: 'relative'
  },
  contentWrapper: {
    zIndex: -1
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  bookCover: {
    width: 200,
    height: 300,

    alignSelf: 'center',
    borderRadius: 8
  },
  backgroundCover: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    left: '-25%',
    width: '150%',
    height: '50%',
    right: 0,
    overflow: 'hidden'
  },
  backgroundCoverImg: {
    // width: '100%',
    // height: '100%'
  },
  viewWrapper: {
    height: Header.HEIGHT,
    zIndex: 9,
    flexDirection: 'row'
  },
  backButtonWrapper: {
    paddingTop: 16,
    justifyContent: 'center',
    flex: 0.3
  },
  backButton: {
    borderWidth: 0,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent'
  },
  backButtonIcon: { color: '#fff' },
  titleWrapper: {
    paddingTop: 16,
    justifyContent: 'center',
    flex: 0.4
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  }
})
