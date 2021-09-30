import { FC, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { Button, FlexContainer, SvgIcons, Typography } from 'Components'

import { capitalizeFirstLetterOfEachWord } from 'Utils/UtilFunctions'
import { staticImagesUrl } from 'Utils/constants'
import { FieldTypeEvents, FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './EventCarousel.module.scss'
import { SvgIconName } from '../../../Utils/enum'
import { apiGetEvent } from '../../../ApiCalls/DataApi'
import { DataCarousel } from '../DataCarousel'
import { useRouter } from 'next/router'

export const EventCarousel:FC = () => {

  const [keyIndex, setKeyIndex] = useState<number>(0)

  const [eventList, setEventList] = useState<Nullable<FieldTypeEvents[]>>(null)

  const router = useRouter()

  useEffect(() => {

    const fetchEvents = async () => {
      const res = await apiGetEvent()
      setEventList(res)
    }

    if(!eventList)
      fetchEvents()
  }, [eventList])

  const startArrayIndex = useMemo(() => (keyIndex * Math.ceil(eventList && eventList?.length > 0 ? eventList?.length / 4 : 0)), [keyIndex, eventList])
  const activeEventsList = useMemo(() => eventList ? eventList?.slice(startArrayIndex, startArrayIndex + 4) : [], [eventList, startArrayIndex])

  const handleKeyIndex:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return(
    <DataCarousel seeAllHref={'/events'} title={<><strong>EVENTS</strong> ON OUR SITE</>} dataLength={eventList?.length || 0} keyIndex={keyIndex} handleKeyIndex={handleKeyIndex}>
      {activeEventsList.map((event, i) => (
        <div key={i} className={classNames(styles.eventCardWrapper, i !== (activeEventsList.length - 1) ? styles.notLastCard : '')}>
          <FlexContainer justify='center' classList={styles.eventCardImage}>
            <Image src={staticImagesUrl.fallbackImages.event} alt='tempStaticImage' layout='fixed' height={400} width={650}  />
          </FlexContainer>
          <div className={styles.eventCardBlur} />
          <FlexContainer justify='start' align='start' direction='col' classList={styles.eventCardContentWrapper} onClick={() => router.push(`/events/${event._id}`)}>
            <FlexContainer justify='start' classList={styles.eventCardTagDateWrapper}>
              <div className={styles.eventCardTag}>{capitalizeFirstLetterOfEachWord(event.eventCategory)}</div>
              <Typography variant='p' classList={styles.eventCardDate}><SvgIcons iconName={SvgIconName.CLOCK}/>Jan 2022</Typography>
            </FlexContainer>
            <Typography variant='h4' weight='bold' classList={styles.eventCardTitle}>{startArrayIndex + i + 1} {event.eventName}</Typography>
            <FlexContainer fill={true} classList={styles.eventCardInfoWrapper}>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {event.address}</Typography>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {event.contact}</Typography>
              <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> 123 Participants</Typography>
            </FlexContainer>
            <FlexContainer fill={true} classList={styles.eventCardButtonWrapper}>
              <Button variant='secondary'>Register</Button>
              <Button variant='secondary'>Wishlist <SvgIcons iconName={SvgIconName.HEART_OUTLINE} /></Button>
              <Button variant='secondary'>Share <SvgIcons iconName={SvgIconName.SHARE} /></Button>
            </FlexContainer>
          </FlexContainer>
        </div>
      ))}
    </DataCarousel>
  )
}
