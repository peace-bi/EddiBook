export interface SignUpState {
  index: number
}

export interface SignUpForm {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface SignUpSuccessResponse {
  email: string
  firstName: string
  lastName: string
}
