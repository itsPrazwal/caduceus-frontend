import { FC, useMemo } from 'react'
import Image from 'next/image'
import { FlexContainer, Typography } from 'Components'
import { capitalizeFirstLetterOfEachWord } from '../../../Utils/UtilFunctions'
import { FieldTypeDoctorInfo, Nullable } from '../../../Utils/Types'
import { staticImagesUrl } from '../../../Utils/constants'
import styles from './ProfileUserContent.module.scss'

interface ProfileUserContentProps {
    userBio: string
    doctorInfo: Nullable<FieldTypeDoctorInfo>
}

export const ProfileUserContent:FC<ProfileUserContentProps> = ({ userBio, doctorInfo }) => {

  const specialities:string[] = useMemo(() => doctorInfo ? doctorInfo?.education.reduce((acc: string[], curr) => curr.speciality ? [...acc, curr.speciality] : acc, []) : [], [doctorInfo])

  return(
    <FlexContainer direction='col' align='start' justify='start' classList={styles.profileUserContentWrapper}>
      <div className={styles.profileUserContent}>
        <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>About</Typography>
        <Typography variant='p'>{userBio || 'edit profile to enter bio...'}</Typography>
      </div>
      {doctorInfo
        ?
        <>
          <div className={styles.profileUserContent}>
            <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Experience</Typography>
            {doctorInfo && doctorInfo.experience.length > 0
              ? doctorInfo.experience.map((exp, i) => (
                <FlexContainer key={i} classList={styles.profileUserCompanyWrapper}>
                  <div className={styles.profileUserCompanyLogo}>
                    <Image src={staticImagesUrl.companyLogo.abc} alt='cl' layout='fill' />
                  </div>
                  <div className={styles.profileUserCompanyDetail}>
                    <Typography variant='h5'>{exp.medicalInstitution}</Typography>
                    <Typography variant='p'>{exp.startYear} - {exp.currentCompany ? 'Present' : exp.endYear}</Typography>
                  </div>
                </FlexContainer>
              ))
              : <Typography variant='h6'>Please edit profile add your experience.</Typography>}
          </div>
          <div className={styles.profileUserContent}>
            <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Education Degree</Typography>
            {doctorInfo && doctorInfo.education.length > 0
              ? doctorInfo.education.map((edu, i) => (
                <FlexContainer key={i} classList={styles.profileUserCompanyWrapper}>
                  <div className={styles.profileUserCompanyLogo}>
                    <Image src={staticImagesUrl.instituteLogo.abc} alt='cl' layout='fill' />
                  </div>
                  <div className={styles.profileUserCompanyDetail}>
                    <Typography variant='h5' weight='bold'>{edu.degree} - {edu.speciality}</Typography>
                    <Typography variant='h5'>{edu.educationInstitution}</Typography>
                    <Typography variant='p'>{edu.startYear} - {edu.currentlyEnrolled ? 'Present' : edu.endYear}</Typography>
                  </div>
                </FlexContainer>
              ))
              : <Typography variant='h6'>Please edit profile add your education degree.</Typography>}
          </div>
          <div className={styles.profileUserContent}>
            <Typography variant='h4' weight='bold' classList={styles.profileUserContentTitle}>Specialities</Typography>
            <FlexContainer classList={styles.profileUserSpecialityWrapper}>
              {specialities.length > 0
                ? specialities.map((speciality, i) => (
                  <div key={i} className={styles.profileUserSpeciality}>
                    {capitalizeFirstLetterOfEachWord(speciality)}
                  </div>
                ))
                : <Typography variant='h6'>{'You haven\'t added speciality in you education.'}</Typography>}
            </FlexContainer>
          </div>
        </>
        : null}
    </FlexContainer>
  )
}
