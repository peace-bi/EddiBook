import axios from 'axios'
import * as t from 'io-ts'
import { from, Observable, of, throwError } from 'rxjs'

import { Either, Left, Right } from 'fp-ts/lib/Either'
import { TypeOf } from 'io-ts'
import { catchError, flatMap, map, take, tap, timeout } from 'rxjs/operators'
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
        catchError((err: any, source) => {
          if (err.response) {
            if (err.response.data.error === 'invalid_token') {
              return refreshToken(refresh_token, source)
            }
            return throwError(err.response.data)
          }
          return throwError(err)
        })
      )
    ),
    take(1),
    timeout(20000)
  )
}

function refreshToken(
  refresh_token: string,
  source: Observable<unknown>
): Observable<any> {
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
    tap((res: any) => {
      Storage.getInstance().setToken({
        jwt: res.access_token,
        refresh: res.refresh_token
      })
    }),
    flatMap(() => source),
    catchError(() =>
      throwError({
        response: {
          data: {
            error: 'Refresh Token Fail',
            error_description: 'Can not refresh token'
          }
        }
      })
    )
  )
}
