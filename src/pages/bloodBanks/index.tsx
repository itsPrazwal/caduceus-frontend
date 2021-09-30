import { NextPage } from 'next'
import {
  FlexContainer, ListCard,
  ProtectedPagesLayout, Typography,
} from '../../Components'
import { useEffect, useState } from 'react'
import { FieldTypeBloodBank, Nullable } from '../../Utils/Types'
import { apiGetBloodBank } from '../../ApiCalls/DataApi'
import { staticImagesUrl } from '../../Utils/constants'

const BloodBankList:NextPage = () => {

  const [bloodBankList, setBloodBankList] = useState<Nullable<FieldTypeBloodBank[]>>(null)


  useEffect(() => {
    const fetchBloodBank = async () => {
      const res = await apiGetBloodBank()
      setBloodBankList(res)
    }
    if(!bloodBankList)
      fetchBloodBank()
  }, [bloodBankList])

  return(
    <ProtectedPagesLayout pageTitle={'Caduceus | Blood Banks'}>
      <Typography variant='h1' classList={'listPageTopic'}>LIST OF <strong>BLOOD BANKS</strong></Typography>
      <FlexContainer fill={true} wrap={true}>
        {bloodBankList && bloodBankList.length > 0
          ? bloodBankList.map((bloodBank, i) => (
            <ListCard key={i} name={bloodBank.bloodBankName} address={bloodBank.address} redirection={`/bloodBanks/${bloodBank._id}`} imageUrl={staticImagesUrl.fallbackImages.bloodBank} />
          ))
          : null}
      </FlexContainer>
    </ProtectedPagesLayout>
  )
}

export default BloodBankList

