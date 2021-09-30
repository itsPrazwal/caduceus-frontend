import { AxiosResponse } from 'axios'

import sendRequest from 'Utils/httpRequest/sendRequest'

import {
  FieldTypeChangePassword,
  FieldTypeForgotPassword,
  FieldTypeLogin, FieldTypeRegister,
  FieldTypeResetPassword,
  FieldTypeUserData,
  FieldTypeVerifyUser, FunctionWithNoParamButReturn, FunctionWithParamAndReturn
} from 'Utils/Types'

import { apiEndPoints } from './ApiConstants'

const apiAuthGetUser:FunctionWithNoParamButReturn<Promise<AxiosResponse<FieldTypeUserData>>> = () => {
  return sendRequest('GET', apiEndPoints.auth.getUser, true )
}

const apiAuthSignIn:FunctionWithParamAndReturn<FieldTypeLogin, Promise<AxiosResponse<FieldTypeUserData & { token: string }>>> = loginData => {
  return sendRequest('POST', apiEndPoints.auth.login, false, loginData )
}

const apiAuthRegister:FunctionWithParamAndReturn<FieldTypeRegister, Promise<AxiosResponse<FieldTypeUserData>>> = registerData => {
  return sendRequest('POST', apiEndPoints.auth.register, false, registerData )
}

const apiAuthForgotPassword:FunctionWithParamAndReturn<FieldTypeForgotPassword, Promise<AxiosResponse>> = forgotPasswordData => {
  return sendRequest('POST', apiEndPoints.auth.forgotPassword, false, forgotPasswordData )
}

const apiAuthVerifyOtpCode:FunctionWithParamAndReturn<FieldTypeVerifyUser, Promise<AxiosResponse>> = verifyOtpData => {
  return sendRequest('POST', apiEndPoints.auth.verifyUser, false, verifyOtpData )
}

const apiAuthResetPassword:FunctionWithParamAndReturn<FieldTypeResetPassword, Promise<AxiosResponse>> = resetPasswordData => {
  return sendRequest('PUT', apiEndPoints.auth.resetPassword, false, resetPasswordData )
}

const apiAuthChangePassword:FunctionWithParamAndReturn<FieldTypeChangePassword, Promise<AxiosResponse>> = changePasswordData => {
  return sendRequest('PUT', apiEndPoints.auth.changePassword, true, changePasswordData )
}

const apiAuthResendOtp:FunctionWithParamAndReturn<FieldTypeForgotPassword, Promise<AxiosResponse>> = resendOtpData => {
  return sendRequest('PUT', apiEndPoints.auth.resendOtp, false, resendOtpData )
}

export { apiAuthGetUser, apiAuthSignIn, apiAuthForgotPassword, apiAuthChangePassword, apiAuthResetPassword, apiAuthVerifyOtpCode, apiAuthResendOtp, apiAuthRegister }
