import { GenericObject, Nullable } from './Types'

export enum LocalStorageKeys {
  RESET_STATE = 'rsi',
  LOGIN_FIELD = 'lfs',
  CONFIRM_USER = 'cfu',
  OTP_ACTIVATE_TIME = 'oat',
  REGISTER_STATE = 'reg',
  TOKEN_1='uni',
  TOKEN_2='cov',
  TOKEN_3='lod',
  EXPIRY='uep',
  USER_ID='uri',
}

export const updateStorage = (storageKey: LocalStorageKeys, value: GenericObject) => {
  window.localStorage && window.localStorage.setItem(storageKey, JSON.stringify(value))
}

export const removeStorage = (storageKey: LocalStorageKeys) => {
  window.localStorage && window.localStorage.removeItem((storageKey))
}

export const getFromStorage = <T>(storageKey: LocalStorageKeys):Nullable<T> => {
  let item = null
  try {
    item = window.localStorage ? JSON.parse(window.localStorage.getItem(storageKey) || '') : null
    return item
  } catch {
    return item
  }
}
