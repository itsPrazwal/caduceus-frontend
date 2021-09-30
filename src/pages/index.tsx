import { useState } from 'react'

import {
  AmbulanceCarousel,
  BannerCarousel,
  BloodBankCarousel,
  EventCarousel,
  Footer, HospitalCarousel,
  ProtectedPagesLayout,
  ReviewCarousel,
  ScreenLoading,
  SinglePageScroll
} from 'Components'

import { FunctionWithParam } from 'Utils/Types/main'
import { useUserContext } from '../Context'

export default function Home() {

  const { user: { loading } } = useUserContext()

  const [keyIndex, setKeyIndex] = useState<number>(0)
  const totalComponents = 7

  const renderComponent = index => {
    switch (index){
    case 0:
      return <BannerCarousel />
    case 1:
      return <HospitalCarousel />
    case 2:
      return <EventCarousel />
    case 3:
      return <AmbulanceCarousel />
    case 4:
      return <BloodBankCarousel />
    case 5:
      return <ReviewCarousel />
    case 6:
      return <Footer />
    default:
      return <></>
    }
  }

  const handleIndexChange:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return (
    <>
      {loading
        ? <ScreenLoading />
        : (
          <ProtectedPagesLayout pageTitle='Caduceus Nepal'>
            <SinglePageScroll keyIndex={keyIndex} setKeyIndex={handleIndexChange} totalComponents={totalComponents}>
              {renderComponent(keyIndex)}
            </SinglePageScroll>
          </ProtectedPagesLayout>
        )}
    </>
  )
}
