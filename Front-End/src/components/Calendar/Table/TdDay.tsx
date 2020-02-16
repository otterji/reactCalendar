import React, { FunctionComponent, useState } from 'react';
import { OpenModal } from '../_types/calendar';
import { StyledTdDay } from '../style';
import { TYPE_ADD } from '../utils/CONST'

type TdDayProps = {
  days: Date;
  openModal: OpenModal['openModal']
  onMouseHover: any;
}

const TdDay: FunctionComponent<TdDayProps> = props => {
  const { days, openModal, onMouseHover } = props;
  const onClickHandler = () => {
    openModal({ days, schedules: [], type: TYPE_ADD });
  }

  const [hoverDay, setHoverDay] = useState([] as any);
  const isHover = (e: any) => {
    // 범위 안에 있으면
    return true
  }

  return (
    isHover((days as Date).getDate())
      ?
      <StyledTdDay onClick={onClickHandler} >{
        (days as Date).getDate()
      }</StyledTdDay>
      :
      <StyledTdDay onClick={onClickHandler} >{
        (days as Date).getDate()
      }</StyledTdDay>
  )
}

export { TdDay };
