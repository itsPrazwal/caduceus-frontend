import { FunctionWithNoParamButReturn, FunctionWithParam, FunctionWithParamAndReturn, Nullable } from './Types'
import { validateLogin } from './checkLogin'
import { LocalStorageKeys } from './localStorage'

export const generateDisplayEmail:FunctionWithParamAndReturn<string, string> = email => {
  const atIndex = email.indexOf('@')
  return `${email.slice(0,2)}****${email.slice(atIndex)}`
}

export const capitalizeFirstLetterOfEachWord:FunctionWithParamAndReturn<string, string> =
    sentence => sentence.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')


export const tokenAssembler = ():Nullable<string> => {
  return validateLogin()
    ? `${localStorage.getItem(LocalStorageKeys.TOKEN_1)}.${localStorage.getItem(LocalStorageKeys.TOKEN_2)}.${localStorage.getItem(LocalStorageKeys.TOKEN_3)}`
    : null
}

export const setLocalStorageAfterLogin:FunctionWithParam<{ id: string, token: string }> = async ({ token, id }) => {
  const splitArray = token.split('.')
  await localStorage.setItem(LocalStorageKeys.TOKEN_1, splitArray[0])
  await localStorage.setItem(LocalStorageKeys.TOKEN_2, splitArray[1])
  await localStorage.setItem(LocalStorageKeys.TOKEN_3, splitArray[2])
  await localStorage.setItem(LocalStorageKeys.USER_ID, id)
  await localStorage.setItem(LocalStorageKeys.EXPIRY, Date.now().toString())
}

export const getYearList:FunctionWithNoParamButReturn<string[]> = () => {
  const currentYear = new Date().getFullYear()
  let years:string[] = [] as string[]
  Array.from(Array(150)).map((_, i) => {
    years.push((currentYear - i).toString())
  })
  return years
}

export const isNumber:FunctionWithParamAndReturn<string, boolean> = str => /^-?[\d.]+(?:e-?\d+)?$/.test(str)

