import React, { FunctionComponent } from 'react';
import { StyledTd, StyledScheduleLi, StyledScheduleUi, StyledClearIcon, StyledLiTitle, StartLabel, EndLabel, DangLabel } from '../style';
import { DateData, OpenModal, ServerData } from '../_types/calendar';
import { TdDay } from './TdDay';
import { TYPE_DETAIL } from '../utils/CONST';
import axios from 'axios';
import { url as _url } from '../../../url';
import { Server } from 'http';
import color from '@material-ui/core/colors/amber';

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
    let DayLabel;
    if (trueIdx.value == '시') {
      DayLabel = <StartLabel key={idx}>{trueIdx.value}</StartLabel>
    } else if (trueIdx.value == '끝') {
      DayLabel = <EndLabel key={idx}>{trueIdx.value}</EndLabel>
    } else {
      DayLabel = <DangLabel key={idx}>{trueIdx.value}</DangLabel>
    }

    const dayColor: any = (e: ServerData) => {
      let color = ""
      e.csrDto ? color = e.csrDto.color[0] : color = ""
      return color
    }


    return (
      <>
        <StyledScheduleLi key={idx}>
          {trueIdx.value ?
            <>
              {DayLabel}
              <StyledLiTitle onClick={() => onClickHandler(e)} style={{ color: dayColor(e) }}>{e.title}</StyledLiTitle>
              {e.csrDto ?
                null
                : <>
                  <StyledClearIcon fontSize="inherit" onClick={() => deleteSchedule(e)} />
                </>
              }
            </> : null}
        </StyledScheduleLi>
      </>
    )
  });


  // 현재 렌더링되는 일정이 내일정이냐 아니냐만 판단하면 됨!! 내 일정이 아닐때는 삭제표시가 없음

  // const onMouseUpHandler: any = (e: any) => {
  //   // e_title.target
  //   console.log(e);
  //   startDate <= selectedDate && selectedDate <= endDate ?
  //   // startAt endAt 비교해서 맞는애들 css 속성 주기 / ref. REACT DOM 에 있는것의 스타일 CSS 건드리기

  // }


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