import { useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { ProfileLayout, ProfileUserContent, ProfileUserRequests } from 'Components'

import { FieldTypeDoctorInfo, FieldTypeRequestMain, FunctionWithParam, Nullable } from 'Utils/Types'
import { profilePageTabs, userRequestTab } from 'Utils/constants'
import { ProfileMainNavTabValue, UserRequestTabName, UserType } from 'Utils/enum'
import { useDataContext, useUserContext } from 'Context'
import { apiGetDoctorInfo } from 'ApiCalls/DataApi'
import { apiUpdateRequestList } from '../../../ApiCalls/RequestApi'
import { toast } from 'react-toastify'

interface QueryValues {
  tabNav: Nullable<string>,
  requestTypes: Nullable<string>
}

const Profile:NextPage = () => {

  const router = useRouter()
  const { user: { userData } } = useUserContext()
  const { updateRequestListByData } = useDataContext()

  const [doctorInfo, setDoctorInfo] = useState<Nullable<FieldTypeDoctorInfo>>(null)

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const res = await apiGetDoctorInfo({ userId: userData?._id || '' })
      setDoctorInfo(res)
    }
    if(!doctorInfo && userData && userData.userType === UserType.DOCTOR)
      fetchDoctorInfo()
  }, [doctorInfo, userData])


  const queryValues:QueryValues = useMemo(() => ({ requestTypes: router.query.requestType as string || null, tabNav: router.query.tabNav as string || null }), [router])

  useEffect(() => {
    const redirection = async () => {
      if(!queryValues.tabNav || profilePageTabs.main.findIndex(ppt => ppt.value === queryValues.tabNav) === -1)
        await router.replace(`/profile/${ProfileMainNavTabValue.DETAIL}`)
      else if(queryValues.tabNav === ProfileMainNavTabValue.REQUEST && (!queryValues.requestTypes || userRequestTab.findIndex(et => et.value === queryValues.requestTypes) === -1))
        await router.replace(`/profile/${ProfileMainNavTabValue.REQUEST}?requestType=${UserRequestTabName.BLOOD_DONOR}`)
    }
    redirection()
  }, [queryValues, router])

  const handleRequestAction: FunctionWithParam<FieldTypeRequestMain> = async data => {
    const res = await apiUpdateRequestList(data)
    if(res)
      updateRequestListByData(res)
    else
      toast.error('Error updating status.')
  }

  return(
    <ProfileLayout queryValue={queryValues.tabNav}>
      {queryValues.tabNav
        ? queryValues.tabNav === ProfileMainNavTabValue.DETAIL
          ? <ProfileUserContent doctorInfo={doctorInfo} userBio={userData?.bio || ''} />
          : queryValues.tabNav === ProfileMainNavTabValue.REQUEST
            ? <ProfileUserRequests onRequestAction={handleRequestAction} activeRequestType={queryValues.requestTypes as UserRequestTabName} />
            : null
        : null}
    </ProfileLayout>
  )
}

export default Profile
