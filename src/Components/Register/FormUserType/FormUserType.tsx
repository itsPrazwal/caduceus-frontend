import { FC } from 'react'

import { AnswerCard, FlexContainer } from 'Components'

import { AnswerSetType, FunctionWithParam, Nullable } from 'Utils/Types'
import { UserType } from 'Utils/enum'

import styles from './FormUserType.module.scss'

interface FormUserTypeProps {
    handleAnswerSelect: FunctionWithParam<string>,
    selectedAnswer: Nullable<UserType>
}

export const FormUserType:FC<FormUserTypeProps> = ({ selectedAnswer, handleAnswerSelect }) => {

  const userTypeOptions:AnswerSetType[] = [
    {
      displayOption: 'Doctor',
      value: UserType.DOCTOR
    },
    {
      displayOption: 'Patient',
      value: UserType.PATIENT
    },
    {
      displayOption: 'Blood Donor',
      value: UserType.BLOOD_DONOR
    }
  ]

  return(
    <FlexContainer classList={styles.formUserTypeWrapper}>
      {userTypeOptions.map(uto => (
        <AnswerCard wrapperStyle={styles.formUserTypeAnswer} key={uto.value} option={uto} handleAnswerSelect={handleAnswerSelect} isSelected={uto.value === selectedAnswer} />
      ))}
    </FlexContainer>
  )
}
