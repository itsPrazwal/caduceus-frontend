import { NextPage } from 'next'
import { useState } from 'react'
import { AuthLayout, FieldTypeRegisterSubmit, FormUserRegister, FormUserType, OTPForm, } from 'Components'
import { AuthPagesLabels, UserType } from 'Utils/enum'
import { FieldTypeRegister, FunctionWithNoParamButReturn, FunctionWithParam, Nullable } from 'Utils/Types'
import { apiAuthRegister, apiAuthSignIn, apiAuthVerifyOtpCode } from 'ApiCalls/AuthApi'
import { LocalStorageKeys, getFromStorage, updateStorage } from 'Utils/localStorage'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

enum RegistrationSteps {
  USER_TYPE = 'userType',
  USER_DATA = 'userData',
  OTP = 'otp'
}

const Register:NextPage = () => {

  const [userType, setUserType] = useState<Nullable<UserType>>(null)
  const [currentStep, setCurrentStep] = useState<RegistrationSteps>(RegistrationSteps.USER_TYPE)
  const [otpError, setOtpError] = useState<Nullable<string>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()

  const handleUserTypeSelect:FunctionWithParam<string> = value => {
    setUserType(value ? value as UserType : null)
    const delay = setTimeout(() => {
      setCurrentStep(RegistrationSteps.USER_DATA)
      clearTimeout(delay)
    }, 300)
  }

  const handleSubmit:FunctionWithParam<FieldTypeRegisterSubmit> = async values => {
    setIsSubmitting(true)
    const registerData:FieldTypeRegister = {
      password: values.password,
      emailId: values.emailId,
      userType: userType as UserType,
      fullName: values.fullName,
    }
    Object.assign(registerData, userType && userType === UserType.BLOOD_DONOR ? { bloodGroup: values.bloodGroup } : {})
    console.log(registerData)
    try {
      const res = await apiAuthRegister(registerData)
      if(res.data){
        toast.success('You have been registered. Please complete verification.')
        updateStorage(LocalStorageKeys.REGISTER_STATE, { ...registerData })
        setCurrentStep(RegistrationSteps.OTP)
      }
    } catch (err){
      toast.error((err as AxiosError<string>).response?.data || 'Error on registration, Please try again!')
    }
    setIsSubmitting(false)
  }

  const handleOTPSubmit:FunctionWithParam<string> = async otpCode => {
    const data = getFromStorage<FieldTypeRegister>(LocalStorageKeys.REGISTER_STATE)
    if(data){
      try{
        await toast.promise(async () => {
          await apiAuthVerifyOtpCode({ otpCode, emailId: data?.emailId || '' })
        },{ success: 'OTP verified Successfully', error: 'OTP not verified', pending: 'Verifying OTP' })
        await apiAuthSignIn({ emailId: data?.emailId, password: data?.password })
        await router.push('/')
      }catch (err){
        setOtpError(err.response.data.message || 'Error verifying OTP Code')
        console.log(err)
      }
    }else{
      setOtpError('System error, Please reload and continue.')
    }
  }

  const handleResendOtpCode:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = () => {
    return new Promise<'SUCCESS' | 'FAILURE'>(resolve => {
      resolve('SUCCESS')
    })
  }

  return(
    <AuthLayout
      authPageLabel={currentStep === RegistrationSteps.USER_TYPE ? AuthPagesLabels.SELECT_USER_TYPE : currentStep === RegistrationSteps.USER_DATA ? AuthPagesLabels.REGISTER : AuthPagesLabels.OTP}
      showLoginLink={currentStep !== RegistrationSteps.OTP}
    >
      {currentStep === RegistrationSteps.USER_TYPE
        ? <FormUserType handleAnswerSelect={handleUserTypeSelect} selectedAnswer={userType}/>
        : currentStep === RegistrationSteps.USER_DATA
          ? <FormUserRegister isBloodDonor={userType === UserType.BLOOD_DONOR} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
          : currentStep === RegistrationSteps.OTP
            ? <OTPForm otpLength={6} handleSubmit={handleOTPSubmit} error={otpError} otpResendFunction={handleResendOtpCode} clearError={() => setOtpError(null)} />
            : null
      }
    </AuthLayout>
  )
}

export default Register
