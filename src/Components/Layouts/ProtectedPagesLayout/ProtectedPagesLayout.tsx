import { FC } from 'react'
import classNames from 'classnames'

import { Footer, PageHeader, PageTitle } from 'Components'

import styles from './ProtectedPagesLayout.module.scss'

interface ProtectedPagesLayoutProps {
    pageTitle: string,
    hideOverFlow?: boolean
}

export const ProtectedPagesLayout:FC<ProtectedPagesLayoutProps> = ({ children, pageTitle, hideOverFlow = true }) => {
  return(
    <div className={classNames(styles.landingPageWrapper, hideOverFlow ? styles.landingPageOverflowHidden : '')}>
      <PageTitle title={pageTitle}/>
      <PageHeader />
      <div className={styles.landingPageContent}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
