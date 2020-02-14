import React, { FunctionComponent } from 'react';
import { StyledTd, StyledScheduleLi, StyledScheduleUi, StyledClearIcon, StyledLiTitle, StartLabel } from '../style';
import { DateData, OpenModal, ServerData } from '../_types/calendar';
import { TdDay } from './TdDay';
import { TYPE_DETAIL } from '../utils/CONST';
import axios from 'axios';
import { url as _url } from '../../../url';

const Td: FunctionComponent<DateData & OpenModal & Reload> = props => {
  const { days, schedules, openModal, reload } = props;

  // let test =

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

  // console.log('sch', schedules)
  const scheduleList = schedules.map((e: ServerData, idx: number) => {
    const selectedDate = typeof days !== 'number' ? (days as Date).getDate() : days;
    const startDate = (new Date(e.startAt.toString())).getDate();
    const endDate = (new Date(e.endAt.toString())).getDate();
    const isOneDay = e.oneDay
    // @ts-ignore
    // const isUnder5: any = ((new Date(e.endAt.toString())) - (new Date(e.startAt.toString()))) <= 18000000 ? true : false

    const trueIdx: isValue = ([
      { is: (isOneDay), value: '당' },
      { is: (startDate === selectedDate), value: '시' },
      { is: (endDate === selectedDate), value: '끝' },
      // { is: (startDate <= selectedDate && selectedDate <= endDate, value: )}
      { is: true, value: false }
    ].find(e => e.is)) as isValue;
    const DayLabel = <StartLabel>{trueIdx.value}</StartLabel>


    // 현재 렌더링되는 일정이 내일정이냐 아니냐만 판단하면 됨!! 내 일정이 아닐때는 삭제표시가 없음

    // const onMouseUpHandler: any = (e: any) => {
    //   // e_title.target
    //   console.log(e);
    //   startDate <= selectedDate && selectedDate <= endDate ?
    //   // startAt endAt 비교해서 맞는애들 css 속성 주기 / ref. REACT DOM 에 있는것의 스타일 CSS 건드리기

    // }


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
            <TdDay
              //@ts-ignore
              ref={test} days={(days) as Date} openModal={openModal} />
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