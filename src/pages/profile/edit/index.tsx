import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import {BasicInfo, Department, Education, ProfileLayout, Tab, Tabs, WorkExperience} from 'Components'
import { ClassNameScrollBar, ProfileEditNavTabValue, ProfileEditTags } from 'Utils/enum'
import {
  FieldTypeBasicInfo,
  FieldTypeDoctorInfo, FieldTypeEducation, FieldTypeWorkExperience,
  FunctionWithParam,
  FunctionWithParamAndReturn,
  Nullable
} from 'Utils/Types'
import { profileEditTabs } from 'Utils/constants'
import { useRouter } from 'next/router'
import styles from 'styles/profile/edit/EditProfile.module.scss'
import classNames from 'classnames'
import { useUserContext } from 'Context'
import { apiUpdateBasicInfo } from 'ApiCalls/UserApi'
import { apiGetDoctorInfo, apiUpdateDoctorInfo } from '../../../ApiCalls/DataApi'
import {toast} from "react-toastify";

const EditProfile = () => {

  const router = useRouter()
  const { user: { userData }, setUserByData } = useUserContext()
  const [doctorInfo, setDoctorInfo] = useState<Nullable<FieldTypeDoctorInfo>>(null)
  const queryValue:Nullable<string> = useMemo(() => (router.query.section) as string || null, [router])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const res = await apiGetDoctorInfo({ userId: userData?._id || '' })
      setDoctorInfo(res)
    }
    if(!doctorInfo)
      fetchDoctorInfo()
  }, [doctorInfo, userData?._id])


  useEffect(() => {
    const redirection = async () => {
      if(!queryValue || profileEditTabs.findIndex(et => et.value === queryValue) === -1)
        await router.replace(`/profile/${ProfileEditNavTabValue.PROFILE}?section=${ProfileEditTags.BASIC_INFO}`)
    }
    redirection()
  }, [queryValue, router])

  const handleBasicInfoSubmit:FunctionWithParam<FieldTypeBasicInfo> = async value => {
    setIsSubmitting(true)
    const res = await apiUpdateBasicInfo(value)
    if(res){
      setUserByData(res)
      toast.success('Basic Information updated successfully.')
    }else{
      toast.error('Basic Information updated failed.')
    }
    setIsSubmitting(false)
  }

  const handleExperienceUpdate:FunctionWithParam<{ experience: FieldTypeWorkExperience[] }> = async ({ experience }) => {
    setIsSubmitting(true)
    const res = await apiUpdateDoctorInfo({ id: doctorInfo?._id || '', experience })
    if(res){
      setDoctorInfo(res)
      toast.success('Experience updated successfully.')
    }else{
      toast.error('Experience updated failed.')
    }
    setIsSubmitting(false)
  }

  const handleEducationUpdate:FunctionWithParam<{ education: FieldTypeEducation[] }> = async ({ education }) => {
    setIsSubmitting(true)
    const res = await apiUpdateDoctorInfo({ id: doctorInfo?._id || '', education })
    if(res){
      setDoctorInfo(res)
      toast.success('Education updated successfully.')
    }else{
      toast.error('Education updated failed.')
    }
    setIsSubmitting(false)
  }

  const handleDepartmentUpdate:FunctionWithParam<{ relatedDepartment: string[] }> = async ({ relatedDepartment }) => {
    setIsSubmitting(true)
    const res = await apiUpdateDoctorInfo({ id: doctorInfo?._id || '', relatedDepartment })
    if(res){
      setDoctorInfo(res)
      toast.success('Department updated successfully.')
    }else{
      toast.error('Department updated failed.')
    }
    setIsSubmitting(false)
  }

  const getTabComponent:FunctionWithParamAndReturn<ProfileEditTags, Nullable<ReactElement>> = tagValue => {
    switch (tagValue){
    case ProfileEditTags.BASIC_INFO:
      return <BasicInfo storedData={userData} onSubmit={handleBasicInfoSubmit} isSubmitting={isSubmitting} />
    case ProfileEditTags.WORK_EXPERIENCE:
      return <WorkExperience onSubmit={handleExperienceUpdate} isSubmitting={isSubmitting} storedData={doctorInfo && doctorInfo.experience.length > 0 ? doctorInfo.experience : null} />
    case ProfileEditTags.EDUCATION:
      return <Education onSubmit={handleEducationUpdate} isSubmitting={isSubmitting} storedData={doctorInfo && doctorInfo.education.length > 0 ? doctorInfo.education : null}/>
    case ProfileEditTags.DEPARTMENT:
      return <Department onSubmit={handleDepartmentUpdate} isSubmitting={isSubmitting} storedData={doctorInfo ? doctorInfo.relatedDepartment : []} />
    default :
      return null
    }
  }

  return (
    <ProfileLayout queryValue={ProfileEditNavTabValue.PROFILE} isEditing={true}>
      <div className={classNames(styles.editProfileWrapper, ClassNameScrollBar.Y)}>
        <Tabs tabWrapperStyle={styles.editProfileTabWrapper} defaultTab={ProfileEditTags.BASIC_INFO}>
          {profileEditTabs.filter(pet => userData?.userType === 'DOCTOR' ? pet : pet.value === ProfileEditTags.BASIC_INFO).map((pet, i) => (
            <Tab key={i} hrefUrl={`/profile/edit?section=${pet.value}`} label={pet.displayName} value={pet.value}>
              {getTabComponent(pet.value)}
            </Tab>
          ))}
        </Tabs>
      </div>
    </ProfileLayout>
  )
}

export default EditProfile
