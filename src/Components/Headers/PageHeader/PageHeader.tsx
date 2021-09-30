import React, { ChangeEventHandler, FC, createRef, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

import { useUserContext } from 'Context'

import { Avatar, Button, CompanyLogo, FlexContainer, Input, Select, SvgIcons, Typography } from 'Components'

import { AnimateContainerVariant, BloodGroup, SvgIconName } from 'Utils/enum'

import styles from './PageHeader.module.scss'
import { toast } from 'react-toastify'
import {
  FieldTypeAmbulanceRequest,
  FunctionWithNoParam,
  FunctionWithNoParamButReturn,
  FunctionWithParam,
  Nullable
} from '../../../Utils/Types'
import { bloodGroupList } from '../../../Utils/en'
import { AnimatePresence, motion } from 'framer-motion'
import { animateContainerVariants } from '../../../Utils/constants'
import { apiCreateAmbulanceRequest } from '../../../ApiCalls/RequestApi'

enum SubContentNames {
  BLOOD_DONOR = 'Find a Blood Donor',
  DOCTOR = 'Consult a Doctor',
  AMBULANCE = 'Get an Ambulance'
}

const initialAmbulanceFormValue =  {
  fullName: '',
  contactNumber: '9800000000',
  location: '',
}

export const PageHeader:FC = () => {

  const router = useRouter()
  const { user: { userData }, isLoggedIn } = useUserContext()
  const subContentRef = useRef<HTMLDivElement>(null)
  const [subContentVisibility, setSubContentVisibility] = useState<boolean>(false)
  const [selectedSubContent, setSelectedSubContent] = useState<Nullable<SubContentNames>>(null)
  const [bloodGroup, setBloodGroup] = useState<Nullable<BloodGroup>>(null)
  const [ambulanceFormValue, setAmbulanceFormValue] = useState<FieldTypeAmbulanceRequest>(initialAmbulanceFormValue)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const ambulanceFieldRefs = {
    fullName: createRef<HTMLInputElement>(),
    contact: createRef<HTMLInputElement>(),
    location: createRef<HTMLInputElement>(),
  }

  useEffect(() => {
    if(subContentRef && subContentRef.current)
      subContentRef.current.style.height = subContentVisibility ? '7vh' : '0'
    if(!subContentVisibility) {
      setSelectedSubContent(null)
      setIsSubmitting(false)
      setAmbulanceFormValue(initialAmbulanceFormValue)
      setBloodGroup(null)
    }
  }, [subContentVisibility])

  const logOutUser = async () => {
    localStorage.clear()
    toast('You have been logged out.')
    location.reload()
  }

  const onActionClick:FunctionWithParam<SubContentNames> = subContentName => {
    setSubContentVisibility(true)
    setSelectedSubContent(subContentName)
    setIsSubmitting(false)
  }

  const findBloodDonor:FunctionWithNoParam = async () => {
    if(bloodGroup){
      setIsSubmitting(true)
      await router.push(`/bloodDonor?grp=${encodeURIComponent(bloodGroup)}`)
      setIsSubmitting(false)
    }
  }

  const requestAmbulance:FunctionWithNoParam = async () => {
    if(!validationAmbulanceFields()){
      setIsSubmitting(true)
      const res = await apiCreateAmbulanceRequest(ambulanceFormValue)
      if(res === 'SUCCESS'){
        toast.success('Your request has been submitted successfully.')
        setSubContentVisibility(false)
      }
      else
        toast.error('Error while request ambulance.')
    }
    setIsSubmitting(false)
  }

  const validationAmbulanceFields:FunctionWithNoParamButReturn<boolean> = () => {
    let error:string = ''
    if(!ambulanceFormValue.location) {
      ambulanceFieldRefs.location.current?.focus()
      error = 'Please enter location of requirement.'
    }
    if(!ambulanceFormValue.contactNumber) {
      ambulanceFieldRefs.contact.current?.focus()
      error = 'Please enter contact number just in case.'
    }
    if(!ambulanceFormValue.fullName) {
      ambulanceFieldRefs.fullName.current?.focus()
      error = 'Please enter name of requester.'
    }
    if(error) toast.warning(error)
    return !!error
  }

  const handleAmbulanceValueChange:ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    if(name === 'contact' && value.length > 10)
      return null
    setAmbulanceFormValue(prevState => ({ ...prevState, [name]: value }))
  }

  const subContent = () => {
    switch (selectedSubContent){
    case SubContentNames.BLOOD_DONOR:
      return(
        <div className={styles.headerSubContentForm}>
          <Typography variant='h5' classList={styles.headerSubContentFormLabel}>Required Blood : </Typography>
          {bloodGroupList.map(bgl =>
            <div key={bgl.value} className={classNames(styles.headerSubContentFormRadio, bloodGroup === bgl.value ? styles.headerSubContentFormRadioActive : '')} onClick={() => setBloodGroup(bgl.value)}>{bgl.value}</div>
          )}
          <Button disabled={!bloodGroup} loading={isSubmitting} type='button' variant='secondary' onClick={findBloodDonor}>Find</Button>
        </div>
      )
    case SubContentNames.DOCTOR:
      return(
        <form className={styles.headerSubContentForm} onSubmit={findBloodDonor}>
          <Typography variant='h5'>Blood Group</Typography>
          <Select error={null} name='bloodGroup' placeholder='Link'>
            <option value='' disabled selected> -Select required Blood Group- </option>
            {bloodGroupList.map(bgl => <option key={bgl.value} value={bgl.value}>{bgl.displayName}</option>)}
          </Select>
        </form>
      )
    case SubContentNames.AMBULANCE:
      return(
        <form className={styles.headerSubContentForm} onSubmit={findBloodDonor}>
          <Input autoFocus={true} ref={ambulanceFieldRefs.fullName} wrapperStyle={styles.headerSubContentFormField} type='text' error={null} name='fullName' placeholder='Full Name' onChange={handleAmbulanceValueChange} value={ambulanceFormValue.fullName} category='small' disabled={isSubmitting} />
          <Input ref={ambulanceFieldRefs.contact} wrapperStyle={styles.headerSubContentFormField} type='number' max={9899999999} min={9800000000} error={null} name='contactNumber' placeholder='Contact Number' onChange={handleAmbulanceValueChange} value={ambulanceFormValue.contactNumber} category='small' disabled={isSubmitting} />
          <Input ref={ambulanceFieldRefs.location} wrapperStyle={styles.headerSubContentFormField} type='text' error={null} name='location' placeholder='Location' onChange={handleAmbulanceValueChange} value={ambulanceFormValue.location} category='small' disabled={isSubmitting} />
          <Button loading={isSubmitting} type='button' variant='secondary' onClick={requestAmbulance}>Request</Button>
        </form>
      )
    default:
      return <></>
    }
  }

  return(
    <div className={styles.headerContainer}>
      <FlexContainer fill={true} justify='spaceBetween' classList={styles.headerContentWrapper}>
        <FlexContainer classList={styles.headerLeftSide} justify='start'>
          <Link href={'/'} passHref={true}><a title='Caduceus | Homepage'><CompanyLogo /></a></Link>
          <Button onClick={() => onActionClick(SubContentNames.BLOOD_DONOR)} variant='text' className={classNames(styles.headerActionButton, styles.headerActionRedButton)}><SvgIcons iconName={SvgIconName.BLOOD_DROP}/>Find Blood Donor</Button>
          <Button onClick={() => onActionClick(SubContentNames.DOCTOR)} variant='text' className={styles.headerActionButton}><SvgIcons iconName={SvgIconName.DOCTOR}/>Ask Doctor</Button>
          <Button onClick={() => onActionClick(SubContentNames.AMBULANCE)} variant='text' className={classNames(styles.headerActionButton, styles.headerActionRedButton)}><SvgIcons iconName={SvgIconName.AMBULANCE}/>Request Ambulance</Button>
        </FlexContainer>
        <FlexContainer classList={styles.headerRightSide} justify='end'>
          {isLoggedIn
            ?
            <>
              <Typography variant='span' classList={styles.headerRightNotificationIcon}><SvgIcons iconName={SvgIconName.BELL_WITH_DOT}/></Typography>
              <Button title='logout' variant='text' onClick={logOutUser}>LogOut <SvgIcons iconName={SvgIconName.USER_SEAT_BELT}/></Button>
              <Link href={'/profile'}><a title={'View Profile'} className={styles.headerRightProfileImage}>
                {userData?.imageUrl
                  ? <Image src={userData.imageUrl} layout='fill' alt='PP' />
                  : <Avatar name={userData?.fullName || ''} />}
              </a></Link>
            </>
            :
            <>
              <Button variant='secondary' onClick={async () => await router.push('/login')}>Login / SignUp</Button>
            </>
          }
        </FlexContainer>
      </FlexContainer>
      <FlexContainer ref={subContentRef} justify='spaceBetween' classList={classNames(styles.headerSubContentWrapper, selectedSubContent === SubContentNames.DOCTOR ? '' : styles.headerSubContentWrapperRedBg)}>
        <Typography variant='h5' classList={styles.headerSubContentTitle}>{selectedSubContent}</Typography>
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            variants={animateContainerVariants.toRight}
            initial={AnimateContainerVariant.HIDDEN}
            animate={AnimateContainerVariant.VISIBLE}
            exit={AnimateContainerVariant.EXIT}
            key={selectedSubContent}
          >
            {subContent()}
          </motion.div>
        </AnimatePresence>
        <Button disabled={isSubmitting} onClick={() => setSubContentVisibility(false)} variant='text'>close</Button>
      </FlexContainer>
    </div>
  )
}
