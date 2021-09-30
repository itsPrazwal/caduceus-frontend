import { NextPage } from 'next'
import {
  FlexContainer, ListCard,
  ProtectedPagesLayout,
  Typography
} from '../../Components'
import { useEffect, useState } from 'react'
import { FieldTypeHospital, Nullable } from '../../Utils/Types'
import { apiGetHospital } from '../../ApiCalls/DataApi'
import { staticImagesUrl } from '../../Utils/constants'

const HospitalList:NextPage = () => {

  const [hospitalList, setHospitalList] = useState<Nullable<FieldTypeHospital[]>>(null)

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await apiGetHospital()
      setHospitalList(res)
    }
    if(!hospitalList)
      fetchHospital()
  }, [hospitalList])

  return(
    <ProtectedPagesLayout pageTitle={'Caduceus | Hospitals'}>
      <Typography variant='h1' classList={'listPageTopic'}>LIST OF <strong>HOSPITALS</strong></Typography>
      <FlexContainer fill={true} wrap={true}>
        {hospitalList && hospitalList.length > 0
          ? hospitalList.map((hospital, i) => (
            <ListCard key={i} name={hospital.name} address={hospital.address} redirection={`/hospitals/${hospital._id}`} imageUrl={staticImagesUrl.fallbackImages.hospital} />
          ))
          : null}
      </FlexContainer>
    </ProtectedPagesLayout>
  )
}

export default HospitalList

