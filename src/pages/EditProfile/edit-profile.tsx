import { Button, Icon, Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { CustomInput } from 'shared/components/CustomInput'
import { RootReducer } from 'shared/store/rootReducer'

import { PhoneCodePicker } from './+component/phone-code-picker'
import { PickerModal } from './+component/pickerModal'
import { mockCountry, styles } from './edit-profile.constant'

interface FormProps {
  email: string
  firstname: string
  lastname: string
  phonePrefix: string
  phoneSuffix: string
  country: number
  state: number
  city: number
  zipcode: string
  address1: string
  address2: string
}

const RenderPicker = (props: {
  label: string
  handleChange: (e: unknown) => void
  selectedValue: number
}) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{props.label} *</Text>
      <View style={styles.countryPickerContainer}>
        <TouchableWithoutFeedback onPress={(_) => setOpenModal(!openModal)}>
          <View style={styles.countryField}>
            <Text style={styles.countryLabel}>
              {(() => {
                const result = mockCountry.find(
                  ({ value }) => props.selectedValue === Number(value)
                )
                return result && result.label
              })()}
            </Text>
            <Icon style={styles.pickerIcon} name="caret-down" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Modal
        transparent={false}
        visible={openModal}
        animationType="slide-up"
        onClose={() => setOpenModal(!openModal)}
      >
        <PickerModal
          headerTitle={props.label}
          closeModal={() => setOpenModal(!openModal)}
          data={mockCountry}
          handleChange={props.handleChange}
          selectedValue={props.selectedValue}
        />
      </Modal>
    </View>
  )
}

const EditProfileComponent = () => {
  const { goBack } = useNavigation()
  const profile = useSelector((s: RootReducer) => s.ProfileState.profile)
  const submit = useCallback((values: FormProps) => {
    Alert.alert('Update Success!')
    console.info(values)
    Keyboard.dismiss()
  }, [])
  const updateAvatar = useCallback((_) => {
    console.info(_)
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.viewWrapper}>
        <View style={styles.backButtonWrapper}>
          <Button
            activeStyle={{ backgroundColor: 'transparent' }}
            style={styles.backButton}
            onPress={() => goBack(null)}
          >
            <Icon name="close" style={styles.backButtonIcon} />
          </Button>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{Localize.t('Profile.Title')}</Text>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.avatarViewContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: profile
                  ? profile.userProfile.avatar
                  : 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
              }}
            />
            <TouchableWithoutFeedback onPress={updateAvatar}>
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
              email: profile ? profile.username : '',
              firstname: profile ? profile.userProfile.firstName : '',
              lastname: profile ? profile.userProfile.lastName : '',
              phonePrefix: profile
                ? profile.userProfile.address.country.phoneCode
                : '',
              phoneSuffix: profile ? profile.userProfile.phone : '',
              country: profile
                ? profile.userProfile.address.country.countryId
                : -1,
              state: profile ? profile.userProfile.address.region.regionId : -1,
              city: profile ? profile.userProfile.address.city.cityId : -1,
              zipcode: '',
              address1: profile ? profile.userProfile.address.streetOne : '',
              address2: profile ? profile.userProfile.address.streetTwo : ''
            }}
            onSubmit={submit}
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
                      value={values.phoneSuffix}
                      style={{ flex: 0.6 }}
                      onChangeText={handleChange('phoneSuffix')}
                    />
                  </View>
                </View>
                <RenderPicker
                  label={Localize.t('EditProfile.Country')}
                  handleChange={handleChange('country')}
                  selectedValue={values.country}
                />
                <RenderPicker
                  label={Localize.t('EditProfile.State')}
                  handleChange={handleChange('state')}
                  selectedValue={values.state}
                />
                <RenderPicker
                  label={Localize.t('EditProfile.City')}
                  handleChange={handleChange('city')}
                  selectedValue={values.city}
                />
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('EditProfile.ZipCode')} *
                  </Text>
                  <CustomInput
                    value={values.zipcode}
                    onChangeText={handleChange('zipcode')}
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('EditProfile.Address1')} *
                  </Text>
                  <CustomInput
                    value={values.address1}
                    onChangeText={handleChange('address1')}
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('EditProfile.Address2')}
                  </Text>
                  <CustomInput
                    value={values.address2}
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
    </SafeAreaView>
  )
}

EditProfileComponent.navigationOptions = {
  header: null
}

export default EditProfileComponent
