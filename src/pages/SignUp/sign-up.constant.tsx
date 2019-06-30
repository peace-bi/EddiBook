import { StyleSheet } from 'react-native'

export const SignUpStyles = StyleSheet.create({
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
  signUpButtonWrapper: {
    marginTop: 38
  },
  signUpButton: {
    backgroundColor: '#F23F3C'
  },
  signUpButtonText: {
    color: '#fff'
  },
  policyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  policyWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    marginBottom: 30
  },
  policyText: {
    fontSize: 15
  }
})
