import React, { FC, ReactElement, useMemo, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import { FlexContainer } from 'Components'

import { FunctionWithNoParam } from 'Utils/Types'

import styles from './Tabs.module.scss'

interface TabsProps {
    children: ReactElement[],
    defaultTab?: string | string[],
    tabWrapperStyle?: string,
}

interface TabProps {
    label: string
    value: string
}

interface TabPropsHref {
    hrefUrl: string
}

interface TabPropsFunction {
    onTabClick: FunctionWithNoParam
}

const Tabs: FC<TabsProps> = ({ children, defaultTab, tabWrapperStyle = '' }) => {

  const queryTabExist:ReactElement | undefined = useMemo(() => children?.find( child => child.props.value === defaultTab ), [children, defaultTab])

  const initialTab = useMemo(() => queryTabExist ? queryTabExist.props.value : children[0].props.value, [children, queryTabExist])

  const [activeTab, setActiveTab] = useState<string>(initialTab)

  const tabs = children?.map(child => (
    child.props.hrefUrl
      ?
      <Link
        href={child.props.hrefUrl}
        key={child.props.value}
      >
        <a
          onClick={_e => setActiveTab(child.props.value)}
          className={classNames(styles.tabSpan, child.props.value === activeTab ? styles.activeTab : '')}
        >
          {child.props.label}
        </a>
      </Link>
      : <span className={classNames(styles.tabSpan, child.props.value === activeTab ? styles.activeTab : '')}
        onClick={_e => {
          child.props.onTabClick()
          setActiveTab(child.props.value)
        }}
      >
        {child.props.label}
      </span>
  ))

  const tabContent:ReactElement = children?.filter(child => child.props.value === activeTab)[0]

  return (
    <div className={styles.tabContainer}>
      <FlexContainer classList={classNames(styles.tabNavigation, tabWrapperStyle)}>{tabs}</FlexContainer>
      <div className={styles.tabContent}>{tabContent}</div>
    </div>
  )
}

const Tab: FC<TabProps & (TabPropsHref | TabPropsFunction)> = ({ children }) => <> {children} </>

export { Tabs, Tab }
