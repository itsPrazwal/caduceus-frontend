import React, { FC } from 'react'

import { Typography } from 'Components'

import styles from './Modal.module.scss'

interface ModalProps {
    title: string,
    content: string,
    cancelButtonTitle: string,
    acceptButtonTitle: string,
    toggleModal: () => void
}

export const Modal: FC<ModalProps> = props => {
  const { title, content, cancelButtonTitle, acceptButtonTitle, toggleModal } = props
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalCloseBar}>
          <button onClick={toggleModal}>X</button>
        </div>
        <div className={styles.modalTitle}>
          <Typography variant='h2'>
            {title}
          </Typography>
        </div>
        <div className={styles.modalBody}>
          <Typography variant='p'>
            {content}
          </Typography>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.declineButton} onClick={toggleModal}>{cancelButtonTitle}</button>
          <button className={styles.primaryButton}>{acceptButtonTitle}</button>
        </div>
      </div>
    </div>
  )
}

