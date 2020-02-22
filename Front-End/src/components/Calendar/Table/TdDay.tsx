import React, { FunctionComponent, useState } from 'react';
import { OpenModal } from '../_types/calendar';
import { StyledTdDay, HoveredStyledTdDay } from '../style';
import { TYPE_ADD } from '../utils/CONST'

type TdDayProps = {
  days: Date;
  openModal: OpenModal['openModal']
  onMouseHover: any;
}

const TdDay: FunctionComponent<TdDayProps & any> =(props) => {
  const { days, openModal, hoverRange } = props;
  const onClickHandler = () => {
    openModal({ days, schedules: [], type: TYPE_ADD });
  }


  const isHover = (e: any) => {
    return hoverRange[0] <= e && e <= hoverRange[1] ? true : false
  }


  return (
    isHover((days as Date).getDate())
      ?
      <HoveredStyledTdDay onClick={onClickHandler} >{
        (days as Date).getDate()
      }</HoveredStyledTdDay>
      :
      <StyledTdDay onClick={onClickHandler} >{
        (days as Date).getDate()
      }</StyledTdDay>
  )
}

export { TdDay };
