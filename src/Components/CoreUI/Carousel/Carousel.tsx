import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'

import { FlexContainer, Indicator } from 'Components'

import { landingPage } from 'Utils/mockData'
import { animateContainerVariants } from 'Utils/constants'
import { AnimateContainerVariant } from 'Utils/enum'
import { FunctionWithParam } from 'Utils/Types'

import styles from './Carousel.module.scss'

interface CarouselProps {
    keyIndex: number,
    setKeyIndex: FunctionWithParam<number>
    totalIndex: number
    hasIndicator?: boolean
    interval?: number
    overflow?: 'Visible' | 'Hidden'
}

export const Carousel:FC<CarouselProps> = ({ children, overflow = 'Hidden', totalIndex, interval, setKeyIndex: setPropKeyIndex, keyIndex: propKeyIndex, hasIndicator }) => {

  const [keyIndex, setKeyIndex] = useState<number>(propKeyIndex)
  const keyIndexRef = useRef(keyIndex)

  useEffect(() => {
    setPropKeyIndex(keyIndex)
  }, [keyIndex, setPropKeyIndex])

  const handleIndexChange:FunctionWithParam<'NEXT' | 'PREVIOUS' | number> = useCallback(action => {
    if(action !== 'NEXT' && action !== 'PREVIOUS'){
      setKeyIndex(action)
      keyIndexRef.current = action
    }else{
      const val = action === 'NEXT'
        ? keyIndexRef.current === (landingPage.banners.length - 1)
          ? 0
          : keyIndexRef.current + 1
        : keyIndexRef.current === 0
          ? (landingPage.banners.length - 1)
          : keyIndexRef.current - 1
      setKeyIndex(val)
      keyIndexRef.current = val
    }
  }, [])

  useEffect(() => {
    const autoInt = setInterval(() => {
      if(interval)
        handleIndexChange('NEXT')
      else
        clearInterval(autoInt)
    }, interval)
    return () => clearInterval(autoInt)
  }, [interval, handleIndexChange])

  return(
    <div className={classNames(styles.carouselWrapper, styles[`carouselOverflow${overflow}`])}>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.div
          variants={animateContainerVariants.toLeft}
          initial={AnimateContainerVariant.HIDDEN}
          animate={AnimateContainerVariant.VISIBLE}
          exit={AnimateContainerVariant.EXIT}
          key={keyIndex}
          className={styles.carouselContent}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {hasIndicator
        ? <Indicator total={totalIndex} handleIndicatorChange={num => handleIndexChange(num)} active={keyIndex} />
        : null }
      <FlexContainer justify='center' onClick={() => handleIndexChange('NEXT')} classList={classNames(styles.carouselAction, styles.carouselNext)}>{'>'}</FlexContainer>
      <FlexContainer justify='center' onClick={() => handleIndexChange('PREVIOUS')} classList={classNames(styles.carouselAction, styles.carouselPrevious)}>{'<'}</FlexContainer>
    </div>
  )
}
