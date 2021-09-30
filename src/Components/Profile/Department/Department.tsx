import { FC, useEffect, useMemo, useState } from 'react'
import { useDataContext } from 'Context'
import { Button, FlexContainer, Input, SvgIcons, Typography } from 'Components'
import {
  FieldTypeDepartment,
  FunctionWithNoParam,
  FunctionWithParam,
  FunctionWithParamAndReturn,
  Nullable
} from 'Utils/Types'
import { SvgIconName } from 'Utils/enum'

import styles from './Department.module.scss'

interface DepartmentProps {
  onSubmit: FunctionWithParam<{ relatedDepartment: string[] }>,
  isSubmitting: boolean,
  storedData: string[]
}

export const Department:FC<DepartmentProps> = ({ onSubmit, isSubmitting, storedData }) => {

  const { departmentList } = useDataContext()

  const [visibleList, setVisibleList] = useState<Nullable<FieldTypeDepartment[]>>(null)
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [filterValue, setFilterValue] = useState<'ALL' | 'MINE' | 'SELECTED'>('ALL')


  useEffect(() => {
    setSelectedCards(storedData)
  }, [storedData])

  useEffect(() => {
    if(!visibleList && departmentList)
      setVisibleList(departmentList)
  },[visibleList, departmentList])

  useEffect(() => {
    if(filterValue === 'ALL')
      setVisibleList(departmentList)
    if(filterValue === 'SELECTED')
      setVisibleList(departmentList?.filter(dl => selectedCards.findIndex(sc => sc === dl._id) > -1) || null)
    if(filterValue === 'MINE')
      setVisibleList(departmentList?.filter(dl => storedData.findIndex(sc => sc === dl._id) > -1) || null)
  }, [filterValue, departmentList, selectedCards, storedData])

  const isSelected:FunctionWithParamAndReturn<string, boolean> = id => selectedCards.findIndex(sc => sc === id) > -1

  const disableUpdate = useMemo(() => (selectedCards.length === storedData.length) && (((selectedCards.map(sc => (storedData.findIndex(sd => sd === sc) === -1))).findIndex(sd => !sd) ) > -1), [selectedCards, storedData])

  const handleSelect:FunctionWithParam<string> = id => {
    if(!isSubmitting)
      setSelectedCards(prevState => isSelected(id) ? [...prevState.filter(ps => ps !== id)] : [...prevState, id])
  }

  const handleUpdate:FunctionWithNoParam = async () => {
    await onSubmit({ relatedDepartment: selectedCards })
    setSelectedCards([])
  }

  return(
    <>
      <FlexContainer fill justify='spaceBetween' classList={styles.departmentFilterWrapper}>
        <FlexContainer>
          <Button className={styles.departmentFilterButton} variant={filterValue === 'ALL' ? 'secondary' : 'text'} onClick={() => setFilterValue('ALL')} >All</Button>
          <Button className={styles.departmentFilterButton} variant={filterValue === 'MINE' ? 'secondary' : 'text'} onClick={() => setFilterValue('MINE')} >Mine</Button>
          <Button className={styles.departmentFilterButton} variant={filterValue === 'SELECTED' ? 'secondary' : 'text'} onClick={() => setFilterValue('SELECTED')} >Selected</Button>
        </FlexContainer>
        <Input wrapperStyle={styles.departmentFilterInput} error={null} category='small' type='search' placeholder='search' />
      </FlexContainer>
      <Button disabled={disableUpdate} loading={isSubmitting} variant='primary' onClick={handleUpdate}>Update</Button>
      <FlexContainer fill wrap classList={styles.departmentCardContainer}>
        {visibleList && visibleList.length > 0
          ? visibleList.map(vl => (
            <FlexContainer key={vl._id} classList={styles.departmentCardWrapper} onClick={() => handleSelect(vl._id)}>
              {isSelected(vl._id) ? <div className={styles.departmentCardActive}><SvgIcons iconName={SvgIconName.TICK_MARK}/></div> : null}
              <div className={styles.departmentCardImage} />
              <Typography variant='h5' classList={styles.departmentCardName}>{vl.name}</Typography>
            </FlexContainer>
          ))
          : <>No Departments</>}
      </FlexContainer>
    </>
  )
}
