import { NextPage } from 'next'
import { Ambulance, FlexContainer, ListCard, ProtectedPagesLayout, Typography } from 'Components'
import { useEffect, useMemo, useState } from 'react'
import { FieldTypeAmbulance, Nullable } from 'Utils/Types'
import { apiGetAmbulance } from 'ApiCalls/DataApi'
import { useRouter } from 'next/router'
import { staticImagesUrl } from 'Utils/constants'

const HospitalView:NextPage = () => {

  const router = useRouter()

  const ambulanceId = useMemo(() => router.query.ambulanceId || '', [router])

  const [ambulanceList, setAmbulanceList] = useState<Nullable<FieldTypeAmbulance[]>>(null)

  const viewingAmbulance = useMemo(() => ambulanceList?.filter(hl => hl._id === ambulanceId), [ambulanceList, ambulanceId])

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await apiGetAmbulance()
      setAmbulanceList(res)
    }
    if(!ambulanceList)
      fetchHospital()
  }, [ambulanceList])
  return (
    <ProtectedPagesLayout pageTitle={'Hospital | Ambulances'} hideOverFlow={false}>
      {viewingAmbulance && viewingAmbulance.length > 0
        ? <Ambulance ambulance={viewingAmbulance[0]} />
        : <>No data related.</>
      }
      <div style={{ padding: '0 5%' }}>
        <Typography variant='h3'>More Blood Banks</Typography>
        <FlexContainer fill={true} wrap={true}>
          {ambulanceList && ambulanceList.length > 0
            ? ambulanceList.slice(0, 8).filter(bl => bl._id !== (viewingAmbulance && viewingAmbulance.length > 0 ? viewingAmbulance[0]._id : '')).map((ambulance, i) => (
              <ListCard key={i} name={ambulance.ambulanceName} address={ambulance.address} redirection={`/ambulances/${ambulance._id}`} imageUrl={staticImagesUrl.fallbackImages.ambulance} />
            ))
            : null}
        </FlexContainer>
      </div>
    </ProtectedPagesLayout>
  )
}
export default HospitalView
