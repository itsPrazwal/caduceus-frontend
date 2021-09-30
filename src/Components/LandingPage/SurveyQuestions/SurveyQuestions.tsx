import { FC, useState } from 'react'

import { FieldTypeAnswerToSubmit, QuestionFlow } from 'Components'

import { questionnaire } from 'Utils/mockData'
import { FunctionWithParam, Nullable } from 'Utils/Types'

export const SurveyQuestions:FC = () => {

  const questionSet = questionnaire.filter(q => q.userType === 'INSTRUCTOR')

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit:FunctionWithParam<Nullable<FieldTypeAnswerToSubmit[]>> = async answerToSubmit => {
    setIsSubmitting(true)
    console.log('ans: ', answerToSubmit)
    const submitTimeout = setTimeout(async () => {
      setIsSubmitting(false)
      clearTimeout(submitTimeout)
    }, 2000)
  }

  return(
    <>
      <QuestionFlow questionSets={questionSet} submitAnswer={handleSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
