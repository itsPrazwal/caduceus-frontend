import { FC } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { Avatar, Button, FlexContainer, Typography } from 'Components'
import { FieldTypeUserDataPublic, FunctionWithParam, Nullable } from 'Utils/Types'
import styles from './BloodDonorCard.module.scss'
import { RequestStatus } from '../../../Utils/enum'
import { capitalizeFirstLetterOfEachWord } from '../../../Utils/UtilFunctions'

interface BloodDonorCardProps{
    bloodDonor: FieldTypeUserDataPublic,
    wrapperStyle?: string
    onRequestClick: FunctionWithParam<string>
    isRequesting: boolean,
    hasStatus: Nullable<RequestStatus>
}

export const BloodDonorCard:FC<BloodDonorCardProps> = ({ bloodDonor, wrapperStyle, onRequestClick, isRequesting, hasStatus }) => {
  return(
    <FlexContainer key={bloodDonor._id} classList={classNames(styles.bloodDonorCardWrapper, wrapperStyle ? wrapperStyle : '')}>
      <div className={styles.bloodDonorCardImage}>
        {bloodDonor.imageUrl
          ? <Image src={bloodDonor.imageUrl} layout='fill' alt='pp' />
          : <Avatar variant='medium' name={bloodDonor.fullName} />}
      </div>
      <FlexContainer direction='col' align='start' fill={true} >
        <FlexContainer justify='spaceBetween' fill={true}>
          <Typography variant='h3' classList={styles.bloodDonorCardBloodGroup}>{bloodDonor.bloodGroup}</Typography>
          <Button loading={isRequesting} variant='secondary'
            className={classNames(styles.bloodDonorCardButton, hasStatus ? hasStatus === RequestStatus.PENDING ? styles.buttonPending : hasStatus === RequestStatus.DECLINED ? styles.buttonDeclined : styles.buttonAccepted : ''  )}
            onClick={() => hasStatus ? null : onRequestClick(bloodDonor._id)}>
            {hasStatus ? capitalizeFirstLetterOfEachWord(hasStatus) : 'Request'}
          </Button>
        </FlexContainer>
        <Typography variant='h5' classList={styles.bloodDonorCardName}>{bloodDonor.fullName}</Typography>
      </FlexContainer>
    </FlexContainer>
  )
}
