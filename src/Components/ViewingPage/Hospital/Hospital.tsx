import { FC, useState } from 'react'
import Image from 'next/image'
import { staticImagesUrl } from '../../../Utils/constants'
import { Button, FlexContainer, Tab, Tabs, Typography } from '../../CoreUI'
import { FieldTypeHospital } from '../../../Utils/Types'
import styles from 'styles/viewingPage/ViewingPage.module.scss'

enum HospitalTabs {
  ABOUT = 'ABOUT',
  SPECIALITY = 'SPECIALITY'
}

export const Hospital:FC<{ hospital: FieldTypeHospital }> = ({ hospital }) => {

  const [selectedTab, setSelectedTab] = useState<HospitalTabs>(HospitalTabs.ABOUT)

  const HospitalInfoBar:FC = () => (
    <FlexContainer direction='col' justify='start' align='start' classList={styles.viewingPageSideContentWrapper}>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Address</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{hospital.address}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Email</Typography>
      <Typography  classList={styles.viewingPageSideContentInfo} variant='h5'>{hospital.email}</Typography>
      <Typography  classList={styles.viewingPageSideContentTopic} variant='h5' weight='bold'>Contact</Typography>
      {hospital.numbers.map(number => <Typography classList={styles.viewingPageSideContentInfo} variant='h5' key={number}>{number}</Typography>)}
      <Button variant='primary'>Review</Button>
    </FlexContainer>
  )

  return(
    <FlexContainer direction='col' classList={styles.viewingPageWrapper} fill={true}>
      <div className={styles.viewingPageImageWrapper}>
        <Image src={staticImagesUrl.fallbackImages.hospital} alt='fallback' layout='fill' />
        <FlexContainer direction='col' justify='end' classList={styles.viewingPageImageContentWrapper}>
          <Typography variant='h1' classList={styles.viewingPageName}>{hospital.name}</Typography>
          <div className={styles.viewingPageImageContentDivider} />
          <FlexContainer>
            <Button variant='secondary'>Call</Button>
            <Button variant='secondary'>Ambulance</Button>
          </FlexContainer>
        </FlexContainer>
      </div>
      <Tabs defaultTab={selectedTab} tabWrapperStyle={styles.viewingPageContentTabWrapper}>
        <Tab label='About' onTabClick={() => setSelectedTab(HospitalTabs.ABOUT)} value={HospitalTabs.ABOUT}>
          <FlexContainer fill={true} align='start' justify='spaceBetween' classList={styles.viewingPageContentContainer} >
            <div className={styles.viewingPageContentWrapper}>
              <Typography variant='h4' classList={styles.viewingPageContentTitle}>About <strong>{hospital.name}</strong></Typography>
              <Typography variant='p' classList={hospital.detail ? styles.viewingPageContentDescription : styles.viewingPageNoInfo}>{hospital.detail || 'Sorry we don\'t have a bio of the hospital for now.'}</Typography>
            </div>
            <HospitalInfoBar />
          </FlexContainer>
        </Tab>
        <Tab label='Speciality' onTabClick={() => setSelectedTab(HospitalTabs.SPECIALITY)} value={HospitalTabs.SPECIALITY}>
          <FlexContainer fill={true} align='start' justify='spaceBetween' classList={styles.viewingPageContentContainer}>
            <div className={styles.viewingPageContentWrapper}>
              <Typography variant='h4' classList={styles.viewingPageContentTitle}>Speciality of <strong>{hospital.name}</strong></Typography>
              {hospital.speciality && hospital.speciality.length > 0
                ?
                <FlexContainer fill={true} wrap={true} classList={styles.viewingPageContentList}>
                  {hospital.speciality.map((speciality, i) => <div key={speciality} className={styles.viewingPageContentListItem}><span>{i + 1}</span>{speciality}</div>)}
                </FlexContainer>
                : <Typography variant='p' classList={styles.viewingPageNoInfo}>Sorry there are no speciality of the hospital.</Typography>
              }
            </div>
            <HospitalInfoBar />
          </FlexContainer>
        </Tab>
      </Tabs>
    </FlexContainer>
  )
}
