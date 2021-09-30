import { FC, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { Carousel, FlexContainer, Typography } from 'Components'

import { landingPage } from 'Utils/mockData'
import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { FunctionWithParam } from 'Utils/Types'

import styles from './DoctorCarousel.module.scss'

export const DoctorCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)

  const startArrayIndex = useMemo(() => (keyIndex * Math.ceil(landingPage.hosts.length / 4)), [keyIndex])
  const activeEventData = useMemo(() => landingPage.hosts.slice(startArrayIndex, startArrayIndex + 4), [startArrayIndex])

  const handleKeyIndex:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <FlexContainer justify='start' align='start' direction='col' classList={styles.hostCarouselWrapper}>
      <FlexContainer>
        <Typography variant='h1'>TRENDING <strong>HOST</strong></Typography>
      </FlexContainer>
      <Carousel overflow='Visible' keyIndex={keyIndex} setKeyIndex={handleKeyIndex} totalIndex={landingPage.hosts.length} >
        <FlexContainer classList={styles.hostCarouselContentWrapper}>
          {activeEventData.map((aed, i) => (
            <div key={i} className={classNames(styles.hostCardWrapper, i !== (activeEventData.length - 1) ? styles.notLastHostCard : '')}>
              <Image src={aed.imageUrl} alt='tempStaticImage' layout='fixed'     height={650} width={650}  />
              <div className={styles.hostCardBlur} />
              <FlexContainer justify='start' align='start' direction='col' classList={styles.hostCardContentWrapper}>
                <Typography variant='h3' weight='bold' classList={styles.hostCardTitle}>{startArrayIndex + i + 1} {aed.name}</Typography>
                <Typography variant='p' classList={styles.hostCardCompany}>{capitalizeFirstLetterOfEachWord(aed.position)} | {capitalizeFirstLetterOfEachWord(aed.company)}</Typography>
                <Typography variant='p' classList={styles.hostCardDescription}>{aed.description}</Typography>
              </FlexContainer>
            </div>
          ))}
        </FlexContainer>
      </Carousel>
    </FlexContainer>
  )
}
