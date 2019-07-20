import axios from 'axios'
import * as t from 'io-ts'
import { from, Observable, of } from 'rxjs'

import { Either, Left, Right } from 'fp-ts/lib/Either'
import { TypeOf } from 'io-ts'
import { catchError, take, timeout } from 'rxjs/operators'
import { Config } from './util'

interface RequestParam {
  url: string
  method: 'POST' | 'GET'
  param?: any
  type?: 'form' | 'json'
}

interface ApiError {
  error: string
  errorDescription: string
}

interface ApiResponse<T> {
  result: T
  status: number
}

const headers: { [s: string]: any } = {
  Authorization: 'Basic YnJvd3Nlcjo='
}

export const requestApiEither: (
  param: RequestParam
) => <T>(codec: t.Type<T>) => Observable<Either<ApiError, ApiResponse<T>>> = (
  param
) => (codec) => {
  const env = !!__DEV__ ? 'DEV' : 'PROD'
  const url = `${Config.HOST[env].API}/${param.url}`
  return from(
    axios
      .request({
        url,
        method: param.method,
        headers
      })
      .then(({ data, status }) => {
        const decodeResult = codec.decode(data)

        return decodeResult.fold<
          Either<ApiError, ApiResponse<TypeOf<typeof codec>>>
        >(
          () => {
            return new Left({
              error: 'DECODE FAIL',
              errorDescription: 'DECODE FAIL'
            })
          },
          (result) => {
            return new Right({
              result,
              status
            })
          }
        )
      })
  ).pipe(
    take(1),
    timeout(20000),
    catchError((e) =>
      of(
        new Left<ApiError, ApiResponse<TypeOf<typeof codec>>>({
          error: e.response.data.error,
          errorDescription: e.response.status
        })
      )
    )
  )
}

export function getHost() {
  const env = !!__DEV__ ? 'DEV' : 'PROD'
  return Config.HOST[env].API
}

export const requestApi: (
  param: RequestParam
) => <T>(codec: t.Type<T>) => Observable<ApiResponse<T>> = (param) => (
  codec
) => {
  const url = `${getHost()}/${param.url}`
  if (param.type === 'json') {
    headers['Content-Type'] = 'application/json'
  }

  // Hard header
  if (__DEV__) {
    headers['Authorization'] = 'bearer 6a641c66-dd44-40dd-a4ed-0d9b013f1ab8'
  }

  const parameters =
    param.type && param.type === 'json'
      ? {
          data: param.param
        }
      : {
          params: param.param
        }

  return from(
    axios
      .request({
        url,
        method: param.method,
        headers,
        ...parameters
      })
      .then(({ data, status }) => {
        const decodeResult = codec.decode(data)

        return decodeResult.fold<ApiResponse<TypeOf<typeof codec>>>(
          () => {
            throw {
              response: {
                data: {
                  error: 'JSON Decode Fail',
                  error_description: 'JSON Decode Fail'
                }
              }
            }
          },
          (result) => {
            return {
              result,
              status
            }
          }
        )
      })
      .catch((e) => {
        if (e.response) {
          throw {
            error: e.response.data.error,
            errorDescription: e.response.error_description
          } as ApiError
        } else {
          throw e
        }
      })
  ).pipe(
    take(1),
    timeout(20000)
  )
}
