import { FC } from 'react'

import { NotLoggedInHeader } from 'Components'

import styles from './LandingPageLayout.module.scss'

export const LandingPageLayout:FC = ({ children }) => {
  return(
    <div className={styles.landingPageWrapper}>
      <NotLoggedInHeader />
      <div className={styles.landingPageContent}>
        {children}
      </div>
    </div>
  )
}
