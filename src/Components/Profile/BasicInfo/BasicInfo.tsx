import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react'

import { Button, FlexContainer, Input, Select, TextArea, Typography } from 'Components'

import {
  FieldTypeBasicInfo,
  FieldTypeUserData,
  FunctionWithParam,
  Nullable
} from 'Utils/Types'

import styles from '../Profile.module.scss'
import { bloodGroupList } from '../../../Utils/en'

const initialFormState:FieldTypeBasicInfo = {
  fullName: '',
  bio: '',
  gender: 'male',
  phoneNumber: '',
  bloodGroup: null,
  dob: '',
  address: {
    detail: '',
    isPublic: false
  },
  activeForDonation: false
}

interface BasicInfoProps {
  onSubmit: FunctionWithParam<FieldTypeBasicInfo>
  storedData: Nullable<FieldTypeUserData>
  isSubmitting: boolean
}

export const BasicInfo: FC<BasicInfoProps> = ({ storedData, onSubmit, isSubmitting }) => {
  const [formState, setFormState] = useState<FieldTypeBasicInfo>(initialFormState)
  const [hasChanges, setHasChanges] = useState<boolean>(false)

  useEffect(() => {
    if(storedData)
      setFormState({
        dob: storedData.dob?.split('T')[0] || '',
        bio: storedData.bio || '',
        address: storedData.address || { isPublic: false, detail: '' },
        bloodGroup: storedData.bloodGroup || null,
        gender: storedData.gender || '',
        fullName: storedData.fullName,
        phoneNumber: storedData.phoneNumber?.toString() || '',
        activeForDonation: storedData.activeForDonation || false
      })
  }, [storedData])

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: name === 'activeForDonation' ? value === 'on' : value })
    setHasChanges(storedData ? name !== 'phoneNumber' ? storedData[name] !== value : storedData.phoneNumber?.toString() !== value : true )
  }

  const handleAddressChange: FunctionWithParam<{ field: 'detail' | 'isPublic', value: string | boolean }> = ({ field, value }) => {
    setFormState(prevState => ({ ...prevState, address: { ...prevState.address, [field]: value } }))
    setHasChanges(storedData ? field === 'detail' ? storedData.address?.detail !== value : storedData.address?.isPublic !== value : true)
  }

  const handleCheckBoxChange:FunctionWithParam<{field: 'activeForDonation', value: boolean}> = ({ value, field }) => {
    setFormState(prevState => ({ ...prevState, [field]: value }))
    setHasChanges(storedData ? storedData[field] !== value : true )
  }

  const handleSubmit:FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    await onSubmit(formState)
    setHasChanges(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Full Name</Typography>
          <Input type='text' error={null} name='fullName' onChange={handleChange} value={formState.fullName} placeholder='Full Name' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Your Bio</Typography>
          <TextArea error={null} name='bio' onChange={handleChange} value={formState.bio} placeholder='Your Bio' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Date of Birth</Typography>
          <Input type='date' error={null} name='dob' onChange={handleChange} value={formState.dob} category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Gender</Typography>
          <Select error={null} name='gender' placeholder='Link' value={formState.gender} onChange={handleChange} wrapperStyle={styles.profileInput}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='others'>Others</option>
          </Select>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Blood Group</Typography>
          <FlexContainer direction='col' align='start' justify='start'>
            <Select error={null} name='bloodGroup' placeholder='Blood Group' value={formState.bloodGroup || ''} onChange={handleChange} wrapperStyle={styles.profileInput}>
              <option value='' disabled selected>-- Select Your Blood Group -- </option>
              {bloodGroupList.map(bgl => <option key={bgl.value} value={bgl.value}>{bgl.displayName}</option>)}
            </Select>
            <FlexContainer classList={styles.profileCheckBoxWrapper}>
              <input type='checkbox' name='activeForDonation' checked={formState.activeForDonation} onChange={() => handleCheckBoxChange({ field:'activeForDonation', value: !formState.activeForDonation })}/>
              <label>Active for donation ?</label>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Phone Number</Typography>
          <Input type='number' error={null} name='phoneNumber' onChange={handleChange} value={formState.phoneNumber} placeholder='Phone Number' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper} align='end'>
          <Typography variant='h5' classList={styles.profileLabel}>Address</Typography>
          <FlexContainer direction='col' align='start' justify='start'>
            <Input type='text' error={null} name='detail' onChange={({ target: { value } }) => handleAddressChange({ value, field: 'detail' })} value={formState.address.detail} placeholder='Address' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
            <FlexContainer classList={styles.profileCheckBoxWrapper}>
              <input type='checkbox' name='isPublic' checked={formState.address.isPublic} onChange={() => handleAddressChange({ value: !formState.address.isPublic, field: 'isPublic' })}/>
              <label>Public you address ?</label>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <div className={styles.profileInput}>
          <Button disabled={!hasChanges} loading={isSubmitting} type='submit'>Update</Button>
        </div>
      </form>
    </>
  )
}
