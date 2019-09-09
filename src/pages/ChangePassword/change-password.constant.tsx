import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 350,
    height: '100%',
    width: '100%',
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
  saveButtonWrapper: {
    marginBottom: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  saveButton: {
    backgroundColor: '#F23F3C'
  },
  saveButtonText: {
    color: '#fff'
  }
})
