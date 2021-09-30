import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { useUserContext } from 'Context/UserProvider'

import { AuthLayout, OTPForm } from 'Components'

import { AuthPagesLabels } from 'Utils/enum'
import {
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'
import { generateDisplayEmail } from 'Utils/UtilFunctions'
import { apiAuthResendOtp, apiAuthVerifyOtpCode } from '../../ApiCalls/AuthApi'
import { toast } from 'react-toastify'

export const VerifyUser:NextPage = () => {

  const { user: { userData } } = useUserContext()
  const [error, setError] = useState<Nullable<string>>(null)

  useEffect(() => {
    toast.warning('Please complete the verification to continue...')
  }, [])

  const handleSubmit:FunctionWithParam<string> = async value => {
    try{
      await apiAuthVerifyOtpCode({ otpCode: value, emailId: userData?.emailId || '' })
      location.reload()
    }catch (err){
      setError(err.response.data.message || 'Error verifying OTP Code')
      console.log(err)
    }
  }

  const handleOtpResend:FunctionWithNoParamButReturn<Promise<'SUCCESS' | 'FAILURE'>> = () => {
    return new Promise(async res => {
      try{
        await toast.promise(async () => {
          await apiAuthResendOtp({ emailId: userData?.emailId || '' })
        },{ success: 'OTP code has been sent.', error: 'OTP sending failure. Please try again!', pending: 'Sending OTP...' })
        setError(null)
        res('SUCCESS')
      }catch (err){
        setError(err.message)
        res('FAILURE')
      }
    })
  }

  const clearOtpError:FunctionWithNoParam = () => {
    setError(null)
  }

  return (
    <AuthLayout authPageLabel={AuthPagesLabels?.VERIFY_USER} additionalData={userData ? { description: generateDisplayEmail(userData.emailId) } : undefined}>
      <OTPForm
        otpResendFunction={handleOtpResend}
        error={error}
        clearError={clearOtpError}
        handleSubmit={handleSubmit}
        otpLength={6}
      />
    </AuthLayout>
  )
}
