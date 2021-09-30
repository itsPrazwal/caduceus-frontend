import React, { useState } from 'react'

import { Accordion, FlexContainer, Typography } from 'Components'

import { accords } from 'Utils/mockData'
import { FunctionWithParam, Nullable } from 'Utils/Types'

import styles from 'styles/faq/Faq.module.scss'

const Faq = () => {
  const [selected, setSelected] = useState<Nullable<number>>(null)

  const toggleAccordion:FunctionWithParam<Nullable<number>> = index => {
    setSelected(selected === index ? null : index)
  }

  return (
    <FlexContainer direction='col' align='start' classList={styles.faqWrapper}>
      <Typography variant='h1' weight='bold' classList={styles.faqTitle}>FREQUENTLY ASKED QUESTIONS</Typography>
      {Object.values(accords).map((val, ind) => (
        <div key={ind}>
          <Typography weight='bold' variant='h4' classList={styles.faqAccTitle}>{val.title}</Typography>
          {val.content.map((acc, i) => (
            <Accordion key={i} selected={selected} index={i} title={acc.title} content={acc.content} toggleAccordion={toggleAccordion} />
          ))}
        </div>
      ))}
    </FlexContainer>
  )
}

export default Faq
