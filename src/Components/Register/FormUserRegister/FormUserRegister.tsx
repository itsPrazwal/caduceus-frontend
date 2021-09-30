import React, { ChangeEventHandler, FC, FormEventHandler, createRef, useEffect, useMemo, useState } from 'react'
import { Button, Input, Select, SvgIcons } from 'Components'
import {
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'
import { BloodGroup, SvgIconName } from '../../../Utils/enum'
import { validateEmail, validatePassword } from '../../../Utils/validations'
import { toast } from 'react-toastify'
import { bloodGroupList } from '../../../Utils/en'

export interface FieldTypeRegisterSubmit {
    fullName: string,
    emailId: string,
    password: string,
    bloodGroup?: BloodGroup,
}

interface FormUserRegisterProps {
    handleSubmit: FunctionWithParam<FieldTypeRegisterSubmit>,
    isSubmitting: boolean,
    isBloodDonor: boolean
}

interface RegisterErrorState {
    field: Nullable<'fullName' | 'emailId' | 'password' | 'confirmPassword' | 'bloodGroup'>,
    message: Nullable<string>
}

const initialFormState = {
  fullName: '',
  emailId: '',
  password: '',
  confirmPassword: '',
}

export const FormUserRegister:FC<FormUserRegisterProps> = ({ handleSubmit, isSubmitting, isBloodDonor }) => {

  const [formState, setFormState] = useState<FieldTypeRegisterSubmit & { confirmPassword: string }>(initialFormState)
  const [errorState, setErrorState] = useState<RegisterErrorState>({ field: null, message: null })
  const inputRefs = useMemo(() => ({
    fullName: createRef<HTMLInputElement>(),
    emailId: createRef<HTMLInputElement>(),
    password: createRef<HTMLInputElement>(),
    confirmPassword: createRef<HTMLInputElement>(),
  }), [])

  const handleInputChange:ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    setFormState(prevState => ({ ...prevState, [name]: value }))
    if(errorState.field === name)
      setErrorState({ field: null, message: null })
  }

  const handleFormSubmit:FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if(validation())
      handleSubmit(formState)
    else
      toast.warn('Please complete the registration form.')
  }

  useEffect(() => {
    if(errorState.field && errorState.message && inputRefs[errorState.field]){
      inputRefs[errorState.field].current?.focus()
    }
  }, [errorState, inputRefs])

  const validation:FunctionWithNoParamButReturn<boolean> = () => {
    let error:RegisterErrorState = { field: null, message: null }
    if(formState.confirmPassword.localeCompare(formState.password) !== 0) error = { message: 'Passwords didn\'t matched.', field: 'confirmPassword' }
    if(!formState.confirmPassword) error = { message: 'Please re-enter a password.', field: 'confirmPassword' }
    if(!validatePassword(formState.password)) error = { message: 'Password criteria doesn\'t meet.', field: 'password' }
    if(!formState.password) error = { message: 'Please enter a password.', field: 'password' }
    if(!validateEmail(formState.emailId)) error = { message: 'Please enter a valid email address.', field: 'emailId' }
    if(!formState.emailId) error = { message: 'Please enter your email address.', field: 'emailId' }
    if(!formState.fullName) error = { message: 'Please enter your full name.', field: 'fullName' }
    if(isBloodDonor && !formState.bloodGroup) error = { message: 'Please select your blood group.', field: 'bloodGroup' }
    setErrorState(error)
    return error.field === null && error.message === null
  }

  return(
    <form name='userRegistrationForm' onSubmit={handleFormSubmit}>
      {isBloodDonor
        ?
        <Select disabled={isSubmitting} error={errorState.field === 'bloodGroup' ? errorState.message : null} name='bloodGroup' placeholder='Blood Group' value={formState.bloodGroup || ''} onChange={handleInputChange}>
          <option value='' disabled selected>-- Select Your Blood Group -- </option>
          {bloodGroupList.map(bgl => <option key={bgl.value} value={bgl.value}>{bgl.displayName}</option>)}
        </Select>
        : null}
      <Input disabled={isSubmitting} autoFocus={true} ref={inputRefs.fullName} onChange={handleInputChange} error={errorState.field === 'fullName' ? errorState.message : null} value={formState.fullName} name='fullName' placeholder='Full Name'/>
      <Input disabled={isSubmitting} ref={inputRefs.emailId} onChange={handleInputChange} error={errorState.field === 'emailId' ? errorState.message : null} value={formState.emailId} name='emailId' placeholder='Email Address'/>
      <Input disabled={isSubmitting} ref={inputRefs.password} onChange={handleInputChange} error={errorState.field === 'password' ? errorState.message : null} value={formState.password} name='password' placeholder='Password' type='password' />
      <Input disabled={isSubmitting}  ref={inputRefs.confirmPassword} onChange={handleInputChange} error={errorState.field === 'confirmPassword' ? errorState.message : null} value={formState.confirmPassword} name='confirmPassword' placeholder='Confirm Password' type='password' />
      <Button
        type='submit'
        variant='primary'
        loading={isSubmitting}
      >
        Register <SvgIcons iconName={SvgIconName.ARROW_RIGHT}/>
      </Button>
    </form>
  )
}

