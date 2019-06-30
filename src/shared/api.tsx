// import axios from 'axios'
// import { AsyncStorage } from 'react-native'
// import { from, Observable } from 'rxjs'
// import { exhaustMap, map, tap } from 'rxjs/operators'
// import { Config, log as SysLog } from 'shared/utility'

// import { Header, Response } from './model'

// interface RequestParam {
//   url: string
//   method: 'POST' | 'GET'
//   param?: any
//   option?: {
//     port?: 'API' | 'ELASTIC'
//     format?: 'form' | 'json'
//   }
// }
// const headers = new Header()

// export function request<T>(param: RequestParam): Observable<Response<T>> {
//   const keys = ['jwt', 'language']
//   const port: string = (param.option && param.option.port) || 'API'
//   const env = !!__DEV__ ? 'DEV' : 'PROD'
//   const url = `${(Config.HOST as any)[env][port]}/mobile/${param.url}`
//   const parameters = param.param
//   if (param.option && param.option.format === 'json') {
//     headers.setHeader({ 'Content-Type': 'application/json' })
//     headers.setHeader({ accept: 'application/json' })
//   } else {
//     headers.setHeader({ 'Content-Type': 'application/x-www-form-urlencoded' })
//   }
//   return from(AsyncStorage.multiGet(keys)).pipe(
//     tap((values) => {
//       const token = values[0][1]
//       const language = values[1][1] || 'en'
//       headers.setHeader({ 'Accept-Language': language })
//       return (
//         !url.match(/\/rest\//g) &&
//         url.match(/\/me\//g) &&
//         token &&
//         headers.setHeader({ Authorization: token })
//       )
//     }),
//     exhaustMap(() =>
//       from(
//         axios.request({
//           url,
//           timeout: 10000,
//           headers: headers.getSnapshot(),
//           method: param.method || 'POST',
//           params: parameters,
//           ...(param.option && param.option.format === 'json'
//             ? { data: parameters, params: {} }
//             : { params: parameters })
//         })
//       ).pipe(
//         map((result) => result.data as Response<T> | any),
//         tap((result) => log(url, parameters, result))
//       )
//     )
//   )
// }
// function log(url: string, parameters: any, result: any) {
//   SysLog(
//     '--------------------------\n',
//     'Request data:',
//     '\nURL:           ',
//     url,
//     '\nParam:         ',
//     JSON.stringify(parameters, null, ' '),
//     '\nResponse Data: ',
//     JSON.stringify(result, null, ' ') || true,
//     '\n--------------------------'
//   )
// }
