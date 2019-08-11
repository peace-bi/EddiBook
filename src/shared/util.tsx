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

export const Config = AppConfig.config

export const formatBytes = (bytes: number, decimals?: number) => {
  if (bytes === 0) { return '0 Bytes' }
  const k = 1024
  const dm = (!decimals || decimals <= 0) ? 0 : decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
