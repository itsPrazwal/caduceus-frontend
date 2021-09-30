import { FC } from 'react'
import { Button, CompanyLogo, FlexContainer, SvgIcons, Typography } from 'Components'

import { SvgIconName } from 'Utils/enum'
import { welcomeScreenLabels } from 'Utils/en'
import { FunctionWithParam } from 'Utils/Types'

import styles from './WelcomeScreen.module.scss'

interface WelcomeScreenProps {
  handleStepperChange: FunctionWithParam<'NEXT' | 'PREVIOUS'>
}

export const WelcomeScreen:FC<WelcomeScreenProps> = ({ handleStepperChange }) => {
  return(
    <FlexContainer direction='col' justify='center' classList={styles.welcomeScreenWrapper}>
      <div className={styles.welcomeScreenLogoWrapper}><CompanyLogo /></div>
      <div>
        <Typography variant='h3'>{welcomeScreenLabels.title}</Typography>
        <Typography variant='h6' classList={styles.welcomeScreenDescription}>{welcomeScreenLabels.description}</Typography>
        <Typography variant='h1'>{welcomeScreenLabels.knowMore}</Typography>
      </div>
      <FlexContainer direction='row'>
        <Button variant='primary' onClick={() => handleStepperChange('NEXT')}>Continue<SvgIcons iconName={SvgIconName.ARROW_RIGHT}/></Button>
        <Button variant='text' onClick={() => handleStepperChange('NEXT')}>Skip</Button>
      </FlexContainer>
    </FlexContainer>
  )
}
