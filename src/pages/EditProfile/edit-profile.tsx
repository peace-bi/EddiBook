import { Button, Icon, Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import { UpdateProfileFailed, UpdateProfileSuccess } from 'pages/Profile/+state/profile.actions'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import { CustomInput } from 'shared/components/CustomInput'
import { RootReducer } from 'shared/store/rootReducer'
import { useThunkDispatch } from 'shared/util'

import { PhoneCodePicker } from './+component/phone-code-picker'
import { PickerModal } from './+component/pickerModal'
import { GetCitiesSuccess, GetRegionSuccess } from './+state/edit-profile.action'
import { getCities, getRegions, updateProfile } from './+state/edit-propfile.effect'
import { listCountry, styles } from './edit-profile.constant'
import { SubmitForm } from './edit-profile.model'
import { GetProfile } from 'pages/Profile/+state/profile.effect';

interface FormProps {
  avatar: string
  email: string
  firstname: string
  lastname: string
  phonePrefix: string
  phoneSuffix: string
  country: number
  region: number
  city: number
  zipcode: string
  address1: string
  address2: string
}

const RenderPicker = (props: {
  label: string
  data: Array<{ value: string; label: string }>
  disabled?: boolean
  handleChange: (e: unknown) => void
  selectedValue: number
}) => {
  const [openModal, setOpenModal] = useState(false)
  const result = props.data.find(
    ({ value }) => props.selectedValue.toString() == value
  )
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{props.label} *</Text>
      <View
        style={{
          ...styles.countryPickerContainer,
          ...(props.disabled ? styles.countryPickerContainerDisabled : {})
        }}
      >
        <TouchableWithoutFeedback
          onPress={(_) => {
            if (!props.disabled) {
              setOpenModal(!openModal)
            }
          }}
        >
          <View style={styles.countryField}>
            <Text style={styles.countryLabel}>{result && result.label}</Text>
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
          data={props.data}
          handleChange={props.handleChange}
          selectedValue={props.selectedValue}
        />
      </Modal>
    </View>
  )
}

const EditProfileComponent = () => {
  const { goBack } = useNavigation()
  const dispatch = useThunkDispatch()
  const profile = useSelector((s: RootReducer) => s.ProfileState.profile)
  const [regions, setRegions] = useState([] as Array<{
    value: string
    label: string
  }>)
  const [cities, setCities] = useState([] as Array<{
    value: string
    label: string
  }>)
  const submit = useCallback((values: FormProps) => {
    if (!profile) {
      return
    }
    const submitData: SubmitForm = {
      addressCommand: {
        addressId: profile.userProfile.address.addressId,
        cityId: values.city,
        countryId: values.country,
        regionId: values.region,
        streetOne: values.address1,
        streetTwo: values.address2,
        cityStr: ''
      },
      avatar: values.avatar,
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      phone: values.phoneSuffix,
      phoneCountryId: Number(values.phonePrefix)
    }
    dispatch(updateProfile(submitData)).subscribe((result) => {
      if (UpdateProfileSuccess.is(result)) {
        dispatch(GetProfile()).subscribe()
        Alert.alert('Success!')
        goBack(null)
      }
      if (UpdateProfileFailed.is(result)) {
        Alert.alert('Failed!')
      }
    })
  }, [])
  const updateAvatar = useCallback(async (handleChange) => {
    PermissionsAndroid.request('android.permission.CAMERA').then((value) => {
      console.log('test result', value)
    })
    await PermissionsAndroid.check('android.permission.CAMERA').then(
      (granted) => {
        console.log('grant result', granted)
        if (!granted) {
          console.log('granting')
          PermissionsAndroid.request('android.permission.CAMERA')
        }
      }
    )
    if (!(await PermissionsAndroid.check('android.permission.CAMERA'))) {
      return
    }
    ImagePicker.showImagePicker(
      {
        allowsEditing: true
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          handleChange(response.uri)
        }
      }
    )
  }, [])
  const getListRegions = useCallback((id: string) => {
    dispatch(getRegions(id)).subscribe((data) => {
      if (GetRegionSuccess.is(data)) {
        setRegions(
          data.payload.map((r) => ({
            label: r.name,
            value: r.regionId.toString()
          }))
        )
      }
    })
  }, [])
  const getListCities = useCallback((countryId: string, regionId: string) => {
    dispatch(getCities(countryId, regionId)).subscribe((data) => {
      if (GetCitiesSuccess.is(data)) {
        setCities(
          data.payload.map((r) => ({
            label: r.name,
            value: r.cityId.toString()
          }))
        )
      }
    })
  }, [])
  useEffect(() => {
    if (profile && profile.userProfile.address.country.countryId) {
      getListRegions(profile.userProfile.address.country.countryId.toString())
      if (profile.userProfile.address.region.regionId) {
        getListCities(
          profile.userProfile.address.country.countryId.toString(),
          profile.userProfile.address.region.regionId.toString()
        )
      }
    }
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
          <Formik
            initialValues={{
              avatar: profile
                ? profile.userProfile.avatar
                : 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
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
              region: profile
                ? profile.userProfile.address.region.regionId
                : -1,
              city: profile ? profile.userProfile.address.city.cityId : -1,
              zipcode: '',
              address1: profile ? profile.userProfile.address.streetOne : '',
              address2: profile ? profile.userProfile.address.streetTwo : ''
            }}
            onSubmit={submit}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View>
                <View style={styles.avatarViewContainer}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: values.avatar
                    }}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => updateAvatar(handleChange('avatar'))}
                  >
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
                      selectedValue={values.country}
                      listCountry={listCountry}
                      style={{ flex: 0.35 }}
                      disabled={true}
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
                  handleChange={(e) => {
                    getListRegions(e as string)
                    handleChange('region')('')
                    handleChange('city')('')
                    return handleChange('country')(e)
                  }}
                  data={listCountry}
                  selectedValue={values.country}
                />
                <RenderPicker
                  data={regions}
                  label={Localize.t('EditProfile.State')}
                  handleChange={(e) => {
                    getListCities(values.country.toString(), e as string)
                    handleChange('city')('')
                    return handleChange('region')(e)
                  }}
                  selectedValue={values.region}
                  disabled={!values.country}
                />
                <RenderPicker
                  data={cities}
                  label={Localize.t('EditProfile.City')}
                  handleChange={handleChange('city')}
                  selectedValue={values.city}
                  disabled={!values.region}
                />
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}>
                    {Localize.t('EditProfile.ZipCode')}
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
