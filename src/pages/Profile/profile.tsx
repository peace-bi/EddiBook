import { Button } from '@ant-design/react-native'
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

import { PhoneCodePicker } from './+component/phone-code-picker'
import { styles } from './profile.constant'

const tResolver = (path: string): string => `Profile$${path}`
interface Props {}
interface State {}
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

export default class Profile extends React.Component<Props, State> {
  static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = {
    headerTitle: 'Profile'
  }

  constructor(props: Props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(values: FormProps) {
    Alert.alert(JSON.stringify(values, null, 2))
    Keyboard.dismiss()
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 16,
                position: 'relative'
              }}
            >
              <Image
                style={{ width: 120, height: 120, borderRadius: 120 }}
                source={{ uri: 'https://i.imgur.com/cPFHT2k.jpg' }}
              />
              <TouchableWithoutFeedback onPress={() => console.info(2)}>
                <View
                  style={{
                    width: 120,
                    height: 120,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden'
                  }}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.8)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                      width: 120,
                      height: 60,
                      position: 'absolute',
                      top: 60,
                      left: 0,
                      borderBottomLeftRadius: 60,
                      borderBottomRightRadius: 60
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        flex: 1
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center'
                        }}
                      >
                        Edit
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
                zipcode: 'string',
                address1: ' string',
                address2: ' string'
              }}
              onSubmit={this.submit}
            >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('Email'))}
                    </Text>
                    <CustomInput
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('FirstName'))}*
                    </Text>
                    <CustomInput
                      value={values.firstname}
                      onChangeText={handleChange('firstname')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('LastName'))} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('lastname')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('PhoneNumber'))} *
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
                      {Localize.t(tResolver('Country'))} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('country')}
                    />
                  </View>

                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('State'))} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('state')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('City'))} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('city')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('ZipCode'))} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('zipcode')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('Address1'))} *
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('address1')}
                    />
                  </View>
                  <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>
                      {Localize.t(tResolver('Address2'))}
                    </Text>
                    <CustomInput
                      value={values.lastname}
                      onChangeText={handleChange('address2')}
                    />
                  </View>

                  <View style={styles.saveButtonWrapper}>
                    <Button style={styles.saveButton} onPress={handleSubmit}>
                      <Text style={styles.saveButtonText}>
                        {Localize.t(tResolver('SaveButton'))}
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
