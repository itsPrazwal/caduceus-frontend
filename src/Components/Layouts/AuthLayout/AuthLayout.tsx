import { FC } from 'react'
import Head from 'next/head'

import { CompanyLogo, FlexContainer, Typography } from 'Components'

import { labels } from 'Utils/en'
import { AuthPagesLabels } from 'Utils/enum'

import styles from './AuthLayout.module.scss'
import Link from 'next/link'

interface AuthLayoutProps {
  authPageLabel: AuthPagesLabels,
  additionalData?: {
    topic?: string,
    description?: string,
  }
  showLoginLink?: boolean,
  showForgotLink?: boolean,
  showSignUpLink?: boolean
}

export const AuthLayout:FC<AuthLayoutProps> = ({ showSignUpLink = false, showLoginLink = false, showForgotLink = false, authPageLabel, additionalData, children }) => {

  return(
    <>
      <Head>
        <title>{labels[authPageLabel].pageTitle}</title>
        <meta name='description' content='Auth pages of TBD application.' />
      </Head>
      <div className={styles.authPageLogoWrapper}>
        <Link href={'/'} passHref={true}><a><CompanyLogo /></a></Link>
      </div>
      <FlexContainer direction='col' classList={styles.authWrapper} justify='center'>
        <div className={styles.authContentWrapper}>
          <div className={styles.authInfoWrapper}>
            {labels[authPageLabel].topic
              ? <Typography variant='h1' classList={styles.authTopic}>{`${labels[authPageLabel].topic}${additionalData?.topic || ''}`}</Typography>
              : null }
            {labels[authPageLabel].description
              ? <Typography variant='p' classList={styles.authDescription}>{`${labels[authPageLabel].description}${additionalData?.description || ''}`}</Typography>
              : null }
          </div>
          {children}
          <FlexContainer direction='col' classList={styles.authSubItemsWrapper}>
            {showLoginLink
              ? <Typography variant='p' classList={styles.authSubItemDetail}>Already On Caduceus? <Link href={'/login'}><a>Log In</a></Link></Typography>
              : null}
            {showForgotLink
              ? <Typography variant='p' classList={styles.authSubItemDetail}>Need Help? <Link href={'/trouble-login'}><a>Trouble Login</a></Link></Typography>
              : null}
            {showSignUpLink
              ? <Typography variant='p' classList={styles.authSubItemDetail}>New to Caduceus? <Link href={'/register'}><a>Sign Up</a></Link></Typography>
              : null}
          </FlexContainer>
        </div>
      </FlexContainer>
    </>
  )
}
