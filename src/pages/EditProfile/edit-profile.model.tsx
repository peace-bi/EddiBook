export interface SubmitForm {
  addressCommand: {
    addressId: number
    cityId: number
    cityStr: string
    countryId: number
    regionId: number
    streetOne: string
    streetTwo: string
  }
  avatar: string
  email: string
  firstName: string
  lastName: string
  phone: string
  phoneCountryId: number
}
