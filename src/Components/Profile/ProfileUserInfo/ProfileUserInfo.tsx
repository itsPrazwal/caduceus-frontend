import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Avatar, Button, FlexContainer, SideBarTabs, SvgIcons, Typography } from 'Components'

import { profilePageTabs, staticImagesUrl } from 'Utils/constants'
import { SvgIconName } from 'Utils/enum'
import { FunctionWithParam, Nullable } from 'Utils/Types'

import styles from './ProfileUserInfo.module.scss'
import { useUserContext } from '../../../Context'

interface ProfileUserInfoProps {
  queryValue: Nullable<string>,
  isEditing?: boolean
}

export const ProfileUserInfo:FC<ProfileUserInfoProps> = ({ queryValue, isEditing = false }) => {

  const router = useRouter()
  const { user: { userData } } = useUserContext()

  const tabList = profilePageTabs[isEditing ? 'edit' : 'main'].map(ppt => ({ ...ppt, onTabClick: async () => await handleTabClick(ppt.hrefUrl ? ppt.hrefUrl : `/profile/${ppt.value}`) }))

  const handleTabClick:FunctionWithParam<string> = async hrefUrl => {
    await router.push(hrefUrl)
  }

  return(
    <FlexContainer direction='col' classList={styles.profileUserInfoWrapper}>
      {isEditing
        ? null
        :
        <div className={styles.profileUserInfoDetailsWrapper}>
          <div className={styles.profileUserInfoBackgroundImage}>
            {userData?.imageUrl
              ? <Image src={staticImagesUrl.tempProfileImage} layout='fill' alt='pp' />
              : <Avatar variant='large' name={userData?.fullName || ''} />
            }
          </div>
          <FlexContainer direction='col' classList={styles.profileUserInfoContentWrapper} justify='center'>
            <div className={styles.profileUserInfoContentImage}>
              {userData?.imageUrl
                ? <Image src={staticImagesUrl.tempProfileImage} layout='fill' alt='pp' />
                : <Avatar variant='large' name={userData?.fullName || ''} />
              }
            </div>
            <Typography variant='h5' weight='bold' classList={styles.profileUserInfoContentDetail} >{userData?.fullName}</Typography>
            <Typography variant='h6' classList={styles.profileUserInfoContentDetail} >{userData?.emailId}</Typography>
            <Typography variant='h6' classList={styles.profileUserInfoContentDetail} >{userData?.userType}</Typography>
            <Typography variant='h6' classList={styles.profileUserInfoContentDetail} >{userData?.phoneNumber || 'No Number'}</Typography>
            <Link href={'/profile/edit'} passHref={true}><Button className={styles.profileUserInfoEditButton}><SvgIcons iconName={SvgIconName.PENCIL}/> Edit Profile</Button></Link>
          </FlexContainer>
        </div>
      }
      <SideBarTabs activeValue={queryValue} tabList={tabList} />
    </FlexContainer>
  )
}
