import React, { FunctionComponent } from 'react';
import { StyledTd, StyledScheduleLi, StyledScheduleUi } from '../style';
import { DateData, OpenModal, ServerData } from '../_types/calendar';
import {TdDay} from './TdDay';
import { TYPE_DETAIL } from '../utils/CONST';

const Td: FunctionComponent<DateData & OpenModal> = props => {
    const {days, schedules, openModal} = props;

    const onClickHandler = (e: any) => {
      openModal({days: (days as Date), schedules: [e], type: TYPE_DETAIL});
    }

    const scheduleList = schedules.map((e: ServerData, idx: number) => (
      <StyledScheduleLi key={idx} onClick={() => onClickHandler(e)} >{e.title}</StyledScheduleLi>
    ));
    
    return (
      <StyledTd isDisplay={days !== 0} >
        {days === 0 ? null 
        : (
          <>
            <TdDay days={(days) as Date} openModal={openModal} />
            <StyledScheduleUi>{scheduleList}</StyledScheduleUi>
          </>
        )
      }</StyledTd>
    )
};

export { Td };