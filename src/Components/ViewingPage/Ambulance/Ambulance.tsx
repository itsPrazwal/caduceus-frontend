import { FC, useState } from 'react'
import Image from 'next/image'
import { staticImagesUrl } from '../../../Utils/constants'
import { Button, FlexContainer, Tab, Tabs, Typography } from '../../CoreUI'
import { FieldTypeAmbulance } from '../../../Utils/Types'
import styles from 'styles/viewingPage/ViewingPage.module.scss'

enum AmbulanceTabs {
  ABOUT = 'ABOUT',
}

export const Ambulance:FC<{ ambulance: FieldTypeAmbulance }> = ({ ambulance }) => {

  const [selectedTab, setSelectedTab] = useState<AmbulanceTabs>(AmbulanceTabs.ABOUT)

  const HospitalInfoBar:FC = () => (
    <FlexContainer direction='col' justify='start' align='start' classList={styles.viewingPageSideContentWrapper}>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Organization</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{ambulance.organizationName}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Address</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{ambulance.address}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Email</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{ambulance.email}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Contact</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{ambulance.numbers}</Typography>
      <Button variant='primary'>Review</Button>
    </FlexContainer>
  )

  return(
    <FlexContainer direction='col' classList={styles.viewingPageWrapper} fill={true}>
      <div className={styles.viewingPageImageWrapper}>
        <Image src={staticImagesUrl.fallbackImages.hospital} alt='fallback' layout='fill' />
        <FlexContainer direction='col' justify='end' classList={styles.viewingPageImageContentWrapper}>
          <Typography variant='h1' classList={styles.viewingPageName}>{ambulance.ambulanceName}</Typography>
          <div className={styles.viewingPageImageContentDivider} />
          <FlexContainer>
            <Button variant='secondary'>Call</Button>
            <Button variant='secondary'>Share</Button>
          </FlexContainer>
        </FlexContainer>
      </div>
      <Tabs defaultTab={selectedTab} tabWrapperStyle={styles.viewingPageContentTabWrapper}>
        <Tab label='About' onTabClick={() => setSelectedTab(AmbulanceTabs.ABOUT)} value={AmbulanceTabs.ABOUT}>
          <FlexContainer fill={true} align='start' justify='spaceBetween' classList={styles.viewingPageContentContainer} >
            <div className={styles.viewingPageContentWrapper}>
              <Typography variant='h4' classList={styles.viewingPageContentTitle}>About <strong>{ambulance.ambulanceName}</strong></Typography>
              <Typography variant='p' classList={styles.viewingPageContentDescription}>This page will have ambulance details</Typography>
            </div>
            <HospitalInfoBar />
          </FlexContainer>
        </Tab>
        <></>
      </Tabs>
    </FlexContainer>
  )
}
