import { FC, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { Button, FlexContainer, SvgIcons, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { staticImagesUrl } from 'Utils/constants'
import { FieldTypeHospital, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './HospitalCarousel.module.scss'
import { SvgIconName } from 'Utils/enum'
import { apiGetHospital } from 'ApiCalls/DataApi'
import { DataCarousel } from '../DataCarousel'
import { useRouter } from 'next/router'

export const HospitalCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)

  const [hospitalList, setHospitalList] = useState<Nullable<FieldTypeHospital[]>>(null)

  const router = useRouter()

  useEffect(() => {

    const fetchHospital = async () => {
      const res = await apiGetHospital()
      setHospitalList(res)
    }

    if(!hospitalList)
      fetchHospital()
  }, [hospitalList])

  const startArrayIndex = useMemo(() => (keyIndex * Math.ceil(hospitalList && hospitalList?.length > 0 ? hospitalList?.length / 4 : 0)), [keyIndex, hospitalList])
  const activeHospitalList = useMemo(() => hospitalList ? hospitalList?.slice(startArrayIndex, startArrayIndex + 4) : [], [hospitalList, startArrayIndex])

  const handleKeyIndex:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <DataCarousel seeAllHref='/hospitals' title={<><strong>HOSPITALS</strong> WITH US</>} dataLength={hospitalList?.length || 0} keyIndex={keyIndex} handleKeyIndex={handleKeyIndex}>
      {activeHospitalList.map((hospital, i) => (
        <div key={i} className={classNames(styles.hospitalCardWrapper, i !== (activeHospitalList.length - 1) ? styles.notLastCard : '')}>
          <FlexContainer justify='center' classList={styles.hospitalCardImage}>
            <Image src={staticImagesUrl.fallbackImages.hospital} alt='tempStaticImage' layout='fixed' height={400} width={650}  />
          </FlexContainer>
          <div className={styles.hospitalCardBlur} />
          <FlexContainer justify='start' align='start' direction='col' classList={styles.hospitalCardContentWrapper} onClick={() => router.push(`/hospitals/${hospital._id}`)}>
            <FlexContainer justify='start' classList={styles.hospitalCardTagDateWrapper}>
              {
                hospital.speciality?.length > 0
                  ? hospital.speciality.slice(0, 3).map(speciality => <div key={speciality} className={styles.hospitalCardTag}>{capitalizeFirstLetterOfEachWord(speciality)}</div>)
                  : <div className={styles.hospitalCardTag}>No Speciality</div>
              }
            </FlexContainer>
            <Typography variant='h4' weight='bold' classList={styles.hospitalCardTitle}>{hospital.name}</Typography>
            <FlexContainer fill={true} classList={styles.hospitalCardInfoWrapper}>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {hospital.address}</Typography>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.CLOCK}/> {hospital.email}</Typography>
            </FlexContainer>
            <FlexContainer fill={true} classList={styles.hospitalCardButtonWrapper}>
              <Typography variant='p'>Contact: </Typography>
              {hospital.numbers?.length > 0
                ? hospital.numbers.map((number, i) => <Button key={i} variant='secondary'> <SvgIcons iconName={SvgIconName.HEART_OUTLINE}/>{number}</Button>)
                : null}
              {hospital.ambulanceId
                ? <Button variant='secondary'> <SvgIcons iconName={SvgIconName.HEART_OUTLINE}/>Ambulance</Button>
                : null }
            </FlexContainer>
          </FlexContainer>
        </div>
      ))}
    </DataCarousel>
  )
}
