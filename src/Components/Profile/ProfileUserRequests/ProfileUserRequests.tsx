import React, {ChangeEventHandler, FC, FormEventHandler, useState} from 'react'
import classNames from 'classnames'

import {Avatar, Button, Divider, FlexContainer, Tab, Tabs, TextArea, Typography} from 'Components'

import {ClassNameScrollBar, ProfileMainNavTabValue, RequestStatus, UserRequestTabName} from 'Utils/enum'
import {userRequestTab} from 'Utils/constants'

import styles from './ProfileUserRequests.module.scss'
import {useDataContext, useUserContext} from '../../../Context'
import Image from 'next/image'
import {FieldTypeRequestMain, FieldTypeUserDataPublic, FunctionWithParam, Nullable} from '../../../Utils/Types'

interface ProfileUserRequestsProps {
    activeRequestType: UserRequestTabName,
    onRequestAction: FunctionWithParam<FieldTypeRequestMain>
}

export const ProfileUserRequests:FC<ProfileUserRequestsProps> = ({ activeRequestType, onRequestAction }) => {

  const { requestList, requesterList, bloodDonorList } = useDataContext()
  const { user: { userData } } = useUserContext()

  return(
    <div className={classNames(styles.requestWrapper, ClassNameScrollBar.Y)}>
      <Tabs defaultTab={activeRequestType}>
        <Tab hrefUrl={`/profile/${ProfileMainNavTabValue.REQUEST}?requestType=${userRequestTab[0].value}`} label={userRequestTab[0].displayName} value={userRequestTab[0].value}>
          <FlexContainer classList={styles.requestCardContainer} fill={true} direction='col' justify='start' align='start'>
            {requestList && requestList.length > 0
              ? requestList.filter(req => req.patientId === userData?._id).map((req, i) => {
                const user = bloodDonorList?.filter(bd => bd._id === req.donorId) || []
                return (
                  <React.Fragment key={i}>
                    <RequestCard request={req} user={user} />
                    <Divider />
                  </React.Fragment>
                )
              })
              : null}
          </FlexContainer>
        </Tab>
        <Tab hrefUrl={`/profile/${ProfileMainNavTabValue.REQUEST}?requestType=${userRequestTab[1].value}`} label={userRequestTab[1].displayName} value={userRequestTab[1].value}>
          <FlexContainer classList={styles.requestCardContainer} fill={true} direction='col' justify='start' align='start'>
            {requestList && requestList.length > 0
              ? requestList.filter(req => req.donorId === userData?._id).map((req, i) => {
                const user = requesterList?.filter(bd => bd._id == req.patientId) || []
                return (
                  <React.Fragment key={i}>
                    <RequestCard onRequestAction={onRequestAction} hasActions={req.status === RequestStatus.PENDING} request={req} user={user} />
                    <Divider />
                  </React.Fragment>
                )
              })
              : null}
          </FlexContainer>
        </Tab>
      </Tabs>
    </div>
  )
}

const RequestCard:FC<{ user: FieldTypeUserDataPublic[], request: FieldTypeRequestMain, hasActions?: boolean, onRequestAction?: FunctionWithParam<FieldTypeRequestMain> }> = ({ user, request, hasActions, onRequestAction }) => {

  const [selectedStatus, setSelectedStatus] = useState<Nullable<RequestStatus>>(null)
  const [writtenMessage, setWrittenMessage] = useState<string>('')
  const [error, setError] = useState<Nullable<string>>(null)

  const handleActionClick:FunctionWithParam<RequestStatus> = status => {
    setSelectedStatus(status === selectedStatus ? null : status)
  }

  const handleActionSubmit:FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if(selectedStatus === RequestStatus.DECLINED && !writtenMessage){
      setError('Please state reason for decline.')
    }else{
      onRequestAction ? onRequestAction({ ...request, status: selectedStatus as RequestStatus, message: writtenMessage }) : null
    }
  }

  const handleChange:ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    setWrittenMessage(value)
    setError(null)
  }

  return(
    <FlexContainer fill={true} direction='col' align='start' justify='start' classList={styles.requestCardWrapper}>
      {user.length > 0
        ?
        <FlexContainer fill={true} classList={styles.requestCardInfoWrapper}>
          <div className={styles.requestCardImage}>
            {user[0].imageUrl
              ? <Image src={user[0].imageUrl} layout='fill' alt='pp' />
              : <Avatar variant='medium' name={user[0].fullName} />}
          </div>
          <Typography variant='h3' classList={styles.requestCardBloodGroup}>{user[0].bloodGroup}</Typography>
          <Typography variant='h5' classList={styles.requestCardName}>{user[0].fullName}</Typography>
          {request.status === RequestStatus.ACCEPTED
            ?
            <>
              <Typography classList={styles.requestCardContactInfo}>{user[0].phoneNumber}</Typography>
              <Typography classList={styles.requestCardContactInfo}>{user[0].address?.isPublic ? user[0].address.detail : 'Address is hidden'}</Typography>
            </>
            : <Typography>Contact Information Hidden</Typography>
          }
          <FlexContainer classList={styles.requestCardStatusOrActionWrapper}>
            {!hasActions
              ? <Typography classList={classNames(styles.requestCardStatus, request.status === RequestStatus.ACCEPTED ? styles.requestAccepted : request.status === RequestStatus.PENDING ? styles.requestPending : styles.requestDeclined)}>{request.status}</Typography>
              :
              <>
                <Button variant='secondary' className={classNames(styles.requestAccepted, selectedStatus === RequestStatus.ACCEPTED ? styles.requestActionSelected : '')} onClick={() => handleActionClick(RequestStatus.ACCEPTED)}>{selectedStatus === RequestStatus.ACCEPTED ? 'Accepted' : 'Accept'}</Button>
                <Button variant='secondary' className={classNames(styles.requestDeclined, selectedStatus === RequestStatus.DECLINED ? styles.requestActionSelected : '')} onClick={() => handleActionClick(RequestStatus.DECLINED)}>{selectedStatus === RequestStatus.DECLINED ? 'Declined' : 'Decline'}</Button>
              </>
            }
          </FlexContainer>
        </FlexContainer>
        : <Typography classList={styles.requestCardName}>Caduceus User</Typography>}
      {hasActions && selectedStatus
        ?
        <form onSubmit={handleActionSubmit} className={styles.requestCardForm}>
          <TextArea wrapperStyle={styles.requestCardFormTextArea} error={error} placeholder='Please enter message regarding your status' autoFocus value={writtenMessage} onChange={handleChange} />
          <Button type='submit'>Confirm</Button>
          <Button type='button' variant='secondary' onClick={() => setSelectedStatus(null)}>Cancel</Button>
        </form>
        : <Typography variant='p' classList={styles.requestCardMessage}>{request.message || 'No message has been set.'}</Typography>
      }
    </FlexContainer>
  )
}
