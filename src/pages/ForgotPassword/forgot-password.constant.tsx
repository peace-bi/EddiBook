import { StyleSheet } from 'react-native'

export const forgotPasswordStyles = StyleSheet.create({
  wrapper: {
    maxWidth: 350,
    width: '100%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 26,
    textAlign: 'center'
  },
  content: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  label: {
    color: '#43484B',
    fontSize: 13,
    marginBottom: 4
  },
  fieldWrapper: {
    marginTop: 20
  },
  sendButton: {
    backgroundColor: '#F23F3C',
    marginTop: 33
  },
  sendButtonText: {
    color: '#fff'
  }
})
