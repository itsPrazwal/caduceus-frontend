import { FC, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button, Carousel, CompanyLogo, FlexContainer, Typography } from 'Components'

import { landingPage } from 'Utils/mockData'
import { FunctionWithParam } from 'Utils/Types'

import styles from './BannerCarousel.module.scss'
import { useUserContext } from '../../../Context'

export const BannerCarousel:FC = () => {

  const { isLoggedIn } = useUserContext()

  const [keyIndex, setKeyIndex] = useState<number>( 0)

  const toDisplayBannerList = useMemo(() => isLoggedIn ? landingPage.banners.slice(1, landingPage.banners.length) : landingPage.banners, [isLoggedIn])
  const activeBannerData = useMemo(() => toDisplayBannerList[keyIndex], [keyIndex])

  const handleIndexChange:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <div className={styles.landingPageBannerWrapper}>
      <Carousel interval={5000} keyIndex={keyIndex} totalIndex={toDisplayBannerList.length} hasIndicator={true} setKeyIndex={handleIndexChange}>
        <FlexContainer classList={styles.landingPageBannerContentWrapper}>
          <FlexContainer direction='col' align='start' classList={styles.landingPageBannerLeft}>
            {!isLoggedIn && keyIndex === 0
              ? <CompanyLogo />
              : null }
            <Typography variant='h1' classList={styles.landingPageBannerHeading}>{activeBannerData.title}</Typography>
            <Typography variant='h6' classList={styles.landingPageBannerParagraph}>{activeBannerData.description}</Typography>
            {activeBannerData.navButtons && activeBannerData.navButtons.length > 0
              ?
              <FlexContainer classList={styles.landingPageBannerButtonWrapper}>
                {activeBannerData.navButtons.map((bt, bti) => <Link key={bti} passHref={true} href={bt.redirection}><Button variant={bti === 0 ? 'primary' : 'secondary'} key={bti}>{bt.name}</Button></Link>)}
              </FlexContainer>
              : null}
          </FlexContainer>
          <FlexContainer classList={styles.landingPageBannerRight}>
            <Image src={activeBannerData.imageUrl} alt='tempStaticImage' layout='fill'  />
          </FlexContainer>
        </FlexContainer>
      </Carousel>
    </div>
  )
}
