import { NextPage } from 'next'
import { BloodBank, FlexContainer, ListCard, ProtectedPagesLayout, Typography } from 'Components'
import { useEffect, useMemo, useState } from 'react'
import { FieldTypeBloodBank, Nullable } from 'Utils/Types'
import { apiGetBloodBank } from 'ApiCalls/DataApi'
import { useRouter } from 'next/router'
import { staticImagesUrl } from 'Utils/constants'

const HospitalView:NextPage = () => {

  const router = useRouter()

  const bloodBankId = useMemo(() => router.query.bloodBankId || '', [router])

  const [bloodBankList, setBloodBankList] = useState<Nullable<FieldTypeBloodBank[]>>(null)

  const viewingBloodBank = useMemo(() => bloodBankList?.filter(hl => hl._id === bloodBankId), [bloodBankList, bloodBankId])

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await apiGetBloodBank()
      setBloodBankList(res)
    }
    if(!bloodBankList)
      fetchHospital()
  }, [bloodBankList])
  return (
    <ProtectedPagesLayout pageTitle={'Hospital | '} hideOverFlow={false}>
      {viewingBloodBank && viewingBloodBank.length > 0
        ? <BloodBank bloodBank={viewingBloodBank[0]} />
        : <>No data related.</>
      }
      <div style={{ padding: '0 5%' }}>
        <Typography variant='h3'>More Blood Banks</Typography>
        <FlexContainer fill={true} wrap={true}>
          {bloodBankList && bloodBankList.length > 0
            ? bloodBankList.slice(0, 8).filter(bl => bl._id !== (viewingBloodBank && viewingBloodBank.length > 0 ? viewingBloodBank[0]._id : '')).map((bloodBank, i) => (
              <ListCard key={i} name={bloodBank.bloodBankName} address={bloodBank.address} redirection={`/bloodBanks/${bloodBank._id}`} imageUrl={staticImagesUrl.fallbackImages.bloodBank} />
            ))
            : null}
        </FlexContainer>
      </div>
    </ProtectedPagesLayout>
  )
}
export default HospitalView
