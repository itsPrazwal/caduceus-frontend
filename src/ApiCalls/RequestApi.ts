import {
  ApiResponseType, FieldTypeAmbulanceRequest,
  FieldTypeRequestCreate,
  FieldTypeRequestMain, FunctionWithNoParamButReturn,
  FunctionWithParamAndReturn,
  Nullable
} from '../Utils/Types'
import { AxiosResponse } from 'axios'
import sendRequest from '../Utils/httpRequest/sendRequest'
import { apiEndPoints } from './ApiConstants'

const apiCreateRequest:FunctionWithParamAndReturn<FieldTypeRequestCreate,Promise<Nullable<'SUCCESS'>>> = data => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeRequestMain>> = await sendRequest('POST', apiEndPoints.request.create, true, data)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? 'SUCCESS' : null)
    }catch (err){
      if(err)
        console.error('Error fetching Hospital: ',err)
    }
    resolve(null)
  })
}

const apiGetRequestList:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeRequestMain[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeRequestMain[]>> = await sendRequest('GET', apiEndPoints.request.get, true)
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

const apiUpdateRequestList:FunctionWithParamAndReturn<FieldTypeRequestMain, Promise<Nullable<FieldTypeRequestMain>>> = data => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeRequestMain>> = await sendRequest('PUT', apiEndPoints.request.update, true, data)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching Hospital: ', err)
    }
    resolve(null)
  })
}

const apiCreateAmbulanceRequest:FunctionWithParamAndReturn<FieldTypeAmbulanceRequest,Promise<Nullable<'SUCCESS'>>> = data => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeAmbulanceRequest>> = await sendRequest('POST', apiEndPoints.ambulanceRequest, false, data)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? 'SUCCESS' : null)
    }catch (err){
      if(err)
        console.error('Error fetching Hospital: ',err)
    }
    resolve(null)
  })
}

export { apiCreateRequest, apiGetRequestList, apiUpdateRequestList, apiCreateAmbulanceRequest }
