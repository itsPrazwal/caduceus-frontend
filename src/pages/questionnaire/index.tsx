import { FC, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, CompanyLogo, FieldTypeAnswerToSubmit, FlexContainer, QuestionFlow, Typography, WelcomeScreen } from 'Components'

import { questionnaire } from 'Utils/mockData'
import {
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
} from 'Utils/Types/main'
import { AnimateContainerVariant } from 'Utils/enum'
import { animateContainerVariants } from 'Utils/constants'

import styles from 'styles/questionnaire/questionnaire.module.scss'

const Questionnaire:FC = () => {

  const questionSet = questionnaire.filter(q => q.userType === 'LEARNER')
  const router = useRouter()

  const [stepper, setStepper] = useState<number>(1)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const totalStepper = useMemo(() => (questionSet.length + 1), [questionSet])

  const handleSubmit:FunctionWithParam<Nullable<FieldTypeAnswerToSubmit[]>> = async answerToSubmit => {
    setIsSubmitting(true)
    console.log('ans: ', answerToSubmit)
    const submitTimeout = setTimeout(async () => {
      setIsSubmitting(false)
      await router.push('/homepage')
      clearTimeout(submitTimeout)
    }, 2000)
  }

  const handleStepperChange:FunctionWithParam<'NEXT' | 'PREVIOUS'> = action => {
    const currentStepper = stepper + (action === 'NEXT' ? 1 : - 1)
    setStepper(currentStepper)
  }

  const handleSkipALl:FunctionWithNoParam = () => {
    console.log('skipped all')
  }

  return(
    <FlexContainer direction='col' classList={styles.questionnairePage}>
      <FlexContainer direction='row' justify='spaceBetween' classList={styles.questionnaireHeader}>
        <FlexContainer direction='row' justify='spaceEven' classList={styles.logoAndStepWrapper}>
          <CompanyLogo />
          <Typography variant='p' classList={styles.stepper}>Step {`${stepper}/${totalStepper}`}</Typography>
        </FlexContainer>
        <FlexContainer classList={styles.rightSide} justify='end'>
          <Button variant='text' onClick={handleSkipALl}>Exit</Button>
        </FlexContainer>
      </FlexContainer>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          variants={animateContainerVariants.toLeft}
          initial={AnimateContainerVariant.HIDDEN}
          animate={AnimateContainerVariant.VISIBLE}
          exit={AnimateContainerVariant.EXIT}
          className={styles.stepperScreenWrapper}
        >
          {stepper === 1
            ? <WelcomeScreen handleStepperChange={handleStepperChange}/>
            : <QuestionFlow isSubmitting={isSubmitting} questionSets={questionSet} submitAnswer={handleSubmit} setPropStepper={(questionStepper: number) => setStepper(questionStepper + 1)} />
          }
        </motion.div>
      </AnimatePresence>
    </FlexContainer>
  )
}

export default Questionnaire
