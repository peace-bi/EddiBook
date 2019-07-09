import axios from 'axios'
// tslint:disable-next-line: import-blacklist
import { from, Observable } from 'rxjs'

import { take, timeout } from 'rxjs/operators'
import { Config } from './util'

interface RequestParam {
  url: string
  method: 'POST' | 'GET'
  param?: any
}

const headers: { [s: string]: any } = {
  Authorization: 'Basic YnJvd3Nlcjo='
}

export function requestApi<T>(
  param: RequestParam
): Observable<{ result: T | string; status: number }> {
  const env = !!__DEV__ ? 'DEV' : 'PROD'
  const url = `${Config.HOST[env].API}/${param.url}`
  const parameters = param.param
  return from(
    axios
      .request({
        url,
        method: param.method,
        data: parameters,
        headers
      })
      .then(({ data, status }) => ({ result: data, status }))
      .catch((e) => {
        throw {
          result: e.response.data.error,
          status: e.response.status
        }
      })
  ).pipe(
    take(1),
    timeout(20000)
  )
}
