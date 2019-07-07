import EddiIconConfig from 'assets/icon/config.json'
import { GeolocationReturnType, StatusBar } from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { Observable } from 'rxjs/internal/Observable'
import { Observer } from 'rxjs/internal/types'
import { delay } from 'rxjs/operators'

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
