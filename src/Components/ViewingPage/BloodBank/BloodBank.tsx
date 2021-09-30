import { FC, useState } from 'react'
import Image from 'next/image'
import { staticImagesUrl } from '../../../Utils/constants'
import { Button, FlexContainer, Tab, Tabs, Typography } from '../../CoreUI'
import { FieldTypeBloodBank } from '../../../Utils/Types'
import styles from 'styles/viewingPage/ViewingPage.module.scss'

enum EventTabs {
  ABOUT = 'ABOUT',
}

export const BloodBank:FC<{ bloodBank: FieldTypeBloodBank }> = ({ bloodBank }) => {

  const [selectedTab, setSelectedTab] = useState<EventTabs>(EventTabs.ABOUT)

  const HospitalInfoBar:FC = () => (
    <FlexContainer direction='col' justify='start' align='start' classList={styles.viewingPageSideContentWrapper}>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Address</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{bloodBank.address}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Email</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{bloodBank.email}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Contact</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{bloodBank.numbers}</Typography>
      <Button variant='primary'>Review</Button>
    </FlexContainer>
  )

  return(
    <FlexContainer direction='col' classList={styles.viewingPageWrapper} fill={true}>
      <div className={styles.viewingPageImageWrapper}>
        <Image src={staticImagesUrl.fallbackImages.bloodBank} alt='fallback' layout='fill' />
        <FlexContainer direction='col' justify='end' classList={styles.viewingPageImageContentWrapper}>
          <Typography variant='h1' classList={styles.viewingPageName}>{bloodBank.bloodBankName}</Typography>
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
              <Typography variant='h4' classList={styles.viewingPageContentTitle}>About <strong>{bloodBank.bloodBankName}</strong></Typography>
              <Typography variant='p' classList={styles.viewingPageContentDescription}>This section is hold information about blood bank.</Typography>
            </div>
            <HospitalInfoBar />
          </FlexContainer>
        </Tab>
        <></>
      </Tabs>
    </FlexContainer>
  )
}
