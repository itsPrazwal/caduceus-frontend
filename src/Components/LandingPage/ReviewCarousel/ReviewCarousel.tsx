import { FC, useMemo, useState } from 'react'
import Image from 'next/image'

import { Carousel, FlexContainer, SvgIcons, Typography } from 'Components'

import { SvgIconName } from 'Utils/enum'
import { landingPage } from 'Utils/mockData'
import { FunctionWithParam } from 'Utils/Types'

import styles from './ReviewCarousel.module.scss'

export const ReviewCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)

  const activeReviewData = useMemo(() => landingPage.reviews[keyIndex], [keyIndex])

  const handleIndexChange:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <FlexContainer justify='start' align='start' direction='col' classList={styles.landingPageReviewWrapper}>
      <FlexContainer>
        <Typography variant='h1' classList={styles.landingPageReviewTitle}>WHAT DO CADUCEUS <strong>USERS HAVE TO SAY?</strong></Typography>
      </FlexContainer>
      <Carousel interval={5000} keyIndex={keyIndex} totalIndex={landingPage.reviews.length} hasIndicator={true} setKeyIndex={handleIndexChange}>
        <FlexContainer fill={true} classList={styles.landingPageReviewContentWrapper}>
          <FlexContainer classList={styles.landingPageReviewLeft} direction='col' align='start' justify='center'>
            <Typography variant='p' classList={styles.landingPageReviewRating}>{activeReviewData.rating} {Array.from(Array(Math.floor(activeReviewData.rating))).map((_v, i) => <SvgIcons key={i} iconName={SvgIconName.STAR_GOLD}/>)}</Typography>
            <Typography variant='p' classList={styles.landingPageReviewDescription}>{activeReviewData.description}</Typography>
            <Typography variant='h5' weight='bold' classList={styles.landingPageReviewReviewer}>{activeReviewData.name} | {activeReviewData.position}</Typography>
          </FlexContainer>
          <div className={styles.landingPageReviewRight}>
            <Image src={activeReviewData.imageUrl} layout='fill' alt='staticTempImage' />
          </div>
        </FlexContainer>
      </Carousel>
    </FlexContainer>

  )
}
