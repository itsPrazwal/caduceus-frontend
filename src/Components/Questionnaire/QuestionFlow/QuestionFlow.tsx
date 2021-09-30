import { FC, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, FieldTypeAnswerToSubmit, FlexContainer, QuestionScreen, SvgIcons } from 'Components'

import { animateContainerVariants } from 'Utils/constants'
import { AnimateContainerVariant, SvgIconName } from 'Utils/enum'
import { FunctionWithParam, Nullable, QuestionSetType } from 'Utils/Types'

import styles from './QuestionFlow.module.scss'

interface QuestionFlowProps {
  questionSets: QuestionSetType[],
  submitAnswer: FunctionWithParam<Nullable<FieldTypeAnswerToSubmit[]>>
  isSubmitting: boolean
  setPropStepper?: FunctionWithParam<number>
}

export const QuestionFlow:FC<QuestionFlowProps> = ({ questionSets, submitAnswer, setPropStepper, isSubmitting }) => {

  const [stepper, setStepper] = useState<number>(1)
  const [answerToSubmit, setAnswerToSubmit] = useState<Nullable<FieldTypeAnswerToSubmit[]>>(null)
  const [currentQuestionSet, setCurrentQuestionSet] = useState<Nullable<QuestionSetType>>(questionSets[stepper - 1])

  const totalStepper = useMemo(() => questionSets.length, [questionSets])
  const isFinalQuestion:boolean = useMemo(() => stepper === totalStepper,[totalStepper, stepper])
  const hasAnswer:boolean = useMemo(() => answerToSubmit ? answerToSubmit?.findIndex(ats => ats.question === currentQuestionSet?.question && ats.answer.length > 0) > -1 : false, [answerToSubmit, currentQuestionSet])

  const selectedAnswerObject:FieldTypeAnswerToSubmit | undefined = useMemo(() =>  answerToSubmit?.reduce((acc, curr) => curr.question === currentQuestionSet?.question ? curr : acc, {} as FieldTypeAnswerToSubmit), [answerToSubmit, currentQuestionSet])

  const handleStepperChange:FunctionWithParam<'NEXT' | 'PREVIOUS'> = action => {
    const currentStepper = stepper + (action === 'NEXT' ? 1 : - 1)
    setCurrentQuestionSet(questionSets[currentStepper - 1])
    setStepper(currentStepper)
    if(setPropStepper) setPropStepper(currentStepper)
  }

  const handleSkip:FunctionWithParam<string> = question => {
    setAnswerToSubmit(prevState => (prevState ? prevState?.filter(ps => ps.question !== question) : prevState))
    handleStepperChange('NEXT')
  }

  const setAnswerSelect:FunctionWithParam<FieldTypeAnswerToSubmit> = setObj => {
    const indexInOldArray = answerToSubmit ? answerToSubmit.findIndex(ats => ats.questionField === setObj.questionField) : -1
    setAnswerToSubmit(oldArray => oldArray ? [ ...(indexInOldArray === -1 ? [...oldArray, setObj] : oldArray.map(oa => oa.questionField === setObj.questionField ? setObj : oa)) ] : [setObj])
  }

  return(
    <>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          key={stepper}
          variants={animateContainerVariants.toLeft}
          initial={AnimateContainerVariant.HIDDEN}
          animate={AnimateContainerVariant.VISIBLE}
          exit={AnimateContainerVariant.EXIT}
          className={styles.questionFlowWrapper}
        >
          {currentQuestionSet
            ? <QuestionScreen selectedAnswerObject={selectedAnswerObject} setAnswerSelect={setAnswerSelect} currentQuestionSet={currentQuestionSet as QuestionSetType}/>
            : null}
        </motion.div>
      </AnimatePresence>
      <FlexContainer direction='row' justify='spaceBetween' classList={styles.questionFlowFooter}>
        <Button variant='text' disabled={stepper === 1} onClick={() => handleStepperChange('PREVIOUS')}>Previous</Button>
        <Button
          disabled={currentQuestionSet?.isRequired && !hasAnswer}
          loading={isSubmitting}
          variant={isFinalQuestion || hasAnswer ? 'primary' : 'text'}
          onClick={() => isFinalQuestion ? submitAnswer(answerToSubmit) : hasAnswer ? handleStepperChange('NEXT') : handleSkip(currentQuestionSet?.question as string)}
        >
          {isFinalQuestion ? 'Submit' : hasAnswer ? 'Continue' : 'Skip'}{isFinalQuestion ? null : <SvgIcons iconName={SvgIconName.ARROW_RIGHT}/>}
        </Button>
      </FlexContainer>
    </>
  )
}
