import { NextPage } from 'next'
import { Event, FlexContainer, ListCard, ProtectedPagesLayout, Typography } from 'Components'
import { useEffect, useMemo, useState } from 'react'
import { FieldTypeEvents, Nullable } from 'Utils/Types'
import { apiGetEvent } from 'ApiCalls/DataApi'
import { useRouter } from 'next/router'
import { staticImagesUrl } from 'Utils/constants'

const EventView:NextPage = () => {

  const router = useRouter()

  const eventId = useMemo(() => router.query.eventId || '', [router])

  const [eventList, setEventList] = useState<Nullable<FieldTypeEvents[]>>(null)

  const viewingEvent = useMemo(() => eventList?.filter(hl => hl._id === eventId), [eventList, eventId])

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await apiGetEvent()
      setEventList(res)
    }
    if(!eventList)
      fetchEvent()
  }, [eventList])
  return (
    <ProtectedPagesLayout pageTitle={'Hospital | '} hideOverFlow={false}>
      {viewingEvent && viewingEvent.length > 0
        ? <Event event={viewingEvent[0]} />
        : <>No data related.</>
      }
      <div style={{ padding: '0 5%' }}>
        <Typography variant='h3'>More Events</Typography>
        <FlexContainer fill={true} wrap={true}>
          {eventList && eventList.length > 0
            ? eventList.slice(0, 8).filter(el => el._id !== (viewingEvent && viewingEvent?.length > 0 ? viewingEvent[0]._id : '')).map((event, i) => (
              <ListCard key={i} name={event.eventName} address={event.address} redirection={`/events/${event._id}`} imageUrl={staticImagesUrl.fallbackImages.event} />
            ))
            : null}
        </FlexContainer>
      </div>
    </ProtectedPagesLayout>
  )
}
export default EventView
