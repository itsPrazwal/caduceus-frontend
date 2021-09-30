import { ReactElement, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import {
  FieldTypeDepartment,
  FieldTypeRequestMain,
  FieldTypeUserDataPublic,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'
import { apiGetRequestList } from '../ApiCalls/RequestApi'
import { useUserContext } from './UserProvider'
import { UserType } from '../Utils/enum'
import { apiGetDepartment, apiGetUserByUserType } from '../ApiCalls/DataApi'
import { apiGetRequestUsers } from '../ApiCalls/UserApi'

export const DataContext = createContext<DataContextInterface>({} as DataContextInterface)

interface DataContextInterface {
  requestList: Nullable<FieldTypeRequestMain[]>,
  bloodDonorList: Nullable<FieldTypeUserDataPublic[]>,
  requesterList: Nullable<FieldTypeUserDataPublic[]>,
  departmentList: Nullable<FieldTypeDepartment[]>,
  updateRequestListByData: FunctionWithParam<FieldTypeRequestMain>,
  loading: boolean,
  fetchList: FunctionWithParam<'REQUEST' | 'BLOOD_DONOR'>
}

interface DataContextProps{
    children: ReactElement
}

export const DataProvider = ({ children }:DataContextProps):ReactElement => {

  const { user: { userData } } = useUserContext()

  const [requestList, setRequestList] = useState<Nullable<FieldTypeRequestMain[]>>(null)
  const [bloodDonorList, setBloodDonorList] = useState<Nullable<FieldTypeUserDataPublic[]>>(null)
  const [requesterList, setRequesterList] = useState<Nullable<FieldTypeUserDataPublic[]>>(null)
  const [departmentList, setDepartmentList] = useState<Nullable<FieldTypeDepartment[]>>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const fetchRequestList = useCallback(async () => {
    setLoading(true)
    const res = await apiGetRequestList()
    setRequestList(res)
    setLoading(false)
  }, [])

  const fetchRequesters = useMemo(() => async () => {
    if(userData){
      const res = await apiGetRequestUsers()
      setLoading(true)
      setRequesterList(res)
      setLoading(false)
    }
  }, [userData])

  const fetchDepartmentList = useMemo(() => async () => {
    if(userData){
      const res = await apiGetDepartment()
      setLoading(true)
      setDepartmentList(res)
      setLoading(false)
    }
  }, [userData])

  const fetchUserByType = useMemo(() => async (type: UserType) => {
    setLoading(true)
    const res = await apiGetUserByUserType(type)
    if(type === UserType.BLOOD_DONOR) setBloodDonorList(userData?.userType !== UserType.BLOOD_DONOR ? res : res?.filter(res => res._id !== userData?._id) || null)
    setLoading(false)
  },[userData])

  const fetchListByNames:FunctionWithParam<'REQUEST' | 'BLOOD_DONOR' | 'REQUESTERS' | 'DEPARTMENT'> = useCallback(async listName => {
    if(listName === 'BLOOD_DONOR')
      await fetchUserByType(UserType.BLOOD_DONOR)
    if(listName === 'REQUESTERS')
      await fetchRequesters()
    if(listName === 'REQUEST')
      await fetchRequestList()
    if(listName === 'DEPARTMENT')
      await fetchDepartmentList()
  },[fetchUserByType, fetchRequestList, fetchRequesters, fetchDepartmentList])

  const updateRequestListByData:FunctionWithParam<FieldTypeRequestMain> = data => {
    const isNewData = requestList ? requestList?.findIndex(rl => rl._id === data._id) === -1 : true
    setRequestList(prevState => (prevState ? isNewData ? [...prevState, data] : prevState.map(ps => ps._id === data._id ? data : ps) : [data]))
  }

  useEffect(() => {
    if(!requestList)
      fetchRequestList()
  }, [requestList, fetchRequestList ])

  useEffect(() => {
    if(!bloodDonorList)
      fetchUserByType(UserType.BLOOD_DONOR)
  }, [fetchUserByType, bloodDonorList])

  useEffect(() => {
    if(!requesterList)
      fetchRequesters()
  }, [requesterList, fetchRequesters])

  useEffect(() => {
    if(!departmentList)
      fetchDepartmentList()
  }, [departmentList, fetchDepartmentList])

  return(
    <DataContext.Provider value={{ requestList, bloodDonorList, departmentList, updateRequestListByData, requesterList, fetchList: fetchListByNames, loading }}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
