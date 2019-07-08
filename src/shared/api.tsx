import RNFetchBlob, { FetchBlobResponse, StatefulPromise } from 'rn-fetch-blob'
import { Config } from './util'

interface RequestParam {
  url: string
  method: 'POST' | 'GET'
  param?: any
}

const headers: { [s: string]: any } = {
  'Content-Type': 'application/json'
}

export function requestApi(
  param: RequestParam
): StatefulPromise<FetchBlobResponse> {
  const env = !!__DEV__ ? 'DEV' : 'PROD'
  const url = `${Config.HOST[env].API}/${param.url}`
  const parameters = param.param
  console.info(url)
  return RNFetchBlob.fetch(param.method, url, headers, parameters)
}
