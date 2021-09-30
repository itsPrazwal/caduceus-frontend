import { apiEndPoints } from './ApiConstants'
import sendRequest from '../Utils/httpRequest/sendRequest'
import {
  ApiResponseType,
  FieldTypeAmbulance,
  FieldTypeBloodBank,
  FieldTypeDepartment,
  FieldTypeDisease, FieldTypeDoctorInfo, FieldTypeEducation,
  FieldTypeEvents,
  FieldTypeHospital, FieldTypeUserDataPublic, FieldTypeWorkExperience,
  FunctionWithNoParamButReturn, FunctionWithParamAndReturn, Nullable
} from '../Utils/Types'
import { AxiosResponse } from 'axios'
import { UserType } from '../Utils/enum'

const apiGetDisease:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeDisease[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeDisease[]>> = await sendRequest('GET', apiEndPoints.disease, true)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching Disease: ',err)
    }
    resolve(null)
  })
}
const apiGetDepartment:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeDepartment[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeDepartment[]>> = await sendRequest('GET', apiEndPoints.department, true)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching Department: ',err)
    }
    resolve(null)
  })
}
const apiGetAmbulance:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeAmbulance[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeAmbulance[]>> = await sendRequest('GET', apiEndPoints.ambulance, true)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching Ambulance: ',err)
    }
    resolve(null)
  })
}
const apiGetBloodBank:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeBloodBank[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeBloodBank[]>> = await sendRequest('GET', apiEndPoints.bloodBank, true)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching BloodBank: ',err)
    }
    resolve(null)
  })
}
const apiGetEvent:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeEvents[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeEvents[]>> = await sendRequest('GET', apiEndPoints.event, true)
      if(!res.data.result)
        throw Error('Error in data result.')
      resolve(res.data.result ? res.data.data : null)
    }catch (err){
      if(err)
        console.error('Error fetching Event: ',err)
    }
    resolve(null)
  })
}
const apiGetHospital:FunctionWithNoParamButReturn<Promise<Nullable<FieldTypeHospital[]>>> = () => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeHospital[]>> = await sendRequest('GET', apiEndPoints.hospital, true)
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

const apiGetUserByUserType:FunctionWithParamAndReturn<UserType,Promise<Nullable<FieldTypeUserDataPublic[]>>> = userType => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeUserDataPublic[]>> = await sendRequest('GET', apiEndPoints.userByType(userType), true)
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

const apiGetDoctorInfo:FunctionWithParamAndReturn<{userId: string},Promise<Nullable<FieldTypeDoctorInfo>>> = ({ userId }) => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeDoctorInfo>> = await sendRequest('GET', apiEndPoints.doctor.getByUserId(userId), true)
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

const apiUpdateDoctorInfo:FunctionWithParamAndReturn<{id: string, education?: FieldTypeEducation[], experience?: FieldTypeWorkExperience[], relatedDepartment?: string[]},Promise<Nullable<FieldTypeDoctorInfo>>> = ({ id, experience, education, relatedDepartment }) => {
  return new Promise(async resolve => {
    try{
      const res:AxiosResponse<ApiResponseType<FieldTypeDoctorInfo>> = await sendRequest('PUT', apiEndPoints.doctor.updateById(id), true, education ? { education } : experience ? { experience } : relatedDepartment ? { relatedDepartment } :{})
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
  apiGetDisease,
  apiGetDepartment,
  apiGetAmbulance,
  apiGetBloodBank,
  apiGetEvent,
  apiGetHospital,
  apiGetDoctorInfo,
  apiUpdateDoctorInfo,
  apiGetUserByUserType
}
