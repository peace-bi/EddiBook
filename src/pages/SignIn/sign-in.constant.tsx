import { Button } from '@ant-design/react-native'
import styled from 'styled-components/native'

export const PageContainer = styled.View`
  flex: 1;
`
export const PageWrapper = styled.View`
  max-width: 350px;
  width: 100%;
  align-self: center;
`
export const Title = styled.Text`
  text-align: center;
  font-size: 24;
  font-weight: 600;
  color: #4f4f4f;
  margin-top: 60px;
  margin-bottom: 28px;
`
export const Wrapper = styled.View`
  margin-top: 20px;
`
export const FieldLabel = styled.Text`
  color: #43484b;
  font-size: 13px;
  margin-bottom: 4px;
`
export const ForgotPasswordText = styled.Text`
  color: #1e8eeb;
`
export const SignInWrapper = styled.View`
  margin-top: 38;
`
export const SignInButton = styled(Button)`
  background-color: #f23f3c;
`
export const SignInButtonText = styled.Text`
  color: #fff;
`
export const NoAccountText = styled.Text``
export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  flex: 1;
`
export const SignUpWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  align-self: flex-end;
  margin-bottom: 30;
`
export const SignUpText = styled.Text`
  color: #f23f3c;
`
