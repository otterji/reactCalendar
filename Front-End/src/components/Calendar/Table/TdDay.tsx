import React, { FunctionComponent } from 'react';
import { OpenModal } from '../_types/calendar';
import { StyledTdDay } from '../style';
import { TYPE_ADD } from '../utils/CONST'

type TdDayProps = {
  days: Date;
  openModal: OpenModal['openModal']
}

const TdDay: FunctionComponent<TdDayProps> = props => {
  const { days, openModal } = props;
  const onClickHandler = () => {
    openModal({ days, schedules: [], type: TYPE_ADD });
  }

  return (
    <StyledTdDay onClick={onClickHandler}>{
      (days as Date).getDate()
    }</StyledTdDay>
  )
}

export { TdDay };