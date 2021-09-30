import { NextPage } from 'next'
import {
  FlexContainer, ListCard,
  ProtectedPagesLayout,
  Typography
} from '../../Components'
import { useEffect, useState } from 'react'
import { FieldTypeEvents, Nullable } from '../../Utils/Types'
import { apiGetEvent } from '../../ApiCalls/DataApi'
import { staticImagesUrl } from '../../Utils/constants'

const HospitalList:NextPage = () => {

  const [eventList, setEventList] = useState<Nullable<FieldTypeEvents[]>>(null)

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await apiGetEvent()
      setEventList(res)
    }
    if(!eventList)
      fetchHospital()
  }, [eventList])

  return(
    <ProtectedPagesLayout pageTitle={'Caduceus | Events'}>
      <Typography variant='h1' classList={'listPageTopic'}>LIST OF <strong>EVENTS</strong></Typography>
      <FlexContainer fill={true} wrap={true}>
        {eventList && eventList.length > 0
          ? eventList.map((event, i) => (
            <ListCard key={i} name={event.eventName} address={event.address} redirection={`/events/${event._id}`} imageUrl={staticImagesUrl.fallbackImages.event} />
          ))
          : null}
      </FlexContainer>
    </ProtectedPagesLayout>
  )
}

export default HospitalList

