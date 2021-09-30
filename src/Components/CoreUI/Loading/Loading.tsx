import { FC } from 'react'

import { FlexContainer } from 'Components'

import styles from './Loading.module.scss'

export const ScreenLoading:FC = () => {
  return(
    <FlexContainer justify='center' classList={styles.loaderWrapper}>
      <div className={styles.loader} />
    </FlexContainer>
  )
}

export const Spinner: FC = () => {
  return(
    <div className={styles.spinner} />
  )
}
