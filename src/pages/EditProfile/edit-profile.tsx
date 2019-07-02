import { Button, Icon, Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React from 'react'
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  NavigationScreenConfig,
  NavigationScreenOptions
} from 'react-navigation'
import { CustomInput } from 'shared/components/CustomInput'

import { CountryPickerModal } from './+component/countryPicker'
import { PhoneCodePicker } from './+component/phone-code-picker'
import { mockCountry, styles } from './edit-profile.constant'

interface Props {}
interface State {
  openCountryModal: boolean
  editMode: boolean
}
interface FormProps {
  email: string
  firstname: string
  lastname: string
  phonePrefix: string
  phoneSuffix: string
  country: string
  state: string
  city: string
  zipcode: string
  address1: string
  address2: string
}

export default class EditProfile extends React.Component<Props, State> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
    headerTitle: 'Profile'
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      editMode: false,
      openCountryModal: false
    }
    this.submit = this.submit.bind(this)
    this.toggleCountryPickerModal = this.toggleCountryPickerModal.bind(this)
  }

  submit(values: FormProps) {
    Alert.alert(JSON.stringify(values, null, 2))
    Keyboard.dismiss()
  }

  toggleCountryPickerModal() {
    this.setState({
      openCountryModal: !this.state.openCountryModal
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <View style={styles.avatarViewContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: 'https://i.imgur.com/cPFHT2k.jpg' }}
              />
              <TouchableWithoutFeedback onPress={() => console.info(2)}>
                <View style={styles.avatarContainerInteract}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.8)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.avatarWrapper}
                  >
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarEditText}>
                        {Localize.t('EditProfile.Edit')}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Formik
              initialValues={{
                email: '',
                firstname: '',
                lastname: '',
                phonePrefix: '',
                phoneSuffix: '',
                country: '',
                state: '',
                city: '',
                zipcode: '',
                address1: '',
                address2: ''
              }}
              onSubmit={this.submit}
            >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.Email')}
                    </Text>
                    <CustomInput
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.FirstName')}*
                    </Text>
                    <CustomInput
                      value={values.firstname}
                      onChangeText={handleChange('firstname')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.LastName')} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('lastname')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.PhoneNumber')} *
                    </Text>
                    <View style={styles.phoneNumberWrapper}>
                      <PhoneCodePicker
                        selectedValue={1}
                        listCountry={[]}
                        style={{ flex: 0.35 }}
                        onValueChange={handleChange('phonePrefix')}
                      />
                      <CustomInput
                        value={values.lastname}
                        style={{ flex: 0.6 }}
                        onChangeText={handleChange('phoneSuffix')}
                      />
                    </View>
                  </View>

                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.Country')} *
                    </Text>
                    <View style={styles.countryPickerContainer}>
                      <TouchableWithoutFeedback
                        onPress={this.toggleCountryPickerModal}
                      >
                        <View style={styles.countryField}>
                          <Text style={styles.countryLabel}>
                            {(() => {
                              const result = mockCountry.find(
                                ({ value }) => values.country === value
                              )
                              return result && result.label
                            })()}
                          </Text>
                          <Icon
                            style={styles.countryPickerIcon}
                            name="caret-down"
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <Modal
                      transparent={false}
                      visible={this.state.openCountryModal}
                      animationType="slide-up"
                      onClose={this.toggleCountryPickerModal}
                    >
                      <CountryPickerModal
                        closeModal={this.toggleCountryPickerModal}
                        data={mockCountry}
                        handleChange={handleChange}
                        selectedValue={values.country}
                      />
                    </Modal>
                  </View>

                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.State')} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('state')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.City')} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('city')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.ZipCode')} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('zipcode')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.Address1')} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('address1')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t('EditProfile.Address2')}
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('address2')}
                    />
                  </View>

                  <View style={styles.saveButtonWrapper}>
                    <Button style={styles.saveButton} onPress={handleSubmit}>
                      <Text style={styles.saveButtonText}>
                        {Localize.t('EditProfile.SaveButton')}
                      </Text>
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    )
  }
}
