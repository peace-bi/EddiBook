import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 350,
    width: '100%',
    paddingBottom: 50,
    alignSelf: 'center'
  },
  label: {
    color: '#43484B',
    fontSize: 13,
    marginBottom: 4
  },
  fieldWrapper: {
    marginTop: 20,
    justifyContent: 'space-between'
  },
  phoneNumberWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  saveButtonWrapper: {
    marginTop: 38
  },
  saveButton: {
    backgroundColor: '#F23F3C'
  },
  saveButtonText: {
    color: '#fff'
  }
})

export const phoneCodePickerStyles = StyleSheet.create({
  logoPostCode: {
    width: 24,
    alignSelf: 'center',
    marginLeft: 10,
    height: 16
  },
  picker: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0
  }
})
