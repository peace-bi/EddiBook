import axios from 'axios'
import * as t from 'io-ts'
import { EMPTY, from, Observable, of, throwError } from 'rxjs'

import { Either, Left, Right } from 'fp-ts/lib/Either'
import { TypeOf } from 'io-ts'
import {
  catchError,
  flatMap,
  map,
  retryWhen,
  scan,
  switchMap,
  take,
  takeWhile,
  timeout
} from 'rxjs/operators'
import { Storage } from './storage'
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
          (e) => {
            console.info(e)
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
  return `${Config.HOST[env].API}/`
}

const requestHttp = (
  url: string,
  method: string,
  headers: any,
  parameters: any
) => {
  return axios.request({
    url,
    method,
    headers,
    ...parameters
  })
}

export const requestApi: (
  param: RequestParam
) => <T>(codec: t.Type<T>) => Observable<ApiResponse<T>> = (param) => (
  codec
) => {
  const url = `${getHost()}${param.url}`
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
  return from(Storage.getInstance().getToken()).pipe(
    map((token) => {
      const { jwt, refresh } = token
      if (jwt) {
        headers.Authorization = `bearer ${jwt}`
      } else {
        headers.Authorization = `Basic YnJvd3Nlcjo=`
      }
      return [headers, refresh] as [any, string]
    }),
    flatMap(([_headers, refresh_token]: [any, string]) =>
      from(
        requestHttp(url, param.method, _headers, parameters).then(
          ({ data, status }) => {
            const decodeResult = codec.decode(data)

            return decodeResult.fold<ApiResponse<TypeOf<typeof codec>>>(
              (e) => {
                console.info(e)
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
          }
        )
      ).pipe(
        retryWhen((errors) => {
          return refresh(errors, refresh_token)
        })
        // catchError((err: any, source) => {
        //   if (err.response) {
        //     if (err.response.data.error === 'invalid_token') {
        //       refreshToken(refresh_token, source).pipe(
        //         first()
        //       ).subscribe()
        //       return throwError({
        //         response: {
        //           data: {
        //             error: 'Refresh Token Fail',
        //             error_description: 'Can not refresh token'
        //           }
        //         }
        //       })
        //     }
        //     return throwError(err.response.data)
        //   }
        //   return throwError(err)
        // })
      )
    ),
    take(1),
    timeout(20000)
  )
}

function refresh(obs: Observable<any>, refreshToken: string): Observable<any> {
  return obs.pipe(
    switchMap((err) => {
      if (err.response) {
        if (err.response.data.error === 'invalid_token') {
          return of(err)
        }
        return throwError(err.response.data)
      }
      return throwError(err)
    }),
    scan((acc) => {
      return acc + 1
    }, 0),
    takeWhile((acc) => acc < 3),
    flatMap(() => {
      return fetchNewToken(refreshToken)
    })
  )
}

function fetchNewToken(refresh_token: string): Observable<any> {
  return from(
    requestHttp(
      `${getHost()}uaa/oauth/token`,
      'POST',
      {
        Authorization: 'Basic YnJvd3Nlcjo=',
        'Content-Type': 'application/json'
      },
      {
        data: {
          refresh_token,
          grant_type: 'refresh_token'
        }
      }
    )
  ).pipe(
    flatMap((res: any) => {
      const data = res.data
      Storage.getInstance().setToken({
        jwt: data.access_token,
        refresh: data.refresh_token
      })

      // Stop retry fetch token
      return EMPTY
    }),
    catchError((err) => {
      // Retry fetch token
      return of(err)
    })
  )
}
