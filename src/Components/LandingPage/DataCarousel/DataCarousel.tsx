import { FC, ReactElement } from 'react'
import Link from 'next/link'
import styles from './DataCarousel.module.scss'
import { Carousel, FlexContainer, Typography } from 'Components'
import { FunctionWithParam } from '../../../Utils/Types'
import classNames from 'classnames'

interface DataCarouselProps {
    title: ReactElement,
    dataLength: number,
    keyIndex: number,
    handleKeyIndex: FunctionWithParam<number>,
    seeAllHref?: string
}

export const DataCarousel:FC<DataCarouselProps> = ({ children, seeAllHref, dataLength, handleKeyIndex, keyIndex, title }) => {
  return(
    <FlexContainer justify='start' align='start' direction='col' classList={styles.dataCarouselWrapper}>
      <FlexContainer justify='spaceBetween' fill={true}>
        <Typography variant='h1'>{title}</Typography>
        <Link href={seeAllHref || ''}><a className={styles.dataCarouselSeeAllLink}>See all</a></Link>
      </FlexContainer>
      {dataLength > 0
        ?
        <Carousel overflow='Visible' keyIndex={keyIndex} setKeyIndex={handleKeyIndex} totalIndex={10} >
          <FlexContainer
            classList={classNames(
              styles.dataCarouselContentWrapper,
              dataLength < 4
                ? styles.contentLengthMax
                : styles.contentLengthOver
            )}>
            {children}
          </FlexContainer>
        </Carousel>
        : <>NO DATA</>
      }
    </FlexContainer>
  )
}
