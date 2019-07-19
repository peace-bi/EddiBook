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

// const mockApi = () =>
//   Promise.resolve({
//     data: {
//       username: 'Bi'
//     },
//     status: 200
//   })

// const mockApi = () =>
//   Promise.reject({
//     response: {
//       data: {
//         error: 'Test error'
//       },
//       status: 401
//     }
//   })

export const requestApi: (
  param: RequestParam
) => <T>(codec: t.Type<T>) => Observable<ApiResponse<T>> = (param) => (
  codec
) => {
  const env = !!__DEV__ ? 'DEV' : 'PROD'
  const url = `${Config.HOST[env].API}/${param.url}`
  if (param.type === 'json') {
    headers['Content-Type'] = 'application/json'
  }
  const parameters =
    param.type && param.type === 'json'
      ? {
          data: param.param
        }
      : {
          params: param.param
        }
  // const methodCall = mockApi
  const methodCall = () =>
    axios.request({
      url,
      method: param.method,
      // data: parameters,
      headers,
      ...parameters
    })

  return from(
    methodCall()
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
        throw {
          error: e.response.data.error,
          errorDescription: e.response.error_description
        } as ApiError
      })
  ).pipe(
    take(1),
    timeout(20000)
  )
}
