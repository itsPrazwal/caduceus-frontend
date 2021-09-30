import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from 'react'

import { Button, FlexContainer, Input, SvgIcons, Typography } from 'Components'

import { FieldTypeWorkExperience, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from '../Profile.module.scss'
import workExperienceStyles  from './WorkExperience.module.scss'
import { getYearList, isNumber } from '../../../Utils/UtilFunctions'
import { SvgIconName } from '../../../Utils/enum'

const initialFormState: FieldTypeWorkExperience = {
  address: '',
  endYear: '',
  medicalInstitution: '',
  startYear: '',
  currentCompany: false,
}

interface WorkExperienceProps{
  isSubmitting: boolean,
  storedData: Nullable<FieldTypeWorkExperience[]>
  onSubmit: FunctionWithParam<{ experience: FieldTypeWorkExperience[] }>
}

export const WorkExperience:FC<WorkExperienceProps> = ({ isSubmitting, storedData, onSubmit }) => {
  const [formState, setFormState] = useState<FieldTypeWorkExperience>(initialFormState)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [toEditExperience, setToEditExperience] = useState<Nullable<FieldTypeWorkExperience>>(null)
  const [isShowingForm, setIsShowingForm] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = ({ target: { name, value } }) => {
    if((name === 'startYear' || name === 'endYear') && (!isNumber(value) || value.length > 4))
      return null
    setFormState({ ...formState, [name]: value })
    setHasChanges(toEditExperience ? toEditExperience[name] !== value : true)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const submitData: FieldTypeWorkExperience[] = storedData ? [...storedData, formState] : [formState]
    onSubmit({ experience: submitData })
  }

  useEffect(() => {
    if(formRef && formRef.current)
      formRef.current.style.height = isShowingForm ? '500px' : '0px'
    if(!isShowingForm){
      setToEditExperience(null)
      setFormState(initialFormState)
    }
  }, [formRef, isShowingForm])

  useEffect(() => {
    if(!isSubmitting)
      setIsShowingForm(false)
  }, [isSubmitting])

  useEffect(() => {
    if(toEditExperience) {
      setFormState(toEditExperience)
      setIsShowingForm(true)
    }
  }, [toEditExperience])

  const handleEdit:FunctionWithParam<string> = experienceId => {
    setToEditExperience(storedData ? storedData?.filter(sd => sd._id === experienceId)[0] : null)
  }

  const handleDelete:FunctionWithParam<string> = experienceId => {
    onSubmit({ experience: storedData?.filter(sd => sd._id !== experienceId) || [] })
  }

  return (
    <FlexContainer direction='col' justify='start' align='start' classList={workExperienceStyles.workExperienceWrapper}>
      <FlexContainer fill={true} wrap={true} justify='spaceBetween'>
        {storedData && storedData.length > 0
          ? storedData.map((exp, i) => (
            <FlexContainer key={i} direction='col' justify='start' align='start' classList={workExperienceStyles.workExperienceContentWrapper}>
              <FlexContainer direction='col' justify='start' align='end' classList={workExperienceStyles.workExperienceContentEdit}>
                <Button onClick={() => handleEdit(exp._id || '')} name='edit' variant='text'><SvgIcons iconName={SvgIconName.PENCIL}/> edit</Button>
                <Button onClick={() => handleDelete(exp._id || '')} name='delete' variant='text'><SvgIcons iconName={SvgIconName.PENCIL}/> delete</Button>
              </FlexContainer>
              <Typography variant='h5' weight='bold' classList={workExperienceStyles.workExperienceInstituteName}>{exp.medicalInstitution}</Typography>
              <Typography variant='h6' classList={workExperienceStyles.workExperienceInstituteAddress}>{exp.address}</Typography>
              <Typography variant='h6' classList={workExperienceStyles.workExperienceYear}>{exp.startYear} - {exp.currentCompany ? 'Present' : exp.endYear}</Typography>
            </FlexContainer>
          ))
          : <Typography variant='h6'>Please add new work experience</Typography>}
      </FlexContainer>
      <Button variant='secondary' onClick={_e => setIsShowingForm(!isShowingForm)} className={workExperienceStyles.workExperienceButton}>{isShowingForm ? ' - Cancel' : ' + Add New'}</Button>
      <form ref={formRef} onSubmit={handleSubmit} className={workExperienceStyles.workExperienceForm}>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Medical Institution</Typography>
          <Input autoFocus={true} type='text' error={null} name='medicalInstitution' onChange={handleChange} value={formState.medicalInstitution} placeholder='Medical Institution' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Address</Typography>
          <FlexContainer direction='col' align='start' justify='start'>
            <Input type='text' error={null} name='address' onChange={handleChange} value={formState.address} placeholder='Medical Institution Address' category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
            <FlexContainer classList={styles.profileCheckBoxWrapper}>
              <input type='checkbox' name='isPublic' checked={formState.currentCompany} onChange={() => setFormState(prevState => ({ ...prevState, currentCompany: !prevState.currentCompany }))}/>
              <label>Currently Working ?</label>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>Start Year</Typography>
          <Input list='yearList' type='text' placeholder='Start year' error={null} name='startYear' onChange={handleChange} value={formState.startYear} category='small' wrapperStyle={styles.profileInput} disabled={isSubmitting} />
        </FlexContainer>
        <FlexContainer classList={styles.profileLabelInputWrapper}>
          <Typography variant='h5' classList={styles.profileLabel}>End Year</Typography>
          <Input list='yearList' type='text' placeholder='End year' error={null} name='endYear' onChange={handleChange} value={formState.endYear} category='small' wrapperStyle={styles.profileInput} disabled={formState.currentCompany || isSubmitting} />
        </FlexContainer>
        <div className={styles.profileInput}>
          <Button disabled={!hasChanges} loading={isSubmitting} type='submit'>Add New</Button>
        </div>
      </form>
      <datalist id='yearList' >
        {getYearList().map(year => <option key={year} value={year} />)}
      </datalist>
    </FlexContainer>
  )
}
