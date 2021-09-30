import { NextPage } from 'next'
import {
  FlexContainer, ListCard,
  ProtectedPagesLayout, Typography,
} from '../../Components'
import { useEffect, useState } from 'react'
import { FieldTypeAmbulance, Nullable } from '../../Utils/Types'
import { apiGetAmbulance } from '../../ApiCalls/DataApi'
import { staticImagesUrl } from '../../Utils/constants'

const AmbulanceList:NextPage = () => {

  const [ambulanceList, setAmbulanceList] = useState<Nullable<FieldTypeAmbulance[]>>(null)

  useEffect(() => {
    const fetchAmbulance = async () => {
      const res = await apiGetAmbulance()
      setAmbulanceList(res)
    }
    if(!ambulanceList)
      fetchAmbulance()
  }, [ambulanceList])

  return(
    <ProtectedPagesLayout pageTitle={'Caduceus | Ambulances'}>
      <Typography variant='h1' classList={'listPageTopic'}>LIST OF <strong>AMBULANCES</strong></Typography>
      <FlexContainer fill={true} wrap={true}>
        {ambulanceList && ambulanceList.length > 0
          ? ambulanceList.map((ambulance, i) => (
            <ListCard key={i} name={ambulance.ambulanceName} address={ambulance.address} redirection={`/ambulances/${ambulance._id}`} imageUrl={staticImagesUrl.fallbackImages.ambulance} />
          ))
          : null}
      </FlexContainer>
    </ProtectedPagesLayout>
  )
}

export default AmbulanceList

