import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from 'react'

import { Button, FlexContainer, Input, SvgIcons, Typography } from 'Components'

import { FieldTypeEducation, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from '../Profile.module.scss'
import educationStyles from './Education.module.scss'
import { educationDegreeList, educationSpecialityList } from 'Utils/en'
import { getYearList } from 'Utils/UtilFunctions'
import { SvgIconName } from 'Utils/enum'

const initialFormState: FieldTypeEducation = {
  address: '',
  endYear: '',
  educationInstitution: '',
  startYear: '',
  degree: '',
  currentlyEnrolled: false,
  speciality: ''
}

interface EducationProps{
  isSubmitting: boolean,
  storedData: Nullable<FieldTypeEducation[]>
  onSubmit: FunctionWithParam<{ education: FieldTypeEducation[] }>
}

export const Education:FC<EducationProps> = ({ isSubmitting, storedData, onSubmit }) => {
  const [formState, setFormState] = useState<FieldTypeEducation>(initialFormState)
  const [toEditEducation, setToEditEducation] = useState<Nullable<FieldTypeEducation>>(null)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isShowingForm, setIsShowingForm] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value })
    setHasChanges(toEditEducation ? toEditEducation[name] !== value : true)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    let submitData: FieldTypeEducation[] = []
    if(toEditEducation){
      submitData = storedData?.map(sd => sd._id === toEditEducation._id ? { ...formState, _id: toEditEducation._id } : sd) as FieldTypeEducation[]
    }else{
      submitData = storedData ? [...storedData, formState] : [formState]
    }
    onSubmit({ education: submitData })  }

  useEffect(() => {
    if(formRef && formRef.current)
      formRef.current.style.height = isShowingForm ? '700px' : '0px'
    if(!isShowingForm){
      setFormState(initialFormState)
      setToEditEducation(null)
    }
  }, [formRef, isShowingForm])

  useEffect(() => {
    if(toEditEducation) {
      setFormState(toEditEducation)
      setIsShowingForm(true)
    }
  }, [toEditEducation])

  useEffect(() => {
    if(!isSubmitting)
      setIsShowingForm(false)
  }, [isSubmitting])

  const handleEdit:FunctionWithParam<string> = educationId => {
    setToEditEducation(storedData ? storedData?.filter(sd => sd._id === educationId)[0] : null)
  }

  const handleDelete:FunctionWithParam<string> = educationId => {
    onSubmit({ education: storedData?.filter(sd => sd._id !== educationId) || [] })
  }

  return (
    <FlexContainer direction='col' justify='start' align='start' classList={educationStyles.educationWrapper}>
      <FlexContainer fill={true} wrap={true} justify='spaceBetween'>
        {storedData && storedData.length > 0
          ? storedData.map((edu, i) => (
            <FlexContainer key={i} direction='col' justify='start' align='start' classList={educationStyles.educationContentWrapper}>
              <FlexContainer direction='col' justify='start' align='end' classList={educationStyles.educationContentEdit}>
                <Button onClick={() => handleEdit(edu._id || '')} name='edit' variant='text'><SvgIcons iconName={SvgIconName.PENCIL}/> edit</Button>
                <Button onClick={() => handleDelete(edu._id || '')} name='delete' variant='text'><SvgIcons iconName={SvgIconName.PENCIL}/> delete</Button>
              </FlexContainer>
              <Typography variant='h4' classList={educationStyles.educationDegree}><strong>{edu.degree}</strong>{edu.speciality}</Typography>
              <Typography variant='h5' weight='bold' classList={educationStyles.educationInstituteName}>{edu.educationInstitution}</Typography>
              <Typography variant='h6' classList={educationStyles.educationInstituteAddress}>{edu.address}</Typography>
              <Typography variant='h6' classList={educationStyles.educationYear}>{edu.startYear} - {edu.currentlyEnrolled ? 'Present' : edu.endYear}</Typography>
            </FlexContainer>
          ))
          : <Typography variant='h6'>Please add new work experience</Typography>}
      </FlexContainer>
      <Button variant='secondary' onClick={_e => setIsShowingForm(!isShowingForm)} className={educationStyles.educationButton}>{isShowingForm ? ' - Cancel' : ' + Add New'}</Button>
      <form ref={formRef} onSubmit={handleSubmit} className={educationStyles.educationForm}>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Degree</Typography>
          <Input required list='educationDegreeList' autoFocus={true} error={null} name='degree' onChange={handleChange} value={formState.degree} placeholder='Degree' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
          <datalist id='educationDegreeList'>
            {educationDegreeList.map(edl => <option key={edl.value} value={edl.value}>{edl.displayName}</option>)}
          </datalist>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Speciality</Typography>
          <Input required list='educationSpecialityList' autoFocus={true} error={null} name='speciality' onChange={handleChange} value={formState.speciality} placeholder='Speciality' category='small' wrapperStyle={styles.profileInput} disabled={!educationSpecialityList[formState.degree] || isSubmitting} />
          <datalist id='educationSpecialityList'>
            {educationSpecialityList[formState.degree]?.map(esl => <option key={esl} value={esl}>{esl}</option>)}
          </datalist>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Education Institution</Typography>
          <Input required autoFocus={true} type='text' error={null} name='educationInstitution' onChange={handleChange} value={formState.educationInstitution} placeholder='Education Institution' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Address</Typography>
          <FlexContainer direction='col' align='start' justify='start'>
            <Input required type='text' error={null} name='address' onChange={handleChange} value={formState.address} placeholder='Education Institution Address' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
            <FlexContainer classList={styles.profileCheckBoxWrapper}>
              <input type='checkbox' name='currentlyEnrolled' checked={formState.currentlyEnrolled} onChange={() => setFormState(prevState => ({ ...prevState, currentlyEnrolled: !prevState.currentlyEnrolled }))}/>
              <label>Currently Enrolled ?</label>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Start Year</Typography>
          <Input required list='yearList' type='text' placeholder='Start Year' error={null} name='startYear' onChange={handleChange} value={formState.startYear} category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>End Year</Typography>
          <Input required={!formState.currentlyEnrolled} list='yearList' type='text' placeholder='End Year' error={null} name='endYear' onChange={handleChange} value={formState.endYear} category='small' wrapperStyle={styles.profileInput} disabled={formState.currentlyEnrolled || isSubmitting} />
        </FlexContainer>
        <div className={styles.profileInput}>
          <Button disabled={!hasChanges} loading={isSubmitting} type='submit'>{toEditEducation ? 'Update' : 'Add New'}</Button>
        </div>
      </form>
      <datalist id='yearList' >
        {getYearList().map(year => <option key={year} value={year} />)}
      </datalist>
    </FlexContainer>
  )
}
