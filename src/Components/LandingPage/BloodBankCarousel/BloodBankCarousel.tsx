import { FC, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { Button, FlexContainer, SvgIcons, Typography } from 'Components'

import { staticImagesUrl } from 'Utils/constants'
import { FieldTypeBloodBank, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './BloodBankCarousel.module.scss'
import { SvgIconName } from '../../../Utils/enum'
import { apiGetBloodBank } from '../../../ApiCalls/DataApi'
import { DataCarousel } from '../DataCarousel'
import { useRouter } from 'next/router'

export const BloodBankCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)

  const router = useRouter()

  const [bloodBankList, setBloodBankList] = useState<Nullable<FieldTypeBloodBank[]>>(null)

  useEffect(() => {

    const fetchBloodBanks = async () => {
      const res = await apiGetBloodBank()
      setBloodBankList(res)
    }

    if(!bloodBankList)
      fetchBloodBanks()
  }, [bloodBankList])

  const startArrayIndex = useMemo(() => (keyIndex * Math.ceil(bloodBankList && bloodBankList?.length > 0 ? bloodBankList?.length / 4 : 0)), [keyIndex, bloodBankList])
  const activeEventsList = useMemo(() => bloodBankList ? bloodBankList?.slice(startArrayIndex, startArrayIndex + 4) : [], [bloodBankList, startArrayIndex])

  const handleKeyIndex:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <DataCarousel seeAllHref={'/bloodBanks'} title={<><strong>BLOOD BANKS</strong> WITH US</>} dataLength={bloodBankList?.length || 0} keyIndex={keyIndex} handleKeyIndex={handleKeyIndex}>
      {activeEventsList.map((bloodBank, i) => (
        <div key={i} className={classNames(styles.bloodBankCardWrapper, i !== (activeEventsList.length - 1) ? styles.notLastCard : '')}>
          <FlexContainer justify='center' classList={styles.bloodBankCardImage}>
            <Image src={staticImagesUrl.fallbackImages.bloodBank} alt='tempStaticImage' layout='fixed' height={500} width={650}  />
          </FlexContainer>
          <div className={styles.bloodBankCardBlur} />
          <FlexContainer justify='start' align='start' direction='col' classList={styles.bloodBankCardContentWrapper} onClick={() => router.push(`/bloodBanks/${bloodBank._id}`)}>
            <FlexContainer justify='start' classList={styles.bloodBankCardTagDateWrapper}>
              <div className={styles.bloodBankCardTag}>{i + 1}</div>
            </FlexContainer>
            <Typography variant='h4' weight='bold' classList={styles.bloodBankCardTitle}>{bloodBank.bloodBankName}</Typography>
            <FlexContainer fill={true} classList={styles.bloodBankCardInfoWrapper}>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {bloodBank.address}</Typography>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {bloodBank.numbers}</Typography>
            </FlexContainer>
            <FlexContainer fill={true} classList={styles.bloodBankCardButtonWrapper}>
              <Button variant='secondary'><SvgIcons iconName={SvgIconName.HEART_OUTLINE} />Call</Button>
            </FlexContainer>
          </FlexContainer>
        </div>
      ))}
    </DataCarousel>
  )
}
