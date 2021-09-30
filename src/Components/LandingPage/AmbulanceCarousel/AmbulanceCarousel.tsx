import { FC, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { Button, FlexContainer, SvgIcons, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { staticImagesUrl } from 'Utils/constants'
import { FieldTypeAmbulance, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './AmbulanceCarousel.module.scss'
import { SvgIconName } from '../../../Utils/enum'
import { apiGetAmbulance } from '../../../ApiCalls/DataApi'
import { DataCarousel } from '../DataCarousel'
import { useRouter } from 'next/router'

export const AmbulanceCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)

  const router = useRouter()

  const [ambulanceList, setAmbulanceList] = useState<Nullable<FieldTypeAmbulance[]>>(null)

  useEffect(() => {

    const fetchAmbulaces = async () => {
      const res = await apiGetAmbulance()
      setAmbulanceList(res)
    }

    if(!ambulanceList)
      fetchAmbulaces()
  }, [ambulanceList])

  const startArrayIndex = useMemo(() => (keyIndex * Math.ceil(ambulanceList && ambulanceList?.length > 0 ? ambulanceList?.length / 4 : 0)), [keyIndex, ambulanceList])
  const activeEventsList = useMemo(() => ambulanceList ? ambulanceList?.slice(startArrayIndex, startArrayIndex + 4) : [], [ambulanceList, startArrayIndex])

  const handleKeyIndex:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <DataCarousel seeAllHref={'/ambulances'} title={<><strong>AMBULANCES</strong> AVAILABLE</>} dataLength={ambulanceList?.length || 0} keyIndex={keyIndex} handleKeyIndex={handleKeyIndex}>
      {activeEventsList.map((ambulance, i) => (
        <div key={i} className={classNames(styles.ambulanceCardWrapper, i !== (activeEventsList.length - 1) ? styles.notLastCard : '')}>
          <FlexContainer justify='center' classList={styles.ambulanceCardImage}>
            <Image src={staticImagesUrl.fallbackImages.ambulance} alt='tempStaticImage' layout='fixed' height={400} width={650}  />
          </FlexContainer>
          <div className={styles.ambulanceCardBlur} />
          <FlexContainer justify='start' align='start' direction='col' classList={styles.ambulanceCardContentWrapper} onClick={() => router.push(`/ambulances/${ambulance._id}`)}>
            <FlexContainer justify='start' classList={styles.ambulanceCardTagDateWrapper}>
              <div className={styles.ambulanceCardTag}>{capitalizeFirstLetterOfEachWord(ambulance.organizationName)}</div>
              <Typography variant='p' classList={styles.ambulanceCardDate}><SvgIcons iconName={SvgIconName.CLOCK}/>Jan 2022</Typography>
            </FlexContainer>
            <Typography variant='h4' weight='bold' classList={styles.ambulanceCardTitle}>{ambulance.ambulanceName}</Typography>
            <FlexContainer fill={true} classList={styles.ambulanceCardInfoWrapper}>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {ambulance.address}</Typography>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {ambulance.numbers}</Typography>
            </FlexContainer>
            <FlexContainer fill={true} classList={styles.ambulanceCardButtonWrapper}>
              <Button variant='secondary'>Request</Button>
              <Button variant='secondary'><SvgIcons iconName={SvgIconName.HEART_OUTLINE} />Call</Button>
            </FlexContainer>
          </FlexContainer>
        </div>
      ))}
    </DataCarousel>
  )
}
