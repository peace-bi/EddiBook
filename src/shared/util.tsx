import EddiIconConfig from 'assets/icon/config.json'
import { Dispatch } from 'react'
import { GeolocationReturnType, StatusBar } from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Observable } from 'rxjs/internal/Observable'
import { Observer } from 'rxjs/internal/types'
import { delay } from 'rxjs/operators'

import AppConfig from '../../app.json'

type ThunkAction = <T>(
  thunkAction: (dispatch: ThunkDispatch<any, any, any>) => T
) => T

export function useThunkDispatch() {
  return useDispatch() as ThunkAction & Dispatch<any>
}

export function getLocation(): Observable<GeolocationReturnType> {
  return Observable.create((observer: Observer<GeolocationReturnType>) =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        observer.next(position)
        observer.complete()
      },
      (err) => observer.error(err),
      {
        distanceFilter: 100, // in meters,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  ).pipe(delay(5000))
}
export function toggleStatusBar(show: boolean) {
  StatusBar.setTranslucent(show)
  StatusBar.setBackgroundColor(show ? '#fff' : 'transparent')
}
export const EddiIcon = createIconSetFromFontello(EddiIconConfig)

export const listCountry = [
  { countryId: 5, code: 'AD', name: 'Andorra', phoneCode: '+376' },
  {
    countryId: 230,
    code: 'AE',
    name: 'United Arab Emirates',
    phoneCode: '+971'
  },
  { countryId: 1, code: 'AF', name: 'Afghanistan', phoneCode: '+93' },
  {
    countryId: 9,
    code: 'AG',
    name: 'Antigua and Barbuda',
    phoneCode: '+1-268'
  },
  { countryId: 7, code: 'AI', name: 'Anguilla', phoneCode: '+1-264' },
  { countryId: 2, code: 'AL', name: 'Albania', phoneCode: '+355' },
  {
    countryId: 154,
    code: 'AN',
    name: 'Netherlands Antilles',
    phoneCode: '+599'
  },
  { countryId: 6, code: 'AO', name: 'Angola', phoneCode: '+244' },
  { countryId: 8, code: 'AQ', name: 'Antarctica', phoneCode: '+672' },
  { countryId: 10, code: 'AR', name: 'Argentina', phoneCode: '+54' },
  { countryId: 4, code: 'AS', name: 'American Samoa', phoneCode: '+1-684' },
  { countryId: 19, code: 'BB', name: 'Barbados', phoneCode: '+1-246' },
  { countryId: 18, code: 'BD', name: 'Bangladesh', phoneCode: '+880' },
  { countryId: 21, code: 'BE', name: 'Belgium', phoneCode: '+32' },
  { countryId: 17, code: 'BH', name: 'Bahrain', phoneCode: '+973' },
  { countryId: 23, code: 'BJ', name: 'Benin', phoneCode: '+229' },
  { countryId: 24, code: 'BM', name: 'Bermuda', phoneCode: '+1-441' },
  {
    countryId: 40,
    code: 'BQ',
    name: 'Caribbean Netherlands',
    phoneCode: '+599'
  },
  { countryId: 16, code: 'BS', name: 'Bahamas', phoneCode: '+1-242' },
  { countryId: 25, code: 'BT', name: 'Bhutan', phoneCode: '+975' },
  { countryId: 20, code: 'BY', name: 'Belarus', phoneCode: '+375' },
  { countryId: 22, code: 'BZ', name: 'Belize', phoneCode: '+501' },
  { countryId: 38, code: 'CA', name: 'Canada', phoneCode: '+1' },
  {
    countryId: 50,
    code: 'CD',
    name: 'Democratic Republic of the Congo',
    phoneCode: '+243'
  },
  {
    countryId: 42,
    code: 'CF',
    name: 'Central African Republic',
    phoneCode: '+236'
  },
  {
    countryId: 51,
    code: 'CG',
    name: 'Republic of the Congo',
    phoneCode: '+242'
  },
  { countryId: 44, code: 'CL', name: 'Chile', phoneCode: '+56' },
  { countryId: 37, code: 'CM', name: 'Cameroon', phoneCode: '+237' },
  { countryId: 45, code: 'CN', name: 'China', phoneCode: '+86' },
  { countryId: 39, code: 'CV', name: 'Cape Verde', phoneCode: '+238' },
  { countryId: 83, code: 'DE', name: 'Germany', phoneCode: '+49' },
  { countryId: 61, code: 'DJ', name: 'Djibouti', phoneCode: '+253' },
  { countryId: 60, code: 'DK', name: 'Denmark', phoneCode: '+45' },
  { countryId: 62, code: 'DM', name: 'Dominica', phoneCode: '+1-767' },
  {
    countryId: 63,
    code: 'DO',
    name: 'Dominican Republic',
    phoneCode: '+1-809'
  },
  { countryId: 3, code: 'DZ', name: 'Algeria', phoneCode: '+213' },
  { countryId: 65, code: 'EC', name: 'Ecuador', phoneCode: '+593' },
  { countryId: 70, code: 'EE', name: 'Estonia', phoneCode: '+372' },
  { countryId: 66, code: 'EG', name: 'Egypt', phoneCode: '+20' },
  { countryId: 243, code: 'EH', name: 'Western Sahara', phoneCode: null },
  { countryId: 69, code: 'ER', name: 'Eritrea', phoneCode: '+291' },
  { countryId: 71, code: 'ET', name: 'Ethiopia', phoneCode: '+251' },
  { countryId: 75, code: 'FI', name: 'Finland', phoneCode: '+358' },
  { countryId: 74, code: 'FJ', name: 'Fiji', phoneCode: '+679' },
  { countryId: 72, code: 'FK', name: 'Falkland Islands', phoneCode: '+500' },
  { countryId: 73, code: 'FO', name: 'Faroe Islands', phoneCode: '+298' },
  { countryId: 76, code: 'FR', name: 'France', phoneCode: '+33' },
  { countryId: 80, code: 'GA', name: 'Gabon', phoneCode: '+241' },
  { countryId: 231, code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
  { countryId: 88, code: 'GD', name: 'Grenada', phoneCode: '+1-473' },
  { countryId: 82, code: 'GE', name: 'Georgia', phoneCode: '+995' },
  {
    countryId: 77,
    code: 'GF',
    name: 'French Guiana or French Guyana',
    phoneCode: '+594'
  },
  { countryId: 84, code: 'GH', name: 'Ghana', phoneCode: '+233' },
  { countryId: 85, code: 'GI', name: 'Gibraltar', phoneCode: '+350' },
  { countryId: 87, code: 'GL', name: 'Greenland', phoneCode: '+299' },
  { countryId: 81, code: 'GM', name: 'Gambia', phoneCode: '+220' },
  { countryId: 89, code: 'GP', name: 'Guadeloupe', phoneCode: '+590' },
  { countryId: 68, code: 'GQ', name: 'Equatorial Guinea', phoneCode: '+240' },
  { countryId: 86, code: 'GR', name: 'Greece', phoneCode: '+30' },
  { countryId: 98, code: 'HK', name: 'Hong Kong', phoneCode: '+852' },
  {
    countryId: 96,
    code: 'HM',
    name: 'Heard Island and McDonald Islands',
    phoneCode: null
  },
  { countryId: 97, code: 'HN', name: 'Honduras', phoneCode: '+504' },
  { countryId: 95, code: 'HT', name: 'Haiti', phoneCode: '+509' },
  { countryId: 99, code: 'HU', name: 'Hungary', phoneCode: '+36' },
  { countryId: 102, code: 'ID', name: 'Indonesia', phoneCode: '+62' },
  { countryId: 105, code: 'IE', name: 'Ireland', phoneCode: '+353' },
  { countryId: 106, code: 'IL', name: 'Israel', phoneCode: '+972' },
  { countryId: 101, code: 'IN', name: 'India', phoneCode: '+91' },
  { countryId: 104, code: 'IQ', name: 'Iraq', phoneCode: '+964' },
  { countryId: 103, code: 'IR', name: 'Iran', phoneCode: '+98' },
  { countryId: 100, code: 'IS', name: 'Iceland', phoneCode: '+354' },
  { countryId: 107, code: 'IT', name: 'Italy', phoneCode: '+39' },
  { countryId: 108, code: 'JM', name: 'Jamaica', phoneCode: '+1-876' },
  { countryId: 110, code: 'JO', name: 'Jordan', phoneCode: '+962' },
  { countryId: 109, code: 'JP', name: 'Japan', phoneCode: '+81' },
  { countryId: 112, code: 'KE', name: 'Kenya', phoneCode: '+254' },
  { countryId: 117, code: 'KG', name: 'Kyrgyzstan', phoneCode: '+996' },
  { countryId: 36, code: 'KH', name: 'Cambodia', phoneCode: '+855' },
  { countryId: 113, code: 'KI', name: 'Kiribati', phoneCode: '+686' },
  {
    countryId: 184,
    code: 'KN',
    name: 'Saint Kitts and Nevis',
    phoneCode: '+1-869'
  },
  { countryId: 114, code: 'KP', name: 'North Korea', phoneCode: '+850' },
  { countryId: 115, code: 'KR', name: 'South Korea', phoneCode: '+82' },
  { countryId: 116, code: 'KW', name: 'Kuwait', phoneCode: '+965' },
  { countryId: 41, code: 'KY', name: 'Cayman Islands', phoneCode: '+1-345' },
  {
    countryId: 111,
    code: 'KZ',
    name: 'Kazakstan or Kazakhstan',
    phoneCode: '+7'
  },
  {
    countryId: 118,
    code: 'LA',
    name: 'Lao People\'s Democratic Republic',
    phoneCode: '+856'
  },
  { countryId: 120, code: 'LB', name: 'Lebanon', phoneCode: '+961' },
  { countryId: 185, code: 'LC', name: 'Saint Lucia', phoneCode: '+1-758' },
  { countryId: 124, code: 'LI', name: 'Liechtenstein', phoneCode: '+423' },
  { countryId: 122, code: 'LR', name: 'Liberia', phoneCode: '+231' },
  { countryId: 121, code: 'LS', name: 'Lesotho', phoneCode: '+266' },
  { countryId: 125, code: 'LT', name: 'Lithuania', phoneCode: '+370' },
  { countryId: 126, code: 'LU', name: 'Luxembourg', phoneCode: '+352' },
  { countryId: 119, code: 'LV', name: 'Latvia', phoneCode: '+371' },
  { countryId: 123, code: 'LY', name: 'Libya', phoneCode: '+218' },
  { countryId: 129, code: 'MG', name: 'Madagascar', phoneCode: '+261' },
  { countryId: 135, code: 'MH', name: 'Marshall Islands', phoneCode: '+692' },
  { countryId: 128, code: 'MK', name: 'Macedonia', phoneCode: '+389' },
  { countryId: 133, code: 'ML', name: 'Mali', phoneCode: '+223' },
  { countryId: 127, code: 'MO', name: 'Macau', phoneCode: '+853' },
  { countryId: 136, code: 'MQ', name: 'Martinique', phoneCode: '+596' },
  { countryId: 134, code: 'MT', name: 'Malta', phoneCode: '+356' },
  { countryId: 132, code: 'MV', name: 'Maldives', phoneCode: '+960' },
  { countryId: 130, code: 'MW', name: 'Malawi', phoneCode: '+265' },
  { countryId: 131, code: 'MY', name: 'Malaysia', phoneCode: '+60' },
  { countryId: 150, code: 'NA', name: 'Namibia', phoneCode: '+264' },
  { countryId: 155, code: 'NC', name: 'New Caledonia', phoneCode: '+687' },
  { countryId: 158, code: 'NE', name: 'Niger', phoneCode: '+227' },
  { countryId: 157, code: 'NI', name: 'Nicaragua', phoneCode: '+505' },
  { countryId: 153, code: 'NL', name: 'Netherlands', phoneCode: '+31' },
  { countryId: 152, code: 'NP', name: 'Nepal', phoneCode: '+977' },
  { countryId: 151, code: 'NR', name: 'Nauru', phoneCode: '+674' },
  { countryId: 156, code: 'NZ', name: 'New Zealand', phoneCode: '+64' },
  { countryId: 164, code: 'OM', name: 'Oman', phoneCode: '+968' },
  { countryId: 168, code: 'PA', name: 'Panama', phoneCode: '+507' },
  { countryId: 171, code: 'PE', name: 'Peru', phoneCode: '+51' },
  { countryId: 78, code: 'PF', name: 'French Polynesia', phoneCode: '+689' },
  { countryId: 169, code: 'PG', name: 'Papua New Guinea', phoneCode: '+675' },
  { countryId: 172, code: 'PH', name: 'Philippines', phoneCode: '+63' },
  { countryId: 165, code: 'PK', name: 'Pakistan', phoneCode: '+92' },
  { countryId: 174, code: 'PL', name: 'Poland', phoneCode: '+48' },
  {
    countryId: 186,
    code: 'PM',
    name: 'Saint Pierre and Miquelon',
    phoneCode: '+508'
  },
  { countryId: 173, code: 'PN', name: 'Pitcairn Island', phoneCode: null },
  { countryId: 167, code: 'PS', name: 'Palestinian State', phoneCode: '+970' },
  { countryId: 166, code: 'PW', name: 'Palau', phoneCode: '+680' },
  { countryId: 170, code: 'PY', name: 'Paraguay', phoneCode: '+595' },
  { countryId: 177, code: 'QA', name: 'Qatar', phoneCode: '+974' },
  { countryId: 178, code: 'RE', name: 'Reunion', phoneCode: '+262' },
  { countryId: 179, code: 'RO', name: 'Romania', phoneCode: '+40' },
  { countryId: 181, code: 'RU', name: 'Russian Federation', phoneCode: '+7' },
  { countryId: 182, code: 'RW', name: 'Rwanda', phoneCode: '+250' },
  { countryId: 191, code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
  { countryId: 183, code: 'SH', name: 'Saint Helena', phoneCode: '+290' },
  { countryId: 189, code: 'SM', name: 'San Marino', phoneCode: '+378' },
  {
    countryId: 190,
    code: 'ST',
    name: 'Sao Tome and Principe',
    phoneCode: '+239'
  },
  { countryId: 180, code: 'SU', name: 'Russia - USSR', phoneCode: null },
  { countryId: 67, code: 'SV', name: 'El Salvador', phoneCode: '+503' },
  { countryId: 43, code: 'TD', name: 'Chad', phoneCode: '+235' },
  { countryId: 222, code: 'TE', name: 'Tromelin Island', phoneCode: null },
  {
    countryId: 79,
    code: 'TF',
    name: 'French Southern Territories and Antarctic Lands',
    phoneCode: null
  },
  { countryId: 218, code: 'TG', name: 'Togo', phoneCode: null },
  { countryId: 216, code: 'TH', name: 'Thailand', phoneCode: '+66' },
  { countryId: 214, code: 'TJ', name: 'Tajikistan', phoneCode: '+992' },
  { countryId: 219, code: 'TK', name: 'Tokelau', phoneCode: '+690' },
  { countryId: 217, code: 'TL', name: 'Timor-Leste', phoneCode: '+670' },
  { countryId: 220, code: 'TO', name: 'Tonga', phoneCode: '+676' },
  { countryId: 64, code: 'TP', name: 'East Timor', phoneCode: '+670' },
  {
    countryId: 221,
    code: 'TT',
    name: 'Trinidad and Tobago',
    phoneCode: '+1-868'
  },
  { countryId: 213, code: 'TW', name: 'Taiwan', phoneCode: '+886' },
  { countryId: 215, code: 'TZ', name: 'Tanzania', phoneCode: '+255' },
  { countryId: 229, code: 'UA', name: 'Ukraine', phoneCode: '+380' },
  { countryId: 228, code: 'UG', name: 'Uganda', phoneCode: '+256' },
  {
    countryId: 233,
    code: 'UM',
    name: 'United States Minor Outlying Islands',
    phoneCode: null
  },
  { countryId: 232, code: 'US', name: 'United States', phoneCode: '+1' },
  { countryId: 234, code: 'UY', name: 'Uruguay', phoneCode: '+598' },
  { countryId: 235, code: 'UZ', name: 'Uzbekistan', phoneCode: '+998' },
  {
    countryId: 187,
    code: 'VC',
    name: 'Saint Vincent and the Grenadines',
    phoneCode: '+1-784'
  },
  {
    countryId: 241,
    code: 'VQ',
    name: 'US Virgin Islands',
    phoneCode: '+1-340'
  },
  {
    countryId: 242,
    code: 'WF',
    name: 'Wallis and Futuna Islands',
    phoneCode: '+681'
  },
  { countryId: 188, code: 'WS', name: 'Samoa', phoneCode: '+685' },
  { countryId: 244, code: 'YE', name: 'Yemen', phoneCode: '+967' },
  { countryId: 245, code: 'YU', name: 'Yugoslavia', phoneCode: null },
  { countryId: 247, code: 'ZM', name: 'Zambia', phoneCode: '+260' },
  { countryId: 246, code: 'ZR', name: 'Zaire', phoneCode: null },
  { countryId: 248, code: 'ZW', name: 'Zimbabwe', phoneCode: '+263' },
  { countryId: 236, code: 'VU', name: 'Vanuatu', phoneCode: '+678' },
  { countryId: 237, code: 'VA', name: 'Vatican City State', phoneCode: '+418' },
  { countryId: 238, code: 'VE', name: 'Venezuela', phoneCode: '+58' },
  { countryId: 239, code: 'VN', name: 'Vietnam', phoneCode: '+84' }
]

export const Config = AppConfig.config
