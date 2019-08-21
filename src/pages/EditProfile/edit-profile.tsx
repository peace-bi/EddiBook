import { Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { Formik } from 'formik'
import {
  GetProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess
} from 'pages/Profile'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import {
  CustomInput,
  PickerModal,
  RootReducer,
  useThunkDispatch
} from 'shared/shared-index'

import {
  getCities,
  GetCitiesSuccess,
  getRegions,
  GetRegionSuccess,
  updateProfile
} from './+state'
import { listCountry, Styled } from './edit-profile.constant'
import { SubmitForm } from './edit-profile.model'

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
  data: SelectItem[]
  disabled?: boolean
  handleChange: (e: unknown) => void
  selectedValue: number
}) => {
  const [openModal, setOpenModal] = useState(false)
  const result = props.data.find(
    ({ value }) => props.selectedValue.toString() == value
  )
  return (
    <Styled.Field>
      <Styled.Label>{props.label} *</Styled.Label>
      <Styled.PickerContainer {...{ disabled: true }}>
        <TouchableWithoutFeedback
          onPress={() => (!props.disabled ? setOpenModal(!openModal) : null)}
        >
          <Styled.PickerField>
            <Styled.PickerText>{result && result.label}</Styled.PickerText>
            <Styled.PickerIcon />
          </Styled.PickerField>
        </TouchableWithoutFeedback>
      </Styled.PickerContainer>
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
    </Styled.Field>
  )
}

const EditProfileComponent = () => {
  const { goBack } = useNavigation()
  const dispatch = useThunkDispatch()
  const profile = useSelector((s: RootReducer) => s.ProfileState.profile)
  const [regions, setRegions] = useState([] as SelectItem[])
  const [cities, setCities] = useState([] as SelectItem[])
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
    await PermissionsAndroid.check('android.permission.CAMERA').then(
      (granted) => {
        if (!granted) {
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
        } else if (response.error) {
          return
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
  const formInitValue = {
    avatar: profile
      ? profile.userProfile.avatar
      : 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
    email: profile ? profile.username : '',
    firstname: profile ? profile.userProfile.firstName : '',
    lastname: profile ? profile.userProfile.lastName : '',
    phonePrefix: profile ? profile.userProfile.address.country.phoneCode : '',
    phoneSuffix: profile ? profile.userProfile.phone : '',
    country: profile ? profile.userProfile.address.country.countryId : -1,
    region: profile ? profile.userProfile.address.region.regionId : -1,
    city: profile ? profile.userProfile.address.city.cityId : -1,
    zipcode: '',
    address1: profile ? profile.userProfile.address.streetOne : '',
    address2: profile ? profile.userProfile.address.streetTwo : ''
  }
  const { t } = Localize
  return (
    <SafeAreaView>
      <Styled.HeaderWrapper>
        <Styled.BackButtonWrapper>
          <Styled.BackButton onPress={() => goBack(null)}></Styled.BackButton>
          <Styled.BackButtonIcon />
        </Styled.BackButtonWrapper>
        <Styled.TitleWrapper>
          <Styled.Title>{t('Profile.Title')}</Styled.Title>
        </Styled.TitleWrapper>
      </Styled.HeaderWrapper>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Formik initialValues={formInitValue} onSubmit={submit}>
          {({ handleChange, handleSubmit, values }) => (
            <Styled.ContentWrapper>
              <Styled.AvatarContainer>
                <Styled.Avatar source={{ uri: values.avatar }} />
                <TouchableWithoutFeedback
                  onPress={() => updateAvatar(handleChange('avatar'))}
                >
                  <Styled.AvatarOverlayContainer>
                    <Styled.AvatarOverlay>
                      <Styled.AvatarEditContainer>
                        <Styled.AvatarEditText>
                          {t('EditProfile.Edit')}
                        </Styled.AvatarEditText>
                      </Styled.AvatarEditContainer>
                    </Styled.AvatarOverlay>
                  </Styled.AvatarOverlayContainer>
                </TouchableWithoutFeedback>
              </Styled.AvatarContainer>
              <Styled.Field>
                <Styled.Label>{t('EditProfile.Email')}</Styled.Label>
                <CustomInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
              </Styled.Field>
              <Styled.Field>
                <Styled.Label>{t('EditProfile.FirstName')}*</Styled.Label>
                <CustomInput
                  value={values.firstname}
                  onChangeText={handleChange('firstname')}
                />
              </Styled.Field>
              <Styled.Field>
                <Styled.Label>{t('EditProfile.LastName')} *</Styled.Label>
                <CustomInput
                  value={values.lastname}
                  onChangeText={handleChange('lastname')}
                />
              </Styled.Field>
              <Styled.Field>
                <Styled.Label>{t('EditProfile.PhoneNumber')} *</Styled.Label>
                <Styled.PhoneNumberWrapper>
                  <Styled.RegionCodePicker
                    selectedValue={values.country}
                    listCountry={listCountry}
                    onValueChange={handleChange('phonePrefix')}
                  />
                  <Styled.PhoneNumberInput
                    value={values.phoneSuffix}
                    onChangeText={handleChange('phoneSuffix')}
                  />
                </Styled.PhoneNumberWrapper>
              </Styled.Field>
              <RenderPicker
                label={t('EditProfile.Country')}
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
                label={t('EditProfile.State')}
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
                label={t('EditProfile.City')}
                handleChange={handleChange('city')}
                selectedValue={values.city}
                disabled={!values.region}
              />
              <Styled.Field>
                <Styled.Label>{t('EditProfile.ZipCode')}</Styled.Label>
                <CustomInput
                  value={values.zipcode}
                  onChangeText={handleChange('zipcode')}
                />
              </Styled.Field>
              <Styled.Field>
                <Styled.Label>{t('EditProfile.Address1')} *</Styled.Label>
                <CustomInput
                  value={values.address1}
                  onChangeText={handleChange('address1')}
                />
              </Styled.Field>
              <Styled.Field>
                <Styled.Label>{t('EditProfile.Address2')}</Styled.Label>
                <CustomInput
                  value={values.address2}
                  onChangeText={handleChange('address2')}
                />
              </Styled.Field>
              <Styled.SaveButtonWrapper>
                <Styled.SaveButton onPress={handleSubmit}>
                  <Styled.SaveButtonText>
                    {t('EditProfile.SaveButton')}
                  </Styled.SaveButtonText>
                </Styled.SaveButton>
              </Styled.SaveButtonWrapper>
            </Styled.ContentWrapper>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

EditProfileComponent.navigationOptions = {
  header: null
}

export default EditProfileComponent
