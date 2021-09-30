import { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from 'react'

import { Button, Input } from 'Components'

import { validateEmail } from 'Utils/validations'
import { FunctionWithParam, Nullable } from 'Utils/Types'

interface EnterEmailFormProps {
  submitForm: FunctionWithParam<string>,
  propError: Nullable<string>,
}

const EnterEmailForm:FC<EnterEmailFormProps> = ({ submitForm, propError }) => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<Nullable<string>>(null)

  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(propError) {
      setError(propError)
      emailRef.current?.focus()
    }
  }, [propError])

  const handleChange:ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setEmail(value)
    setError(null)
  }

  const handleSubmit:FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if(validFormState()){
      submitForm(email)
    }
  }

  const validFormState = ():boolean => {
    let _error:string = ''
    if(!validateEmail(email)) _error = 'Please enter valid email address.'
    if(!email) _error = 'Email Address is required.'
    if(_error){
      setError(_error)
      emailRef?.current?.focus()
    }
    return _error.length === 0
  }

  return(
    <form onSubmit={handleSubmit}>
      <Input ref={emailRef} autoFocus={true} error={error} type='text' name='email' placeholder='Email Address' value={email}  onChange={handleChange} />
      <Button type='submit' disabled={!!error} >Submit</Button>
    </form>
  )
}

export { EnterEmailForm }
