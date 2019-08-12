// import * as io from 'io-ts'

export interface ProfileState {
  profile: Profile | null
}

export interface Profile {
  creationDate: string
  email: string
  status: string
  userGroupId: number
  userId: number
  userProfile: UserProfile
  username: string
}

export interface UserProfile {
  address: Address
  avatar: string
  creationDate: string
  editDate: string
  firstName: string
  lastName: string
  nationalityCountry: Country
  phone: string
  phoneCountry: Country
  userProfileId: number
}

export interface Address {
  addressId: number
  city: City
  cityStr: string
  country: Country
  region: Region
  streetOne: string
  streetTwo: string
}

export interface City {
  cityId: number
  code: string
  name: string
}

export interface Country {
  code: string
  countryId: number
  name: string
  phoneCode: string
}

export interface Region {
  code: string
  name: string
  regionId: number
  type: string
}

// export const Book: io.Type<Profile> = io.type({
//   creationDate: io.string,
//   email: io.string,
//   status: io.string,
//   userGroupId: io.number,
//   userId: io.number,
//   username: io.string,
//   userProfile: io.type({
//     creationDate: io.string,
//     avatar: io.string,
//     editDate: io.string,
//     firstName: io.string,
//     lastName: io.string,
//     phone: io.string,
//     userProfileId: io.number,
//     nationalityCountry: Country,
//     phoneCountry: Country,
//     address: Address
//   })
// })
// const UserProfile: io.Type<UserProfile> = io.type({
//   creationDate: io.string,
//   avatar: io.string,
//   editDate: io.string,
//   firstName: io.string,
//   lastName: io.string,
//   phone: io.string,
//   userProfileId: io.number,
//   nationalityCountry: Country,
//   phoneCountry: Country,
//   address: Address
// })
// const Country: io.Type<Country> = io.type({

// })
// const Address: io.Type<Address> = io.type({

// })
