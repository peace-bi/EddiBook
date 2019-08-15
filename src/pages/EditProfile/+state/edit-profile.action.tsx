import { Region, City } from 'pages/Profile/profile.model'
import { defineAction } from 'redux-typed-actions'

export const UpdateProfileSuccess = defineAction<any>('UPDATE_PROFILE_SUCCESS')
export const UpdateProfileFailed = defineAction<any>('UPDATE_PROFILE_FAILED')

export const GetRegionSuccess = defineAction<Region[]>('GET_REGION_SUCCESS')
export const GetRegionFailed = defineAction<any>('GET_REGION_FAILED')

export const GetCitiesSuccess = defineAction<City[]>('GET_CITY_SUCCESS')
export const GetCitiesFailed = defineAction<any>('GET_CITY_FAILED')
