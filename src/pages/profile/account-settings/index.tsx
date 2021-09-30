import React  from 'react'
import classNames from 'classnames'

import { Button, ChangePassword, Divider, FlexContainer, ProfileLayout, Typography } from 'Components'
import { ClassNameScrollBar, ProfileEditNavTabValue } from 'Utils/enum'
import styles from 'styles/profile/account-settings/AccountSettings.module.scss'
import { accountSettingsLabels } from 'Utils/en'
import { ApiErrorObject, FieldTypeChangePassword, FunctionWithParamAndReturn } from 'Utils/Types'
import { apiAuthChangePassword } from 'ApiCalls/AuthApi'
import { AxiosError } from 'axios'
import { useUserContext } from '../../../Context'

const AccountSettings = () => {

  const { user: { userData } } = useUserContext()

  const handlePasswordChange:FunctionWithParamAndReturn<FieldTypeChangePassword, Promise<{status: 'SUCCESS' | 'FAILURE', message: string}>> = value => {
    return new Promise<{status: 'SUCCESS' | 'FAILURE', message: string}>(async resolve => {
      try{
        await apiAuthChangePassword(value)
        resolve({ status: 'SUCCESS', message: 'Password changed successfully.' })
      }catch (err){
        const { response } = err as AxiosError<ApiErrorObject>
        const message = response?.data?.message || 'internal server error'
        resolve({ status: 'FAILURE', message })
      }
    })
  }

  return (
    <ProfileLayout queryValue={ProfileEditNavTabValue.ACCOUNT_SETTINGS} isEditing={true}>
      <FlexContainer classList={classNames(styles.accountSettingsWrapper, ClassNameScrollBar.Y)} direction='col' justify='start' align='start'>
        <Typography variant='h2' weight='bold'>Account Settings</Typography>
        <FlexContainer classList={styles.accountSettingsLabelInputWrapper}>
          <Typography variant='h5' classList={styles.accountSettingsLabel}>Email Address</Typography>
          <Typography variant='h5' classList={styles.accountSettingsUnEditableValue}>{userData?.emailId}</Typography>
        </FlexContainer>
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>Password</Typography>
        <ChangePassword onSubmit={handlePasswordChange} />
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>{accountSettingsLabels.deactivateAccount.title}</Typography>
        <Typography variant='p' classList={styles.accountSettingsFieldDescription}>{accountSettingsLabels.deactivateAccount.description}</Typography>
        <Button variant='primary'>{accountSettingsLabels.deactivateAccount.buttonLabel}</Button>
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>{accountSettingsLabels.deleteAccount.title}</Typography>
        <Typography variant='p' classList={styles.accountSettingsFieldDescription}>{accountSettingsLabels.deleteAccount.description}</Typography>
        <Button variant='primary'>{accountSettingsLabels.deleteAccount.buttonLabel}</Button>
        <Divider />
        <Typography variant='h4' weight='bold' classList={styles.accountSettingsFieldTitle}>{accountSettingsLabels.hideAccount.title}</Typography>
        <Typography variant='p' classList={styles.accountSettingsFieldDescription}>{accountSettingsLabels.hideAccount.description}</Typography>
        <Button variant='primary'>{accountSettingsLabels.hideAccount.buttonLabel}</Button>
      </FlexContainer>
    </ProfileLayout>
  )
}

export default AccountSettings
