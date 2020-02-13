import React, { FunctionComponent } from 'react';
import { StyledTd, StyledScheduleLi, StyledScheduleUi, StyledClearIcon, StyledLiTitle, StartLabel } from '../style';
import { DateData, OpenModal, ServerData } from '../_types/calendar';
import { TdDay } from './TdDay';
import { TYPE_DETAIL } from '../utils/CONST';
import axios from 'axios';
import { url as _url } from '../../../url';

const Td: FunctionComponent<DateData & OpenModal & Reload> = props => {
  const { days, schedules, openModal, reload } = props;

  const onClickHandler = (e: any) => {
    openModal({ days: (days as Date), schedules: [e], type: TYPE_DETAIL });
  }

  const deleteSchedule = async (e: ServerData) => {
    try {
      const res = await axios.delete(`${_url}/deleteSchedules/${e.schNo}`);
      if (![200, 201, 301].includes(res.status)) {
        alert('wtf server');
        return;
      }
      reload();
    } catch (err) {
      alert(err);
    }
  }


  const scheduleList = schedules.map((e: ServerData, idx: number) => {
    const selectedDate = typeof days !== 'number' ? (days as Date).getDate() : days;
    const startDate = (new Date(e.startAt.toString())).getDate();
    const endDate = (new Date(e.endAt.toString())).getDate();
    const isOneDay = e.oneDay

    const trueIdx: isValue = ([
      { is: isOneDay, value: '당' },
      { is: (startDate === selectedDate), value: '시' },
      { is: (endDate === selectedDate), value: '끝' },
      { is: true, value: false }
    ].find(e => e.is)) as isValue;
    const DayLabel = <StartLabel>{trueIdx.value}</StartLabel>

    return (
      <>
        <StyledScheduleLi key={idx}>
          {trueIdx.value ?
            <>
              {DayLabel}
              <StyledLiTitle onClick={() => onClickHandler(e)}>{e.title}</StyledLiTitle>
              {/* 여기 분기 넣기 */}
              <StyledClearIcon fontSize="inherit" onClick={() => deleteSchedule(e)} />
            </> : null}
        </StyledScheduleLi>
      </>
    )
  });

  return (
    <StyledTd isDisplay={days !== 0}>
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

type Reload = {
  reload: () => void;
}

type isValue = {
  is: boolean;
  value: string | boolean;
}

export { Td };