import { ChangeEventHandler, FC, FormEventHandler, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { AuthLayout, Button, Input } from 'Components'

import { apiAuthSignIn } from 'ApiCalls/AuthApi'

import { validateEmail } from 'Utils/validations'
import { ApiErrorObject, Nullable } from 'Utils/Types/main'
import { AuthPagesLabels } from 'Utils/enum'

import { setLocalStorageAfterLogin } from 'Utils/UtilFunctions'
import { useUserContext } from '../../Context'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface FieldTypeLogin {
    emailId: string,
    password: string,
}

const initialState = {
  emailId: '',
  password: ''
}

const Login:FC = () => {
  const [formState, setFormState] = useState<FieldTypeLogin>(initialState)
  const [errorState, setErrorState] = useState<Nullable<{emailId?: string, password?: string}>>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()
  const { setUserByData } = useUserContext()

  const emailIdRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleChange:ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
    errorState && delete errorState[name]
  }

  const handleSubmit:FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if(validFormState()){
      setIsSubmitting(true)
      try {
        const res = await apiAuthSignIn(formState)
        toast('You have been logged in.')
        const { token, ...restData } = res.data
        setUserByData(restData)
        await setLocalStorageAfterLogin({ id: restData._id, token })
        await router.push('/')
      }catch (err){
        const { response } = err as AxiosError<ApiErrorObject>
        const errorMessage = response?.data?.message || 'Error login'
        setErrorState({ password: errorMessage })
        passwordRef.current?.focus()
        toast.error(errorMessage)
      }
      setIsSubmitting(false)
    }
  }

  const validFormState = ():boolean => {
    let _error:FieldTypeLogin = {} as FieldTypeLogin
    if(!formState.password) {
      _error.password = 'Password is required.'
      passwordRef.current?.focus()
    }
    if(!validateEmail(formState.emailId)) {
      _error.emailId = 'Please enter valid emailId address.'
      emailIdRef.current?.focus()
    }
    if(!formState.emailId) {
      _error.emailId = 'Email Address is required.'
      emailIdRef.current?.focus()
    }
    setErrorState(_error)
    return Object.keys(_error).length === 0
  }

  return(
    <AuthLayout authPageLabel={AuthPagesLabels?.LOGIN} showForgotLink={true} showSignUpLink={true}>
      <form onSubmit={handleSubmit}>
        <Input ref={emailIdRef} autoFocus={true} error={errorState?.emailId || null} type='text' name='emailId' placeholder='Email Address' value={formState.emailId} category='small' onChange={handleChange} />
        <Input ref={passwordRef} error={errorState?.password || null} type='password' name='password' placeholder='Password' value={formState.password} category='small' onChange={handleChange} />
        <Button loading={isSubmitting} type='submit' >Submit</Button>
      </form>
    </AuthLayout>
  )
}

export default Login
