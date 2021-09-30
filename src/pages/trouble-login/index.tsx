import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthLayout, EnterEmailForm, EnterPasswordForm, OTPForm } from 'Components'

import { AuthPagesLabels } from 'Utils/enum'

import { apiAuthForgotPassword, apiAuthResetPassword } from 'ApiCalls/AuthApi'

import {
  ErrorObject,
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types/main'
import { generateDisplayEmail } from 'Utils/UtilFunctions'
import { FieldTypeResetPassword } from 'Utils/Types'
import { LocalStorageKeys } from 'Utils/localStorage'

const initialResetPasswordState = {
  emailId: '',
  otpCode: '',
  password: '',
  isChanging: {
    status: false,
    time: 0
  }
}

interface ResetPasswordFieldType extends FieldTypeResetPassword{
  isChanging: {
    status: boolean,
    time: number
  }
}

interface ErrorStateType {
  emailId: Nullable<string>,
  otpCode: Nullable<string>,
  password: Nullable<string>
}

const initialErrorState = {
  emailId: null,
  otpCode: null,
  password: null,
}

const TroubleLogin:FC = () => {
  const [currentState, setCurrentState] = useState<AuthPagesLabels>(AuthPagesLabels.EMAIL)
  const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordFieldType>(initialResetPasswordState)
  const [errorState, setErrorState] = useState<ErrorStateType>(initialErrorState)

  const router = useRouter()

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const localData = await localStorage.getItem(LocalStorageKeys.RESET_STATE)
        if(localData && JSON.parse(localData)){
          const parsedData:ResetPasswordFieldType = JSON.parse(localData)
          if(parsedData.isChanging.status && (parsedData.isChanging.time + 300000) > Date.now()){
            let toUpdateData:ResetPasswordFieldType = {} as ResetPasswordFieldType
            Object.keys(parsedData).map(pd => {
              if(parsedData[pd]){
                toUpdateData = { ...toUpdateData, [pd]: parsedData[pd] }
              }
            })
            if(toUpdateData.emailId) setCurrentState(AuthPagesLabels.OTP)
            if(toUpdateData.otpCode) setCurrentState(AuthPagesLabels.PASSWORD)
            setResetPasswordState(toUpdateData)
          }else{
            await localStorage.removeItem(LocalStorageKeys.RESET_STATE)
          }
        }
      }catch (err){
        console.error(err)
      }
    }
    getDataFromLocal()
  }, [])

  useEffect(() => {
    if(resetPasswordState.isChanging.status)
      localStorage.setItem(LocalStorageKeys.RESET_STATE, JSON.stringify(resetPasswordState))
  }, [resetPasswordState])


  const onEnterEmailFinish:FunctionWithParam<string> = async emailId => {
    setResetPasswordState(prevState => ({ ...prevState, emailId, isChanging: { status: true, time: Date.now() } }))
    try{
      await apiAuthForgotPassword({ emailId })
      setCurrentState(AuthPagesLabels.OTP)
      setErrorState(prevState => ({ ...prevState, emailId: null }))
    } catch (err){
      const { error } = err as ErrorObject
      setErrorState(prevState => ({ ...prevState, emailId: error }))
    }
  }

  const onOTPFinish:FunctionWithParam<string> = otp => {
    setResetPasswordState(prevState => ({ ...prevState, otpCode: otp, isChanging: { status: true, time: Date.now() } }))
    setCurrentState(AuthPagesLabels.PASSWORD)
  }

  const onChangePasswordFinish:FunctionWithParam<string> = async password => {
    try{
      await apiAuthResetPassword({ emailId: resetPasswordState.emailId, otpCode: resetPasswordState.otpCode, password })
      setErrorState(initialErrorState)
      setResetPasswordState(initialResetPasswordState)
      localStorage.removeItem(LocalStorageKeys.RESET_STATE)
      await router.push('/login')
    }catch (err){
      setErrorState(prevState => ({ ...prevState, otpCode: 'Invalid verification code provided, please try again.' }))
      setCurrentState(AuthPagesLabels.OTP)
    }
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = async () => {
    try{
      await apiAuthForgotPassword({ emailId: resetPasswordState.emailId })
      setErrorState(prevState => ({ ...prevState, otpCode: null }))
      return 'SUCCESS'
    }catch (err){
      const { error } = err as ErrorObject
      setErrorState(prevState => ({ ...prevState, otpCode: error }))
      return 'FAILURE'
    }
  }

  const clearOtpError:FunctionWithNoParam = () => {
    setErrorState(prevState => ({ ...prevState, otpCode: null }))
  }

  return (
    <AuthLayout
      authPageLabel={currentState}
      additionalData={{ description: currentState === AuthPagesLabels.OTP ? generateDisplayEmail(resetPasswordState.emailId) : '' }}
      showLoginLink={true}
    >
      {currentState === AuthPagesLabels.EMAIL
        ? <EnterEmailForm submitForm={onEnterEmailFinish} propError={errorState.emailId} />
        : currentState === AuthPagesLabels.OTP
          ? <OTPForm
            otpResendFunction={handleOtpResend}
            error={errorState.otpCode}
            clearError={clearOtpError}
            handleSubmit={onOTPFinish}
            otpLength={6}
          />
          : currentState === AuthPagesLabels.PASSWORD
            ? <EnterPasswordForm submitForm={onChangePasswordFinish} propError={errorState.password}/>
            : null}
    </AuthLayout>
  )
}

export default TroubleLogin
