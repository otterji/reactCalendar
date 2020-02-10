import React, { FunctionComponent } from 'react';
import { StyledTd, StyledScheduleLi, StyledScheduleUi, StyledClearIcon, StyledLiTitle, StartLabel } from '../style';
import { DateData, OpenModal, ServerData } from '../_types/calendar';
import {TdDay} from './TdDay';
import { TYPE_DETAIL } from '../utils/CONST';
import axios from 'axios';
import { url as _url } from '../../../url';

type Reload = {
  reload: () => void;
}

const Td: FunctionComponent<DateData & OpenModal & Reload> = props => {
    const { days, schedules, openModal, reload } = props;

    const onClickHandler = (e: any) => {
      openModal({days: (days as Date), schedules: [e], type: TYPE_DETAIL});
    }

    const deleteSchedule = async (e: ServerData) => {
      try {
        const res = await axios.delete(`${_url}/deleteSchedules/${e.schNo}`);
        if(![200, 201, 301].includes(res.status)) {
          alert('wtf server');
          return;
        };
        reload();
      } catch(err) {
        alert(err);
      }
    }

    const scheduleList = schedules.map((e: ServerData, idx: number) => {
      const selectedDate = typeof days !== 'number' ? (days as Date).getDate() : days;
      const startDate = (new Date(e.startAt.toString())).getDate();
      // console.log(compareDate);
      
      return (
      <>
        <StyledScheduleLi key={idx} >
          <StyledLiTitle onClick={() => onClickHandler(e)}>{selectedDate === startDate ? <StartLabel>시</StartLabel> : null}{e.title}</StyledLiTitle>
          <StyledClearIcon fontSize="inherit" onClick={() => deleteSchedule(e)}/>
        </StyledScheduleLi>
      </>
    )});
    
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