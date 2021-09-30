import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import classNames from 'classnames'

import { PageTitle } from 'Components'

import { staticImagesUrl } from 'Utils/constants'

import styles from './TempProfileLayout.module.scss'

interface SideBarProps {
    name: string
    url: string
}

interface ProfileLayoutProps {
    pageTitle: string
    children: React.ReactNode
}

export const TempProfileLayout: FC<ProfileLayoutProps> = props => {
  const { children, pageTitle } = props

  const router = useRouter()
  const path = router.asPath

  const sidebarItems: SideBarProps[] = [
    {
      name: 'Profile',
      url: `/profile?name=${router.query.name}`
    },
    {
      name: 'My Learning',
      url: ''
    },
    {
      name: 'My Purchase',
      url: ''
    },
    {
      name: 'Payment Methods',
      url: ''
    },
    {
      name: 'Account Settings',
      url: ''
    },
    {
      name: 'Updates',
      url: ''
    },
    {
      name: 'Accomplishments',
      url: ''
    },
    {
      name: 'Messages',
      url: ''
    },
    {
      name: 'Notifications',
      url: ''
    },
    {
      name: 'Logout',
      url: ''
    },
  ]
  return (
    <>
      <PageTitle title={pageTitle} />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Image src={staticImagesUrl.tempManImage} height={100} width={100} alt='profile-image' />
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className={classNames(path === item.url && styles.active)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  )
}

