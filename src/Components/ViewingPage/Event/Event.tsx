import { FC, useState } from 'react'
import Image from 'next/image'
import { staticImagesUrl } from '../../../Utils/constants'
import { Button, FlexContainer, Tab, Tabs, Typography } from '../../CoreUI'
import { FieldTypeEvents } from '../../../Utils/Types'
import styles from 'styles/viewingPage/ViewingPage.module.scss'

enum EventTabs {
  ABOUT = 'ABOUT',
  PARTICIPATE = 'PARTICIPATE'
}

export const Event:FC<{ event: FieldTypeEvents }> = ({ event }) => {

  const [selectedTab, setSelectedTab] = useState<EventTabs>(EventTabs.ABOUT)

  const HospitalInfoBar:FC = () => (
    <FlexContainer direction='col' justify='start' align='start' classList={styles.viewingPageSideContentWrapper}>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Category</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{event.eventCategory}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Address</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{event.address}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Contact</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{event.contact}</Typography>
      <Button variant='primary'>Review</Button>
    </FlexContainer>
  )

  return(
    <FlexContainer direction='col' classList={styles.viewingPageWrapper} fill={true}>
      <div className={styles.viewingPageImageWrapper}>
        <Image src={staticImagesUrl.fallbackImages.event} alt='fallback' layout='fill' />
        <FlexContainer direction='col' justify='end' classList={styles.viewingPageImageContentWrapper}>
          <Typography variant='h1' classList={styles.viewingPageName}>{event.eventName}</Typography>
          <div className={styles.viewingPageImageContentDivider} />
          <FlexContainer>
            <Button variant='secondary'>Share</Button>
          </FlexContainer>
        </FlexContainer>
      </div>
      <Tabs defaultTab={selectedTab} tabWrapperStyle={styles.viewingPageContentTabWrapper}>
        <Tab label='About' onTabClick={() => setSelectedTab(EventTabs.ABOUT)} value={EventTabs.ABOUT}>
          <FlexContainer fill={true} align='start' justify='spaceBetween' classList={styles.viewingPageContentContainer} >
            <div className={styles.viewingPageContentWrapper}>
              <Typography variant='h4' classList={styles.viewingPageContentTitle}>About <strong>{event.eventName}</strong></Typography>
              <Typography variant='p' classList={styles.viewingPageContentDescription}>This section is hold information about events.</Typography>
            </div>
            <HospitalInfoBar />
          </FlexContainer>
        </Tab>
        <Tab label='Participate' onTabClick={() => setSelectedTab(EventTabs.PARTICIPATE)} value={EventTabs.PARTICIPATE}>
          <FlexContainer fill={true} align='start' justify='spaceBetween' classList={styles.viewingPageContentContainer}>
            <div className={styles.viewingPageContentWrapper}>
              This section holds to participate in event.
            </div>
            <HospitalInfoBar />
          </FlexContainer>
        </Tab>
      </Tabs>
    </FlexContainer>
  )
}
