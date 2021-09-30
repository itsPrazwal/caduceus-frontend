import {
  ApiResponseType, FieldTypeBasicInfo,
  FieldTypeUserData, FieldTypeUserDataPublic, FunctionWithNoParamButReturn,
  FunctionWithParamAndReturn,
  Nullable
} from '../Utils/Types'
import { AxiosResponse } from 'axios'
import sendRequest from '../Utils/httpRequest/sendRequest'
import { apiEndPoints } from './ApiConstants'

const apiUpdateBasicInfo:FunctionWithParamAndReturn<FieldTypeBasicInfo, Promise<Nullable<FieldTypeUserData>>> = data => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeUserData>> = await sendRequest('PUT', apiEndPoints.user, true, data)
      if(res.data.result)
        resolve(res.data.data)
    }catch (err){
      console.log('err: ', err)
    }
    resolve(null)
  })
}

const apiGetRequestUsers:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeUserDataPublic[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeUserDataPublic[]>> = await sendRequest('GET', apiEndPoints.request.requesters, true)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching Hospital: ',err)
    }
    resolve(null)
  })
}

export {
  apiUpdateBasicInfo,
  apiGetRequestUsers
}
