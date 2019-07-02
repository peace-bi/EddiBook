import { StyleSheet } from 'react-native'
import { Header } from 'react-navigation'

export const ProfileStyles = StyleSheet.create({
  viewWrapper: {
    height: Header.HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#bdbdbd',
    flexDirection: 'row'
  },
  backButtonWrapper: {
    justifyContent: 'center',
    flex: 0.3
  },
  backButton: {
    borderWidth: 0,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent'
  },
  backButtonIcon: { color: '#888' },
  titleWrapper: {
    justifyContent: 'center',
    flex: 0.4
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  doneWrapper: {
    justifyContent: 'center',
    flex: 0.3
  },
  doneButton: {
    borderWidth: 0,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent'
  },
  doneButtonText: {
    color: '#F23F3C'
  }
})
