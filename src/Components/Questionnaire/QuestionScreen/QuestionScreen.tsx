import { ChangeEventHandler, FC, useEffect, useMemo, useRef } from 'react'

import { AnswerCard, FlexContainer, Input, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import {
  AnswerSetType,
  FunctionWithParam,
  FunctionWithParamAndReturn,
  QuestionSetType
} from 'Utils/Types'

import styles from './QuestionScreen.module.scss'

interface QuestionScreenProps {
    currentQuestionSet: QuestionSetType,
    setAnswerSelect: FunctionWithParam<FieldTypeAnswerToSubmit>,
    selectedAnswerObject?: FieldTypeAnswerToSubmit
}

export interface FieldTypeAnswerToSubmit {
    question: string,
    selectedValue: string[],
    answer: string[],
    questionField: string,
}

export const QuestionScreen:FC<QuestionScreenProps> = ({ currentQuestionSet, setAnswerSelect, selectedAnswerObject }) => {

  const isSelected:FunctionWithParamAndReturn<string, boolean> = useMemo(() => value => selectedAnswerObject ? selectedAnswerObject?.selectedValue?.findIndex(sv => sv === value ) > -1 : false, [selectedAnswerObject])

  const answerWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(answerWrapperRef.current)
      answerWrapperRef.current.style.width = `${(290 * (currentQuestionSet.options.length + (currentQuestionSet.hasOthers ? 1 : 0))) - 50}px`
  }, [answerWrapperRef, currentQuestionSet])

  const handleAnswerSelect:FunctionWithParam<string> = ans => {
    const setObj:FieldTypeAnswerToSubmit = {
      answer: ans === otherOption.value ? [''] : currentQuestionSet.questionType === 'MULTIPLE' ? selectedAnswerObject?.answer ? [...selectedAnswerObject.answer as string[], ans] : [ans] : [ans],
      selectedValue: selectedAnswerObject?.selectedValue ? currentQuestionSet.questionType === 'MULTIPLE' ? [...selectedAnswerObject?.selectedValue , ans] : [ans] : [ans],
      question: currentQuestionSet.question,
      questionField: currentQuestionSet.questionField,
    }
    setAnswerSelect(setObj)
  }

  const handleAnswerInput:ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target
    const setObj:FieldTypeAnswerToSubmit = {
      answer: [value],
      selectedValue: selectedAnswerObject?.selectedValue as string[],
      question: selectedAnswerObject?.question as string,
      questionField: selectedAnswerObject?.questionField as string,
    }
    setAnswerSelect(setObj)
  }

  const otherOption:AnswerSetType = {
    value: 'others',
    displayOption: 'Others'
  }

  const handleRemoveSelected:FunctionWithParam<string> = ans => {
    const setObj:FieldTypeAnswerToSubmit = {
      answer: ans === otherOption.value ? [''] : selectedAnswerObject?.answer?.filter(sao => sao !== ans) as string[],
      selectedValue: selectedAnswerObject?.selectedValue ? selectedAnswerObject?.answer?.filter(sao => sao !== ans) as string[] : [ans],
      question: currentQuestionSet.question,
      questionField: currentQuestionSet.questionField,
    }
    setAnswerSelect(setObj)
  }

  return(
    <FlexContainer direction='col' align='start' classList={styles.questionScreenWrapper}>
      <Typography variant='h1' classList={styles.questionScreenQuestion}>{capitalizeFirstLetterOfEachWord(currentQuestionSet.question)}</Typography>
      <div className={styles.questionScreenAnswersWrapper}>
        <FlexContainer ref={answerWrapperRef} direction='row' classList={styles.questionScreenAnswers}>
          {currentQuestionSet?.options.map((opt, ind) => (
            <AnswerCard wrapperStyle={styles.questionScreenAnswer} key={ind} option={opt} isSelected={isSelected(opt.value)} handleAnswerSelect={isSelected(opt.value) ? handleRemoveSelected : handleAnswerSelect} />
          ))}
          {currentQuestionSet.hasOthers ? <AnswerCard option={otherOption} handleAnswerSelect={handleAnswerSelect} isSelected={isSelected(otherOption.value)} /> : null}
        </FlexContainer>
      </div>
      {currentQuestionSet.hasOthers && isSelected(otherOption.value)
        ? <Input value={selectedAnswerObject?.answer[0]} onChange={handleAnswerInput} wrapperStyle={styles.questionScreenInput} autoFocus={true} placeholder='Your Answer Goes Here...' error={null} />
        : null}
    </FlexContainer>
  )
}


