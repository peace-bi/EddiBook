import { StyleSheet } from 'react-native'
import { Header } from 'react-navigation'

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 350,
    width: '100%',
    paddingBottom: 50,
    alignSelf: 'center'
  },
  avatarViewContainer: {
    alignSelf: 'center',
    marginTop: 16,
    position: 'relative'
  },
  avatarContainerInteract: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  },
  avatarContainer: {
    justifyContent: 'center',
    flex: 1
  },
  avatarWrapper: {
    width: 120,
    height: 60,
    position: 'absolute',
    top: 60,
    left: 0,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60
  },
  avatarEditText: {
    color: '#fff',
    textAlign: 'center'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120
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
  },
  countryField: {
    flex: 1,
    flexDirection: 'row'
  },
  countryLabel: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 15,
    paddingLeft: 16
  },
  countryPickerContainer: {
    borderWidth: 1,
    height: 48,
    borderColor: '#D3DCE6',
    borderRadius: 9,
    position: 'relative'
  },
  countryPickerIcon: {
    width: 50,
    justifyContent: 'flex-end',
    textAlign: 'center',
    alignSelf: 'center'
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

export const countryPickerStyles = StyleSheet.create({
  // container: { flex: 1 },
  viewWrapper: {
    height: Header.HEIGHT,
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
  },
  checkMark: {
    color: '#F23F3C'
  }
})

export const mockCountry = [
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'USA',
    value: 'us'
  },
  {
    label: 'Laos',
    value: 'la'
  },
  {
    label: 'China',
    value: 'cn'
  },
  {
    label: 'Japan',
    value: 'jp'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  },
  {
    label: 'Vietnam',
    value: 'vi'
  }
]
