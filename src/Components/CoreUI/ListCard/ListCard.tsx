import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FlexContainer, SvgIcons, Typography } from 'Components'
import { SvgIconName } from 'Utils/enum'
import styles from './ListCard.module.scss'

interface ListCardProps {
    name: string,
    address: string,
    redirection: string,
    imageUrl: string
}

export const ListCard:FC<ListCardProps> = ({ redirection, address, name, imageUrl }) => {

  const router = useRouter()

  return(
    <div className={styles.listCardWrapper} onClick={async () => await router.replace(redirection)}>
      <FlexContainer justify='center' classList={styles.listCardImage}>
        <Image src={imageUrl} alt='fallback' layout='fixed' height={400} width={650}  />
      </FlexContainer>
      <div className={styles.listCardBlur} />
      <FlexContainer justify='start' align='start' direction='col' classList={styles.listCardContentWrapper}>
        <Typography variant='h5' weight='bold' classList={styles.listCardTitle}>{name}</Typography>
        <Typography variant='p'><SvgIcons iconName={SvgIconName.USER}/> {address}</Typography>
      </FlexContainer>
    </div>
  )
}
