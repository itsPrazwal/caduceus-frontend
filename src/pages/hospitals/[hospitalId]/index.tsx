import { NextPage } from 'next'
import { FlexContainer, Hospital, ListCard, ProtectedPagesLayout, Typography } from 'Components'
import { useEffect, useMemo, useState } from 'react'
import { FieldTypeHospital, Nullable } from 'Utils/Types'
import { apiGetHospital } from 'ApiCalls/DataApi'
import { useRouter } from 'next/router'
import { staticImagesUrl } from 'Utils/constants'

const HospitalView:NextPage = () => {

  const router = useRouter()

  const hospitalId = useMemo(() => router.query.hospitalId || '', [router])

  const [hospitalList, setHospitalList] = useState<Nullable<FieldTypeHospital[]>>(null)

  const viewingHospital = useMemo(() => hospitalList?.filter(hl => hl._id === hospitalId), [hospitalList, hospitalId])

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await apiGetHospital()
      setHospitalList(res)
    }
    if(!hospitalList)
      fetchHospital()
  }, [hospitalList])
  return (
    <ProtectedPagesLayout pageTitle={'Hospital | '} hideOverFlow={false}>
      {viewingHospital && viewingHospital.length > 0
        ? <Hospital hospital={viewingHospital[0]} />
        : <>No data related.</>
      }
      <div style={{ padding: '0 5%' }}>
        <Typography variant='h3'>More Hospitals</Typography>
        <FlexContainer fill={true} wrap={true}>
          {hospitalList && hospitalList.length > 0
            ? hospitalList.slice(0, 8).filter(hl => hl._id !== (viewingHospital && viewingHospital.length > 0 ? viewingHospital[0]._id : '')).map((hospital, i) => (
              <ListCard key={i} name={hospital.name} address={hospital.address} redirection={`/hospitals/${hospital._id}`} imageUrl={staticImagesUrl.fallbackImages.hospital} />
            ))
            : null}
        </FlexContainer>
      </div>
    </ProtectedPagesLayout>
  )
}
export default HospitalView
