import { StyleSheet } from 'react-native'

export const SignInStyles = StyleSheet.create({
  wrapper: {
    maxWidth: 350,
    width: '100%',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#4F4F4F',
    marginTop: 60,
    marginBottom: 28
  },
  label: {
    color: '#43484B',
    fontSize: 13,
    marginBottom: 4
  },
  fieldWrapper: {
    marginTop: 20
  },
  forgotPasswordWrapper: {
    marginTop: 24
  },
  forgotPasswordText: {
    color: '#1E8EEB'
  },
  signInButtonWrapper: {
    marginTop: 38
  },
  signInButton: {
    backgroundColor: '#F23F3C'
  },
  signInButtonText: {
    color: '#fff'
  },
  noAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  noAccountWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 30
  },
  signUpButtonText: {
    color: '#F23F3C'
  }
})
