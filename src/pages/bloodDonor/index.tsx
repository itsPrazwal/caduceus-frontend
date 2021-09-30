import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { FieldTypeUserDataPublic, FunctionWithParam, Nullable } from '../../Utils/Types'
import { BloodGroup } from '../../Utils/enum'
import { bloodGroupList } from '../../Utils/en'
import { BloodDonorCard, Button, FlexContainer, ProtectedPagesLayout, Typography } from '../../Components'
import styles from 'styles/bloodDonor/BloodDonor.module.scss'
import { useDataContext, useUserContext } from '../../Context'
import { toast } from 'react-toastify'
import { apiCreateRequest } from '../../ApiCalls/RequestApi'

const BloodDonor:NextPage = () => {

  const router = useRouter()
  const { isLoggedIn, user: { userData } } = useUserContext()
  const { bloodDonorList, requestList:  bloodRequestList, fetchList } = useDataContext()

  const [filteredList, setFilteredList] = useState<Nullable<FieldTypeUserDataPublic[]>>(null)
  const [requestingId, setRequestingId] = useState<Nullable<string>>(null)

  const bloodGroup:Nullable<BloodGroup> = useMemo(() => {
    const queryData = router.query.grp
    return queryData ? bloodGroupList.findIndex(bgl => bgl.value === queryData) > -1 ? queryData as BloodGroup : null : null
  }, [router])

  useEffect(() => {
    setFilteredList(bloodDonorList ? bloodGroup ? [...bloodDonorList?.filter(ps => ps.bloodGroup === bloodGroup)] : bloodDonorList : null)
  }, [bloodGroup, bloodDonorList])

  const handleRequestClick:FunctionWithParam<string> = async donorId => {
    if(isLoggedIn){
      setRequestingId(donorId)
      const res = await apiCreateRequest({ donorId, patientId: userData?._id || '' })
      if(res === 'SUCCESS'){
        toast.success('Your request has been placed')
        await fetchList('REQUEST')
      }
      setRequestingId(null)
    }else{
      toast.warning('You need to be logged in to request donor.')
    }
  }

  return(
    <ProtectedPagesLayout pageTitle='Caduceus | Blood Donor'>
      <FlexContainer fill={true} direction='col' classList={styles.bloodDonorPageWrapper}>
        <Typography variant='h2' classList={styles.bloodDonorPageTitle}>LIST OF <strong>BLOOD DONORS</strong></Typography>
        <FlexContainer classList={styles.bloodDonorFilterWrapper}>
          {bloodGroupList.map(bgl =>
            <div key={bgl.value} className={classNames(styles.bloodDonorFilterTab, bloodGroup === bgl.value ? styles.bloodDonorFilterTabActive : '')} onClick={() => router.replace(`/bloodDonor?grp=${encodeURIComponent(bgl.value)}`)}>
              <span />{bgl.value}
            </div>
          )}
          <Button className={styles.bloodDonorFilterButton} type='button' variant='secondary' onClick={() => router.replace(`/bloodDonor`)}>Reset</Button>
        </FlexContainer>
        <FlexContainer fill={true} wrap={true} classList={styles.bloodDonorListWrapper}>
          {filteredList && filteredList.length > 0
            ? filteredList.map((bdl, i) => {
              const index = bloodRequestList && bloodRequestList.length > 0 ? bloodRequestList?.findIndex(brl => brl.donorId === bdl._id) : -1
              return <BloodDonorCard
                hasStatus={index > -1 ? bloodRequestList && bloodRequestList.length > 0 ? bloodRequestList[index].status : null : null}
                isRequesting={requestingId ? requestingId === bdl._id : false}
                onRequestClick={handleRequestClick}
                key={bdl._id}
                bloodDonor={bdl}
                wrapperStyle={classNames(styles.bloodDonorListCard, (i % 4 === 0) ? styles.bloodDonorListStartCard : '')}
              />
            })
            : <>No Blood Donors Available</>}
        </FlexContainer>
      </FlexContainer>
    </ProtectedPagesLayout>
  )
}

export default BloodDonor
