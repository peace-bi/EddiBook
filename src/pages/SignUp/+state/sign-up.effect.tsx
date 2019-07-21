import * as io from 'io-ts'
import { requestApi } from 'shared/api'

import { SignUpForm } from '../sign-up.model'
import { SignUpFailed, SignUpSuccess } from './sign-up.actions'

// http://192.168.2.40:9000/uaa/oauth/token

export function SignUp(data: SignUpForm) {
  return (dispatch: any): Promise<{ type: string; payload: any }> =>
    requestApi({
      url: 'account/users/signup',
      method: 'POST',
      param: data,
      type: 'json'
    })(io.any)
      .toPromise()
      .then((res) => dispatch(SignUpSuccess.get(res as any)))
      .catch((err) => dispatch(SignUpFailed.get(err)))
}
